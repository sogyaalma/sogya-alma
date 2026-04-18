import { DatabaseRow } from '@/lib/db';
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
      <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft shadow-hover overflow-hidden border border-gray-100 dark:border-midnight-border flex flex-col justify-between h-full transition-all">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full font-body">
              {row.Category}
            </span>
            {row.ImagePath && row.ImagePath !== '-' && (
              <ImageIcon className="text-gray-400" size={20} />
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 font-heading leading-tight">{row.Title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed font-body">
            {row.Description !== '-' ? row.Description : ''}
          </p>
        </div>

        <div className="p-6 pt-0 mt-auto">
          {target !== null && collected !== null && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 font-bold font-body">
                <span>جمعنا: {collected.toLocaleString()} ر.س</span>
                <span>الهدف: {target.toLocaleString()} ر.س</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
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
            شاركنا الأجر
          </Link>
        </div>
      </div>
    );
  }

  // NEWS card — media center
  if (row.TemplateType === 'News') {
    return (
      <div className="bg-white dark:bg-midnight-surface rounded-3xl shadow-soft shadow-hover border border-gray-100 dark:border-midnight-border overflow-hidden group transition-all">
        <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
          {row.ImagePath && row.ImagePath !== '-' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://images.unsplash.com/photo-1544473244-f6895e69da8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`}
              alt={row.Title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-900">
              <ImageIcon size={32} className="text-gray-400 opacity-40" />
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm font-body">
            {row.Category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 font-heading line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary-light transition-colors leading-tight">
            <Link href={`/media/${row.ID}`}>{row.Title}</Link>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4 font-body">
            {row.Description !== '-' ? row.Description : ''}
          </p>
          <Link href={`/media/${row.ID}`} className="text-primary dark:text-secondary-light font-bold hover:text-primary-dark inline-flex items-center gap-2 font-body text-sm">
            اقرأ المزيد &larr;
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
