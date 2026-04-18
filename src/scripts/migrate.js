const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const csvPath = path.join(process.cwd(), 'public', 'data', 'database.csv');

async function migrate() {
  try {
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const rows = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Found ${rows.length} rows in CSV. Starting migration...`);

    for (const row of rows) {
      console.log(`Migrating row: ${row.Title}`);
      const { error } = await supabase
        .from('projects')
        .upsert({
          id: row.ID,
          template_type: row.TemplateType,
          title: row.Title,
          description: row.Description,
          target_amount: parseFloat(row.TargetAmount) || 0,
          collected_amount: parseFloat(row.CollectedAmount) || 0,
          image_path: row.ImagePath,
          category: row.Category,
          content: row.Content
        }, { onConflict: 'id' });

      if (error) {
        console.error(`Error migrating row ${row.ID}:`, error.message);
      }
    }

    console.log('Migration process finished.');
  } catch (err) {
    console.error('Fatal error during migration:', err);
  }
}

migrate();
