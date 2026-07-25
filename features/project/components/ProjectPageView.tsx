'use client';

import { useState, useEffect } from 'react';

import Modal from '@/app/components/modal';

import { Project } from '../types/project.type';

import ProjectHeader from './ProjectHeader';
import ProjectFilterBar from './ProjectFilterBar';
import ProjectGrid from './ProjectGrid';

import ProjectForm from './FormProject';
import { useTenantStore } from '@/features/tenant/store/useTenantStore';

interface Props {
  tenantId: string;
  roleTenant: string;
  initialProjects: Project[];
}

export default function ProjectPageView({
  tenantId,
  initialProjects,
  roleTenant,
}: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const { setRoleTenant } = useTenantStore();
  useEffect(() => {
    setRoleTenant(roleTenant);
  }, [roleTenant]);

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-6">
      <ProjectHeader
        onCreate={() => setOpenModal(true)}
        roleTenant={roleTenant}
      />

      <ProjectGrid projects={projects} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ProjectForm
          tenantId={tenantId}
          mode="create"
          onSuccess={(project) => {
            setProjects((prev) => [project, ...prev]);

            setOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
}
