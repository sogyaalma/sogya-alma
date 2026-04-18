import { DatabaseRow } from '@/lib/csv-db';
import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';

interface CardRendererProps {
  row: DatabaseRow;
}

/** Parses a numeric string; returns null if empty or '-'. */
function parseAmount(value: string): number | null {
  if (!value || value === '-') return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

export default function CardRenderer({ row }: CardRendererProps) {
  const target = parseAmount(row.TargetAmount);
  const collected = parseAmount(row.CollectedAmount);

  // PROJECT card — donations, waqf, etc.
  if (row.TemplateType === 'Project') {
    const percentage =
      collected !== null && target !== null && target > 0
        ? Math.min((collected / target) * 100, 100)
        : 0;

    return (
      <div className="bg-white rounded-2xl shadow-soft shadow-hover overflow-hidden border border-gray-100 flex flex-col justify-between h-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {row.Category}
            </span>
            {row.ImagePath && row.ImagePath !== '-' && (
              <ImageIcon className="text-gray-400" size={20} />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3 font-ibm leading-tight">{row.Title}</h3>
          <p className="text-gray-500 text-sm line-clamp-3 mb-6 leading-relaxed">
            {row.Description !== '-' ? row.Description : ''}
          </p>
        </div>

        <div className="p-6 pt-0 mt-auto">
          {target !== null && collected !== null && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2 font-bold">
                <span>جمعنا: {collected.toLocaleString()} ر.س</span>
                <span>الهدف: {target.toLocaleString()} ر.س</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
          <Link
            href={`/opportunities/${row.ID}`}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center"
          >
            تبرع الآن
          </Link>
        </div>
      </div>
    );
  }

  // NEWS card — media center
  if (row.TemplateType === 'News') {
    return (
      <div className="bg-white rounded-2xl shadow-soft shadow-hover border border-gray-100 overflow-hidden group">
        <div className="h-48 bg-gray-100 relative overflow-hidden">
          {row.ImagePath && row.ImagePath !== '-' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://placehold.co/600x400/004080/FFF?text=${encodeURIComponent(row.Title)}`}
              alt={row.Title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <ImageIcon size={32} className="text-gray-400" />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
            {row.Category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 font-ibm line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/media/${row.ID}`}>{row.Title}</Link>
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
            {row.Description !== '-' ? row.Description : ''}
          </p>
          <Link href={`/media/${row.ID}`} className="text-primary font-bold hover:text-primary-dark inline-flex items-center gap-2">
            اقرأ المزيد &larr;
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
