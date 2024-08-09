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
  const [tasksStack, setTasksStack] = useState([loadTasksFromLocalStorage()]);

  useEffect(() => {
    const loadedTasks = loadTasksFromLocalStorage();
    setTasks(loadedTasks);
    setTasksStack([loadedTasks]);
  }, []);

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const updateTasks = (newTasks) => {
    setTasksStack((prevStack) => [...prevStack, newTasks]);
    setTasks(newTasks);
  };

  const toggleListsSection = () => {
    setShowListsSection(!showListsSection);
  };

  const handleEditTask = (updatedTaskData, taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    updateTasks(updatedTasks);
  };

  const handleNewTask = (newTask) => {
    updateTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    updateTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    updateTasks([]);
  };

  const handleDeleteCompleteTasks = () => {
    const updatedTasks = tasks.filter(task => task.status !== 'Complete');
    updateTasks(updatedTasks);
  };

  const handleMarkAllAsComplete = (asComplete) => {
    const updatedTasks = tasks.map(task => ({
      ...task,
      status: asComplete ? 'Complete' : 'Incomplete',
      completedAt: asComplete ? new Date().toISOString() : null,
    }));
    updateTasks(updatedTasks);
  };

  const handleUndo = () => {
    if (tasksStack.length > 1) {
      const newStack = tasksStack.slice(0, -1);
      setTasksStack(newStack);
      setTasks(newStack[newStack.length - 1]);
    }
  };

  return (
    <>
      <Header toggleListsSection={toggleListsSection} />
      <div className="groups-container">
      <ListsSection showListsSection={showListsSection} />
      </div>
      <div className="tasks-container">
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
        handleUndo={handleUndo}
        tasks={tasks}
      />
    </>
  );
};

const ListsSection = ({ showListsSection }) => (
  <section className={`tasks-section lists ${showListsSection ? 'visible' : ''}`}>
    <hgroup>
      <h2>Groups (Work in Progress)</h2>
      <p>Group your tasks.</p>
    </hgroup>
    <ul>
      <li>Placeholder Group A</li>
      <li>Placeholder Group B</li>
      <li>Placeholder Group C</li>
    </ul>
  </section>
);

const TasksSection = ({ handleNewTask, handleEditTask, handleDeleteTask, tasks }) => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Created");

  const numCompleted = tasks.filter(task => task.status === 'Complete').length;

  const filterCommands = [
    { label: "All", action: () => setFilter("All") },
    { label: "Done", action: () => setFilter("Complete") },
    { label: "Incomplete", action: () => setFilter("Incomplete") },
    { label: "Passed Deadline", action: () => setFilter("Passed Deadline") },
    { label: "Missing", action: () => setFilter("Missing") },
  ];

  const sortCommands = [
    { label: "Created", action: () => setSort("Created") },
    { label: "Deadline", action: () => setSort("Deadline") },
    { label: "Priority", action: () => setSort("Priority") },
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === "All") {
      return true;
    } 
    else if (filter === "Passed Deadline") {
      const currentDateTime = new Date();
      const taskDeadline = new Date(task.deadline);
      return taskDeadline < currentDateTime;
    } 
    else if (filter === "Missing") {
      const currentDateTime = new Date();
      const taskDeadline = new Date(task.deadline);
      return taskDeadline < currentDateTime && task.status !== 'Complete';
    }
    else {
      return task.status === filter;
    }
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === "Created") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sort === "Deadline") {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sort === "Priority") {
      const priorityMap = { High: 3, Medium: 2, Low: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    } else {
      return 0;
    }
  });

  return (
    <section className="tasks-section tasks">
      {/* <h2>Group NAME</h2> */}
      <TaskSummary numCompleted={numCompleted} totalTasks={tasks.length} handleNewTask={handleNewTask}/>
      {/* <h3>Tasks</h3> */}
      <ScrollableMenu commands={filterCommands} />
      <ScrollableMenu commands={sortCommands} />
      <ul>
        {sortedTasks.length === 0 ? (
          <>
            <img className="no-task-img" src="sleeping-no-task.png" />
            <p className="no-task-message">No Tasks yet. Feel free to add a task.</p>
          </>
        ) : (
          sortedTasks.map(task => (
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
    const completedAt = !isChecked ? new Date().toISOString() : null;

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
          <span className={`tasks-item-pill priority-pill priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className="tasks-item-pill">{calculateTimeLeft(task.deadline)}</span>
        </div>
        <span className="tasks-item-text-name">{task.name}</span>
      </div>
      <div 
        className="tasks-item-actions" 
        onClick={(e) => {
          e.stopPropagation();
          setShowActions(!showActions);
        }}
      >
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

const BottomControls = ({
  handleNewTask,
  handleDeleteAllTasks,
  handleDeleteCompleteTasks,
  handleMarkAllAsComplete,
  handleUndo,
  tasks,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const hasTasks = tasks.length === 0;
  const hasCompletedTasks = tasks.some(task => task.status === "Complete");
  const hasIncompletedTasks = tasks.some(task => task.status === "Incomplete");

  return (
    <div className="bottom-controls-container">
      {isMenuOpen && (
        <div className="additional-buttons">
          <DeleteTask 
            option={"ALL tasks"} 
            task={null} 
            handleDeleteTask={handleDeleteAllTasks} 
            disabled={hasTasks} 
          >
            <FontAwesomeIcon icon={faTrash} /> <span>Delete All</span>
          </DeleteTask>
          <DeleteTask 
            option={"Completed tasks"} 
            task={null} 
            handleDeleteTask={handleDeleteCompleteTasks} 
            disabled={!hasCompletedTasks}
          >
            <FontAwesomeIcon icon={faTrash} /> <span>Delete All Complete</span>
          </DeleteTask>
          <button onClick={() => {handleMarkAllAsComplete(true)}} disabled={!hasIncompletedTasks}>
            <FontAwesomeIcon icon={faCheck} /> <span>Mark All Complete</span>
          </button>
          <button onClick={() => {handleMarkAllAsComplete(false)}} disabled={!hasCompletedTasks}>
            <FontAwesomeIcon icon={faCheck} /> <span>Mark All Incomplete</span>
          </button>
        </div>
      )}
      <div className="main-buttons">
        <button onClick={handleUndo}>
          <FontAwesomeIcon icon={faArrowRotateLeft} /> <span>Undo</span>
        </button>
        <CreateTask handleNewTask={handleNewTask}>
          <FontAwesomeIcon icon={faPlus} /> <span>Add Task</span>
        </CreateTask>
        <div className="menu-toggle">
          <button onClick={toggleMenu}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
