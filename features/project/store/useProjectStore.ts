import { create } from 'zustand';
import { MemberProject } from '../types/member-project.type';
import { UnmemberProject } from '../types/unmember-project.type';

type ProjectStore = {
  projectId: string;
  tenantId: string;
  memberProjects: MemberProject[];
  setMemberProjects: (MemberProject: MemberProject[]) => void;
  setMemberProject: (memberProject: MemberProject) => void;
  removeMemberProject: (id: string) => void;
  updateMemberRole: (memberId: string, role: 'ADMIN' | 'MEMBER') => void;

  roleProject: string | null;
  setRoleProject: (role: string | null) => void;

  setProjectId: (projectId: string) => void;
  setTenantId: (tenantId: string) => void;

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
  updateMemberRole: (memberId, role) =>
    set((state) => ({
      memberProjects: state.memberProjects.map((member) =>
        member.id === memberId
          ? {
              ...member,
              role,
            }
          : member,
      ),
    })),
  removeMemberProject: (id) => {
    set((state) => ({
      memberProjects: state.memberProjects.filter((member) => member.id !== id),
    }));
  },

  projectId: '',
  setProjectId: (projectId) => set({ projectId }),

  roleProject: null,
  setRoleProject: (roleProject) => set({ roleProject }),

  tenantId: '',
  setTenantId: (tenantId) => set({ tenantId }),

  unmemberProjects: [],
  setUnmemberProjects: (unmemberProjects) => set({ unmemberProjects }),
  removeUnmember: (id) =>
    set((state) => ({
      unmemberProjects: state.unmemberProjects.filter(
        (unmember) => unmember.id !== id,
      ),
    })),
}));
