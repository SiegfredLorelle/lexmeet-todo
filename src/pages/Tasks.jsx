import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TaskSummary from "../components/TaskSummary";
import ScrollableMenu from "../components/ScrollableMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus, faEllipsis, faArrowRotateLeft, faPenToSquare, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import CreateTask from "../utils/CreateTask";
import EditTask from "../utils/EditTask";
import DeleteTask from "../utils/DeleteTask";
import ShowTaskInfo from "../utils/ShowTaskInfo";
import { loadTasksFromLocalStorage, saveTasksToLocalStorage } from "../utils/localStorageUtils";

const Tasks = () => {
  const [showListsSection, setShowListsSection] = useState(false);
  const [tasks, setTasks] = useState(loadTasksFromLocalStorage());

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

  const handleEditTask = (updatedTaskData, taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
  };

  const handleNewTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
  };

  const handleDeleteCompleteTasks = () => {
    const updatedTasks = tasks.filter(task => task.status !== 'Complete');
    setTasks(updatedTasks);
  };

  const handleMarkAllAsComplete = (asComplete) => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      status: asComplete ? 'Complete' : 'Incomplete',
      completedAt: asComplete ? new Date().toISOString() : null,
    }));
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header toggleListsSection={toggleListsSection} />
      <div className="tasks-container">
        {showListsSection && <ListsSection />}
        <TasksSection
          handleNewTask={handleNewTask}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleDeleteAllTasks={handleDeleteAllTasks}
          tasks={tasks}
        />
      </div>

      <BottomControls 
        handleNewTask={handleNewTask} 
        handleDeleteAllTasks={handleDeleteAllTasks}
        handleDeleteCompleteTasks={handleDeleteCompleteTasks}
        handleMarkAllAsComplete={handleMarkAllAsComplete}
      />
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

const TasksSection = ({ handleNewTask, handleEditTask, handleDeleteTask, tasks }) => {
  const numCompleted = tasks.filter(task => task.status === 'Complete').length;

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
      <TaskSummary numCompleted={numCompleted} totalTasks={tasks.length} handleNewTask={handleNewTask}/>
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
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              task={task}
            />
          ))
        )}
      </ul>
    </section>
  );
};

const TaskItem = ({ handleEditTask, handleDeleteTask, task }) => {
  const [isChecked, setIsChecked] = useState(task.status === 'Complete');

  useEffect(() => {
    setIsChecked(task.status === 'Complete');
  }, [task.status]);

  const handleContainerClick = (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'svg' || e.target.tagName === 'path') {
      return;
    }
    setIsChecked(!isChecked);
    
    const newStatus = !isChecked ? 'Complete' : 'Incomplete';
    const completedAt = !isChecked ? new Date().toISOString() : null
    
    const updatedTask = {
      ...task,
      status: newStatus,
      completedAt: completedAt,
    };
  
    handleEditTask(updatedTask, task.id);
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
    <li 
      className={`tasks-item-container ${isChecked ? 'completed' : ''}`} 
      onClick={handleContainerClick}
    >
      <input
        type="checkbox"
        name="task"
        value={task.id}
        className="tasks-item-checkbox"
        checked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          setIsChecked(e.target.checked);
        }}
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
        <div onClick={(e) => { e.stopPropagation(); }}>
          <ShowTaskInfo task={task}>
            <FontAwesomeIcon icon={faCircleInfo} />
          </ShowTaskInfo>
        </div>
        <div onClick={(e) => { e.stopPropagation(); }}>
          <EditTask task={task} handleEditTask={(updatedTask) => handleEditTask(updatedTask, task.id)}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </EditTask>
        </div>
        <div onClick={(e) => { e.stopPropagation(); }}>
          <DeleteTask 
            task={task} 
            handleDeleteTask={() => {handleDeleteTask(task.id)}}
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteTask>
        </div>
      </div>
    </li>
  );
};

const BottomControls = ({ handleNewTask, handleDeleteAllTasks, handleDeleteCompleteTasks, handleMarkAllAsComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="bottom-controls-container">
      {isMenuOpen && (
        <div className="additional-buttons">
          <DeleteTask 
            option={"ALL tasks"}
            task={null} 
            handleDeleteTask={handleDeleteAllTasks}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete All
          </DeleteTask>
          <DeleteTask 
            option={"Completed tasks"}
            task={null} 
            handleDeleteTask={handleDeleteCompleteTasks}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete All Complete
          </DeleteTask>
          <button onClick={() => {handleMarkAllAsComplete(true)}}><FontAwesomeIcon icon={faCheck} /> Mark All Complete </button>
          <button onClick={() => {handleMarkAllAsComplete(false)}}><FontAwesomeIcon icon={faCheck} /> Mark All Incomplete </button>
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
