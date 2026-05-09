'use client';

import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="max-h-full fixed inset-0 z-50 flex justify-center items-center-safe bg-black/40 ">
      <div className=" rounded shadow-lg p-6 w-max relative  overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-50 hover:text-gray-200">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
