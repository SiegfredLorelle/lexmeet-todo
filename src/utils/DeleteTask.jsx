import React, { useState } from 'react';
import DeleteTaskModal from '../components/DeleteTaskModal';

const DeleteTask = ({ task, handleDeleteTask, children }) => {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const openDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(true);
  };

  const closeDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(false);
  };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); openDeleteTaskModal(); }}>{children}</button>
      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          isOpen={isDeleteTaskModalOpen}
          onClose={closeDeleteTaskModal}
          task={task}
          onConfirm={() => {
            handleDeleteTask(task.id);
            closeDeleteTaskModal();
          }}
        />
      )}
    </>
  );
};

export default DeleteTask;
