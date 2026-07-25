'use client';
import { ProjectDetail } from '../types/detail-project.type';
import { useProjectStore } from '../store/useProjectStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/app/components/modal';
import ProjectForm from './FormProject';
import DeleteProjectModal from './DeleteProject';
//import { Project } from '../types/project.type';

interface Props {
  project: ProjectDetail;
}
interface Project {
  id: string;
  tenantId: string;
  name: string;
  description: string | null;
  status: string;
  createdBy: string;
  createdAt: Date;
  deletedAt: Date | null;
}

export default function ProjectHeader({ project }: Props) {
  const router = useRouter();
  const { setProjectId, setRoleProject } = useProjectStore();
  const [detailProject, setDetailProject] = useState<Project>(project.project);
  useEffect(() => {
    setProjectId(project.projectId);
    setRoleProject(project.role);
  }, [project]);

  const [openModal, setOpenModal] = useState<'edit' | 'delete' | null>(null);
  const handleEdit = () => {
    setOpenModal('edit');
  };
  return (
    <div
      className="
    rounded-3xl
    border border-white/40 dark:border-gray-800
    bg-white/80 dark:bg-gray-900/80
  
    shadow-sm
    p-5
  ">
      <div
        className="
      flex flex-col gap-5
      lg:flex-row lg:items-start lg:justify-between
    ">
        {/* Left Content */}
        <div className="min-w-0 flex-1">
          {/* Top */}
          <div className="flex items-start gap-4">
            {/* Project Avatar */}
            <div
              className="
            w-14 h-14 shrink-0
            rounded-2xl
            bg-linear-to-br from-blue-500 to-indigo-600
            text-white
            flex items-center justify-center
            text-lg font-bold
            shadow-lg shadow-blue-500/20
          ">
              {detailProject
                ? detailProject.name.charAt(0).toUpperCase()
                : 'no name'}
            </div>

            {/* Title */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">
                {detailProject.name}
              </h1>

              {detailProject.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                  {detailProject.description}
                </p>
              )}

              {/* Status */}
              <div className="mt-4">
                <span
                  className="
                inline-flex items-center
                rounded-full
                bg-emerald-100 dark:bg-emerald-900/30
                px-3 py-1
                text-xs font-semibold
                text-emerald-700 dark:text-emerald-300
              ">
                  {detailProject.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Edit */}
          {project.role === 'ADMIN' && (
            <button
              onClick={() => setOpenModal('edit')}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900 px-5 py-3 text-sm font-medium         text-gray-700 dark:text-gray-300          hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer w-full sm:w-auto">
              Edit Project
            </button>
          )}
          {project.role === 'ADMIN' && (
            <button
              onClick={() => setOpenModal('delete')}
              className=" rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 px-5 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer  w-full sm:w-auto">
              Delete
            </button>
          )}
          {/* Delete */}
        </div>
      </div>
      <Modal isOpen={openModal !== null} onClose={() => setOpenModal(null)}>
        {openModal === 'edit' && (
          <ProjectForm
            tenantId={project.project.tenantId}
            mode={'edit'}
            project={project.project}
            onSuccess={(update) => {
              setDetailProject(update);
            }}
          />
        )}
        {openModal === 'delete' && (
          <DeleteProjectModal
            tenantId={detailProject.tenantId}
            projectName={detailProject.name}
            onClose={() => setOpenModal(null)}
            onSuccess={() => {
              router.push(`/${detailProject.tenantId}/projects/`);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
