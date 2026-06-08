'use client';

import { taskAssignee } from '../types/task-assignees.type';
import { TaskSubmissions } from '../types/task-submissions.type';

interface Props {
  submitted: TaskSubmissions[];
  submittedBy: taskAssignee[];
}
export default function TaskSubmission({ submitted, submittedBy }: Props) {
  return (
    <div
      className="
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
    backdrop-blur-xl
    shadow-sm
    overflow-hidden
  ">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Submissions
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Task submissions and attachments
            </p>
          </div>

          {/* Badge */}
          <span
            className="
          inline-flex items-center
          rounded-full
          bg-blue-100 dark:bg-blue-900/30
          px-3 py-1
          text-xs font-semibold
          text-blue-700 dark:text-blue-300
        ">
            {submitted.length} Submission
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Top */}
        {submitted.map((sub) => {
          const subName = submittedBy.find(
            (sb) => sb.userId === sub.submittedBy,
          )?.user.name;
          return (
            <div
              key={sub.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  {/* User */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="w-11 h-11 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-indigo-600   text-white flex items-center justify-center text-sm font-semibold shadow-lg shadow-blue-500/20">
                      {subName
                        ?.split(' ')
                        .map((word) => word[0])
                        .join('')
                        .toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {subName}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Submitted{' '}
                        {sub.createdAt.toLocaleDateString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span className="inline-flex items-center rounded-full        bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                    Submitted
                  </span>
                </div>

                {/* Submission Content */}
                <div className="mt-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 px-4 py-4">
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {sub.content}
                  </p>
                </div>

                {/* Attachment */}
                <div className="mt-4">
                  <a
                    href={`${sub.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl  border border-gray-200 dark:border-gray-700       bg-gray-50 dark:bg-gray-800/60    px-4 py-2 text-sm font-medium    text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800            transition-colors">
                    <span>📎</span>

                    <span>
                      {sub.fileUrl ? 'Open File' : 'No File Uploaded'}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
