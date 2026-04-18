import { supabase } from './supabase';

export interface DatabaseRow {
  ID: string;
  TemplateType: string;
  Title: string;
  Description: string;
  TargetAmount: string;
  CollectedAmount: string;
  ImagePath: string;
  Category: string;
  Content: string;
}

export async function getDatabaseRows(): Promise<DatabaseRow[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*');

    if (error) {
      console.error('Error fetching from Supabase:', error);
      return [];
    }

    return (data || []).map((row: any) => ({
      ID: row.id,
      TemplateType: row.template_type,
      Title: row.title,
      Description: row.description,
      TargetAmount: row.target_amount?.toString() || '0',
      CollectedAmount: row.collected_amount?.toString() || '0',
      ImagePath: row.image_path,
      Category: row.category,
      Content: row.content,
    }));
  } catch (error) {
    console.error('Error in getDatabaseRows:', error);
    return [];
  }
}
