import { useState } from "react";
import TaskInfoModal from "../components/TaskInfoModal";

const ShowTaskInfo = ({task, children}) => {
  const [isInfoTaskModalOpen, setIsInfoTaskModalOpen] = useState(false);

  const openInfoTaskModal = (task) => {
    setIsInfoTaskModalOpen(true);
  };

  const closeInfoTaskModal = () => {
    setIsInfoTaskModalOpen(false);
  };

  return (
    <>
      <button onClick={(e) => { e.stopPropagation(); openInfoTaskModal(); }}>{children}</button>
      <TaskInfoModal
        isOpen={isInfoTaskModalOpen}
        onClose={closeInfoTaskModal}
        task={task}
      />
    </>
  )
};

export default ShowTaskInfo;