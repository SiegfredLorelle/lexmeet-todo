import React, { useState } from 'react';
import EditTaskModal from '../components/EditTaskModal';

const EditTask = ({ task, handleEditTask, children }) => {
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  const openEditTaskModal = () => {
    setIsEditTaskModalOpen(true);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
  };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); openEditTaskModal(); }}>{children}</button>
      {isEditTaskModalOpen && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={closeEditTaskModal}
          task={task}
          onSubmit={(updatedTaskData) => {
            handleEditTask(updatedTaskData, task.id);
            closeEditTaskModal();
          }}
        />
      )}
    </>
  );
};

export default EditTask;
