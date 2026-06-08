import { create } from 'zustand';
type TenantStore = {
  roleTenant: string | null;
  setRoleTenant: (roleTenant: string | null) => void;
};
export const useTenantStore = create<TenantStore>((set) => ({
  roleTenant: null,
  setRoleTenant: (roleTenant) =>
    set({
      roleTenant,
    }),
}));
