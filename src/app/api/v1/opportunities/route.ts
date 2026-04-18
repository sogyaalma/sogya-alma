import { NextResponse } from 'next/server';
import { getDatabaseRows } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Enterprise Standard: Unified JSON Response Format
function createResponse(success: boolean, data: any, message: string = '', status: number = 200) {
  return NextResponse.json({
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  }, { status });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type'); // e.g., 'Project', 'News'
    const id = searchParams.get('id');
    const search = searchParams.get('search');

    // Fetch master data (SSOT)
    const rows = await getDatabaseRows();

    let filteredRows = rows;

    if (id) {
      filteredRows = filteredRows.filter(row => row.ID === id);
      if (filteredRows.length === 0) {
        return createResponse(false, null, 'Opportunity not found (ERR_NOT_FOUND)', 404);
      }
      return createResponse(true, filteredRows[0], 'Opportunity retrieved successfully');
    }

    if (category) {
      filteredRows = filteredRows.filter(row => row.Category === category);
    }

    if (type) {
      filteredRows = filteredRows.filter(row => row.TemplateType === type);
    }

    if (search) {
      const q = search.toLowerCase();
      filteredRows = filteredRows.filter(row => 
        row.Title.toLowerCase().includes(q) || 
        row.Description.toLowerCase().includes(q) ||
        row.Category.toLowerCase().includes(q)
      );
    }

    return createResponse(true, filteredRows, 'Opportunities retrieved successfully');
  } catch (error) {
    console.error('API Error:', error);
    return createResponse(false, null, 'Internal Server Error (ERR_INTERNAL)', 500);
  }
}
