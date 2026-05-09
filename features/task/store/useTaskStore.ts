import { create } from 'zustand';
import { Task } from '../types/create-task.type';

export type ActiveView = 'TASKLIST' | 'DETAILTASK' | 'EDIT';

type TaskStore = {
  activeView: ActiveView;

  tasks: Task[];

  selectedTask: Task | null;

  setActiveView: (view: ActiveView) => void;

  setTasks: (tasks: Task[]) => void;
  setTask: (task: Task) => void;

  setSelectedTask: (task: Task | null) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  activeView: 'TASKLIST',

  tasks: [],

  selectedTask: null,

  setActiveView: (view) => set({ activeView: view }),

  setTasks: (tasks) => set({ tasks }),

  setTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  setSelectedTask: (task) => set({ selectedTask: task }),
}));
