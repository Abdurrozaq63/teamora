interface Props {
  onCreate: () => void;
}

export default function ProjectHeader({ onCreate }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Projects
      </h1>

      <button
        onClick={onCreate}
        className="px-4 py-2 rounded-lg bg-black text-white cursor-pointer text-sm">
        + Create Project
      </button>
    </div>
  );
}
