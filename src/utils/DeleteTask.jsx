import React, { useState } from 'react';
import DeleteTaskModal from '../components/DeleteTaskModal';

const DeleteTask = ({ option, task, handleDeleteTask, disabled, children }) => {
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const openDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(true);
  };

  const closeDeleteTaskModal = () => {
    setIsDeleteTaskModalOpen(false);
  };

  return (
    <>
      <button disabled={disabled} onClick={(e) => { e.stopPropagation(); openDeleteTaskModal(); }}>{children}</button>
      {
      <DeleteTaskModal
        isOpen={isDeleteTaskModalOpen}
        onClose={closeDeleteTaskModal}
        task={task}
        name={task ? task.name : option}
        onConfirm={() => {
            handleDeleteTask(task ? task.id : null);
          closeDeleteTaskModal();
        }}
      />
      }
    </>
  );
};

export default DeleteTask;
