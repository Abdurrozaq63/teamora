import { create } from 'zustand';
import { MemberProject } from '../types/member-project.type';
import { UnmemberProject } from '../types/unmember-project.type';

type ProjectStore = {
  projectId: string | null;
  memberProjects: MemberProject[];
  setMemberProjects: (MemberProject: MemberProject[]) => void;
  setMemberProject: (memberProject: MemberProject) => void;

  setProjectId: (projectId: string | null) => void;
  unmemberProjects: UnmemberProject[];
  setUnmemberProjects: (UnmemberProject: UnmemberProject[]) => void;
  removeUnmember: (id: string) => void;
};
export const useProjectStore = create<ProjectStore>((set) => ({
  memberProjects: [],
  setMemberProjects: (memberProjects) => set({ memberProjects }),
  setMemberProject: (memberProject) =>
    set((state) => ({
      memberProjects: [memberProject, ...state.memberProjects],
    })),

  projectId: null,
  setProjectId: (projectId) => set({ projectId }),

  unmemberProjects: [],
  setUnmemberProjects: (unmemberProjects) => set({ unmemberProjects }),
  removeUnmember: (id) =>
    set((state) => ({
      unmemberProjects: state.unmemberProjects.filter(
        (unmember) => unmember.id !== id,
      ),
    })),
}));
