import { useTaskStore } from '../store/useTaskStore';
export default function DetailTask() {
  const task = useTaskStore((state) => state.selectedTask);
  return (
    <div>
      <h1>{task?.title}</h1>
    </div>
  );
}
