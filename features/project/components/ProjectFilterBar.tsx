export default function ProjectFilterBar() {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search project..."
        className="w-full md:w-64 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white outline-none"
      />

      <div className="flex gap-2">
        <select className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white">
          <option>All Status</option>
          <option>Active</option>
          <option>Completed</option>
        </select>

        <select className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white">
          <option>Latest</option>
          <option>Oldest</option>
        </select>
      </div>
    </div>
  );
}
