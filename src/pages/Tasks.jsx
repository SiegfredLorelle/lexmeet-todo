import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import EditTaskModal from "../components/EditTaskModal";
import TaskInfoModal from "../components/TaskInfoModal";
import TaskSummary from "../components/TaskSummary";
import ScrollableMenu from "../components/ScrollableMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus, faEllipsis, faArrowRotateLeft, faPenToSquare, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import CreateTask from "../utils/CreateTask";
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../utils/localStorageUtils";


const Tasks = () => {
  const [showListsSection, setShowListsSection] = useState(false);
  const [isInfoTaskModalOpen, setIsInfoTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const toggleListsSection = () => {
    setShowListsSection(!showListsSection);
  };

  const openInfoTaskModal = (task) => {
    setIsInfoTaskModalOpen(true);
    setSelectedTask(task);
  };

  const closeInfoTaskModal = () => {
    setIsInfoTaskModalOpen(false);
    setSelectedTask(null);
  };

  const openEditTaskModal = (task) => {
    setIsEditTaskModalOpen(true);
    setSelectedTask(task);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleEditTaskSubmit = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
  };

  const handleNewTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <>
      <Header toggleListsSection={toggleListsSection} />
      <div className="tasks-container">
        {showListsSection && <ListsSection />}
        <TasksSection
          handleNewTask={handleNewTask}
          openInfoTaskModal={openInfoTaskModal}
          openEditTaskModal={openEditTaskModal}
          tasks={tasks}
        />
      </div>

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={closeEditTaskModal}
          task={selectedTask}
          onSubmit={handleEditTaskSubmit}
        />
      )}
      {isInfoTaskModalOpen && (
        <TaskInfoModal
          isOpen={isInfoTaskModalOpen}
          onClose={closeInfoTaskModal}
          task={selectedTask}
        />
      )}

      <BottomControls handleNewTask={handleNewTask} />
    </>
  );
};

const ListsSection = () => (
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
);

const TasksSection = ({ handleNewTask, openInfoTaskModal, openEditTaskModal, tasks }) => {
  const filterCommands = [
    { label: "All", action: () => { } },
    { label: "Done", action: () => { } },
    { label: "Incomplete", action: () => { } },
    { label: "Missing", action: () => { } },
  ];

  const sortCommands = [
    { label: "Created", action: () => { } },
    { label: "Deadline", action: () => { } },
    { label: "Priority", action: () => { } },
  ];

  return (
    <section className="tasks-section tasks">
      <h2>LIST NAME</h2>
      <TaskSummary numCompleted={3} totalTasks={4} handleNewTask={handleNewTask}/>
      <h3>Tasks</h3>
      <ScrollableMenu commands={filterCommands} />
      <ScrollableMenu commands={sortCommands} />
      <ul>
        {tasks.length === 0 ? (
          <p>No Tasks yet. Feel free to add a task.</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              openInfoTaskModal={openInfoTaskModal}
              openEditTaskModal={openEditTaskModal}
              task={task}
            />
          ))
        )}
      </ul>
    </section>
  );
};

const TaskItem = ({ openInfoTaskModal, openEditTaskModal, task }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleContainerClick = (e) => {
    // Ignore clicks on the action buttons
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg' || e.target.tagName === 'path') {
      return;
    }
    setIsChecked(!isChecked);
  };

  const calculateTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;

    if (diff <= 0) {
      return 'Passed';
    }

    const minutesLeft = Math.floor(diff / (1000 * 60));
    const hoursLeft = Math.floor(minutesLeft / 60);
    const daysLeft = Math.floor(hoursLeft / 24);

    if (daysLeft > 0) {
      return `${daysLeft} Day${daysLeft > 1 ? 's' : ''}`;
    } else if (hoursLeft > 0) {
      return `${hoursLeft} Hour${hoursLeft > 1 ? 's' : ''}`;
    } else {
      return `${minutesLeft} Minute${minutesLeft > 1 ? 's' : ''}`;
    }
  };

  return (
    <li className="tasks-item-container" onClick={handleContainerClick}>
      <input
        type="checkbox"
        name="task"
        value={task.id}
        className="tasks-item-checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <div className="tasks-item-text">
        <div className="tasks-item-pills">
          <span className={`tasks-item-pill priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="tasks-item-pill">{calculateTimeLeft(task.deadline)}</span>
        </div>
        <span className="tasks-item-text-name">{task.name}</span>
        <span className="tasks-item-text-description">{task.description}</span>
      </div>
      <div className="tasks-item-actions">
        <button onClick={() => { openInfoTaskModal(task) }}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button onClick={() => openEditTaskModal(task)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button onClick={() => { }}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
};

const BottomControls = ({ handleNewTask }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="bottom-controls-container">
      {isMenuOpen && (
        <div className="additional-buttons">
          <button><FontAwesomeIcon icon={faTrash} /> Delete All </button>
          <button><FontAwesomeIcon icon={faTrash} /> Delete All Complete </button>
          <button><FontAwesomeIcon icon={faCheck} /> Mark All Complete </button>
          <button><FontAwesomeIcon icon={faCheck} /> Mark All Incomplete </button>
        </div>
      )}
      <div className="main-buttons">
        <button><FontAwesomeIcon icon={faArrowRotateLeft} /> Back </button>
        <CreateTask handleNewTask={handleNewTask}><FontAwesomeIcon icon={faPlus} /> Add Task</CreateTask>
        <div className="menu-toggle">
          <button onClick={toggleMenu}><FontAwesomeIcon icon={faEllipsis} /></button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
