'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();

  const params = useSearchParams();

  function changePage(nextPage: number) {
    const search = new URLSearchParams(params);

    search.set('page', nextPage.toString());

    router.push(`?${search.toString()}`);
  }

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Info */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {page}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="
        inline-flex items-center gap-2
        rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        px-4 py-2
        text-sm font-medium
        text-gray-700 dark:text-gray-200
        shadow-sm
        transition-all
        hover:bg-gray-100 dark:hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:opacity-40
      ">
          ← Previous
        </button>

        <div className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20">
          {page}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
          className="
        inline-flex items-center gap-2
        rounded-xl
        border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        px-4 py-2
        text-sm font-medium
        text-gray-700 dark:text-gray-200
        shadow-sm
        transition-all
        hover:bg-gray-100 dark:hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:opacity-40
      ">
          Next →
        </button>
      </div>
    </div>
  );
}
