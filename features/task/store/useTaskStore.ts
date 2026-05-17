import { create } from 'zustand';
import { Task } from '../types/task.type';
import { UnassigneeTask } from '../types/task-unassignee.type';
import { DetailTaskProps } from '../types/detail-task.type';

export type ActiveView = 'TASKLIST' | 'DETAILTASK' | 'EDIT';

type TaskStore = {
  activeView: ActiveView;

  tasks: Task[];

  assigneedTask: UnassigneeTask[];

  detailTask: DetailTaskProps | null;

  selectedTask: Task | null;

  setActiveView: (view: ActiveView) => void;

  setTasks: (tasks: Task[]) => void;
  setTask: (task: Task) => void;
  setDetailTask: (detailTask: DetailTaskProps | null) => void;
  setAssigneedTask: (assigned: UnassigneeTask[]) => void;
  removeAssigneed: (userId: string) => void;

  setSelectedTask: (task: Task | null) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  activeView: 'TASKLIST',

  tasks: [],

  detailTask: null,

  assigneedTask: [],

  selectedTask: null,

  setActiveView: (view) => set({ activeView: view }),

  setTasks: (tasks) => set({ tasks }),

  setTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),

  setDetailTask: (detailTask) =>
    set({
      detailTask,
    }),

  setAssigneedTask: (assigneedTask) => set({ assigneedTask }),

  removeAssigneed: (userId) =>
    set((state) => ({
      assigneedTask: state.assigneedTask.filter(
        (assigneed) => assigneed.userId !== userId,
      ),
    })),
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
