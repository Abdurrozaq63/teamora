'use client';
export default function SubmissionForm() {
  return (
    <div className="lg:col-span-2">
      <div
        className="
      lg:sticky lg:top-6
      rounded-3xl
      border border-white/40 dark:border-gray-800
      bg-white/80 dark:bg-gray-900/80
      backdrop-blur-xl
      shadow-sm
      overflow-hidden
    ">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Submit Your Work
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload your progress and submission files
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="p-5 sm:p-6 space-y-5">
          {/* Content */}
          <div className="space-y-2">
            <label
              className="
            text-sm font-medium
            text-gray-700 dark:text-gray-300
          ">
              Submission Content
            </label>

            <textarea
              rows={6}
              placeholder="Write your submission details here..."
              className="
            w-full rounded-2xl
            border border-gray-200 dark:border-gray-700
            bg-white/70 dark:bg-gray-900
            px-4 py-3
            text-sm text-gray-900 dark:text-white
            placeholder:text-gray-400
            resize-none
            focus:outline-none
            focus:ring-2 focus:ring-blue-500/40
            focus:border-blue-500
            transition
          "
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label
              className="
            text-sm font-medium
            text-gray-700 dark:text-gray-300
          ">
              Attachment File
            </label>

            <div
              className="
            rounded-2xl
            border border-dashed border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800/50
            px-4 py-6
            text-center
          ">
              <input
                type="file"
                className="
              w-full
              text-sm text-gray-700 dark:text-gray-300
              file:mr-4
              file:rounded-xl
              file:border-0
              file:bg-blue-100 dark:file:bg-blue-900/30
              file:px-4
              file:py-2
              file:text-sm
              file:font-medium
              file:text-blue-700 dark:file:text-blue-300
              hover:file:bg-blue-200
              dark:hover:file:bg-blue-900/50
              file:cursor-pointer
              cursor-pointer
            "
              />

              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Upload documents, images, or other supporting files
              </p>
            </div>
          </div>

          {/* Action */}
          <button
            type="submit"
            className="
          w-full
          rounded-2xl
          bg-linear-to-r from-blue-600 to-indigo-600
          px-5 py-3
          text-sm font-semibold text-white
          shadow-lg shadow-blue-500/20
          hover:opacity-90
          transition-opacity
          cursor-pointer
        ">
            Submit Work
          </button>
        </form>
      </div>
    </div>
  );
}
