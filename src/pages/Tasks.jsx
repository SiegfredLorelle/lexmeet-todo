import React, { useState } from "react";
import Header from "../components/Header"
import CreateTaskModal from "../components/CreateTaskModal"
import TaskSummary from "../components/TaskSummary";
import ScrollableMenu from "../components/ScrollableMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsis, faArrowRotateLeft, faPenToSquare, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

const Tasks = () => {
  const [showListsSection, setShowListsSection] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const toggleListsSection = () => {
    setShowListsSection(!showListsSection);
  };
  
  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };
  
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <Header toggleListsSection={toggleListsSection}/>
      <div className="tasks-container">
        {
          showListsSection && <ListsSection /> 
        }
        <TasksSection openTaskModal={openTaskModal} />
      </div>

      <CreateTaskModal isOpen={isTaskModalOpen} onClose={closeTaskModal} />
    </>
  )
}

const ListsSection = () => {
  return (
    <>
      <section className="tasks-section lists">
        <hgroup>
          <h2>Groups</h2>
          <p>Group your tasks into lists. (E.g., Acads, OJT, Family)</p>
        </hgroup>
        <ul>
          <li>LISTS</li>
          <li>LISTS</li>
          <li>LISTS</li>
          <li>LISTS</li>
          <li>LISTS</li>
        </ul>
      </section>
    </>
  )
}

const TasksSection = ({ openTaskModal }) => {
  const filterCommands= [
    {
      label: "All", 
      action: () => {}
    },
    {
      label: "Done", 
      action: () => {}
    },
    {
      label: "Incomplete", 
      action: () => {}
    },
    {
      label: "Missing", 
      action: () => {}
    },
  ];

  const sortCommands= [
    {
      label: "Created", 
      action: () => {}
    },
    {
      label: "Deadline", 
      action: () => {}
    },
    {
      label: "Priority", 
      action: () => {}
    },
  ];

  const tasks = [
    { 
      id: 1, 
      name: 'Task 1',
      description: 'BLABLABLA' 
    },
    { 
      id: 2, 
      name: 'Task 2',
      description: 'BLABLABLA' 
    },
    { 
      id: 3, 
      name: 'Task 3',
      description: 'BLABLABLA' 
    },
    { 
      id: 4, 
      name: 'Task 4',
      description: 'BLABLABLA' 
    },

  ];

  return (
    <section className="tasks-section tasks">
      <h2>LIST NAME</h2>
      <TaskSummary numCompleted={3} totalTasks={4} openTaskModal={openTaskModal}/>
      <h3>Tasks</h3>
      <ScrollableMenu commands={filterCommands} />
      <ScrollableMenu commands={sortCommands} />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <BottomControls openTaskModal={openTaskModal} />
    </section>
  )
}

const TaskItem = ({ task }) => {
  return (
    <li className="tasks-item-container">
      <input type="radio" name="task" value={task.id} className="tasks-item-radio" />
      <div className="tasks-item-text">
        <span className="tasks-item-text-name">{task.name}</span>
        <span className="tasks-item-text-description">{task.description}</span>
      </div>
      <div className="tasks-item-actions">
        <button onClick={() => {}}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button onClick={() => {}}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  )
}

const BottomControls = ({openTaskModal}) => {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="bottom-controls-container">
      {
        isMenuOpen && (
          <div className="additional-buttons">
            <button><FontAwesomeIcon icon={faTrash} /> Delete All </button>
            <button><FontAwesomeIcon icon={faTrash} /> Delete All Complete </button>
            <button><FontAwesomeIcon icon={faCheck} /> Mark All Complete </button>
            <button><FontAwesomeIcon icon={faCheck} /> Mark All Incomplete </button>
          </div>
        )
      }
      <div className="main-buttons">
        <button><FontAwesomeIcon icon={faArrowRotateLeft} /> Back </button>
        <button onClick={openTaskModal}><FontAwesomeIcon icon={faPlus} /> Add Task </button>
        <div className="menu-toggle">
          <button onClick={toggleMenu}><FontAwesomeIcon icon={faEllipsis} /></button>
        </div>
      </div>
    </div>
  )
}

export default Tasks