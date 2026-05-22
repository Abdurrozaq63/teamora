'use client';

import { useState } from 'react';

import Modal from '@/app/components/modal';

import { Project } from '../types/project.type';

import ProjectHeader from './ProjectHeader';
import ProjectFilterBar from './ProjectFilterBar';
import ProjectGrid from './ProjectGrid';

import CreateProject from '@/features/project/components/create-project';

interface Props {
  tenantId: string;
  initialProjects: Project[];
}

export default function ProjectPageView({ tenantId, initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects);

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="space-y-6">
      <ProjectHeader onCreate={() => setOpenModal(true)} />

      <ProjectFilterBar />

      <ProjectGrid projects={projects} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CreateProject
          tenantId={tenantId}
          onSuccess={(project) => {
            setProjects((prev) => [project, ...prev]);

            setOpenModal(false);
          }}
        />
      </Modal>
    </div>
  );
}
