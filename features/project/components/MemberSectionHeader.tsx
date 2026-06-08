import { useState } from 'react';
import Modal from '@/app/components/modal';
import CreateMember from './CreateMember';
import { useProjectStore } from '../store/useProjectStore';
export default function MemberSectionHeader() {
  const handleAdd = () => {
    setOpenModal(true);
  };
  const { roleProject } = useProjectStore();
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Members
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage project members and permissions
          </p>
        </div>
        <div>
          {roleProject === 'ADMIN' && (
            <button
              onClick={handleAdd}
              className="px-3 py-2 dark:bg-blue-600 dark:text-white  rounded-lg cursor-pointer">
              <span>Add Member</span>
            </button>
          )}
        </div>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <CreateMember />
        </Modal>
      </div>
    </>
  );
}
