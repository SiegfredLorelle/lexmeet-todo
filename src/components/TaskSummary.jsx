import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateTask from '../utils/CreateTask';

ChartJS.register(ArcElement, Tooltip);

const TaskSummary = ({ numCompleted, totalTasks, handleNewTask }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const percentageCompleted = ((numCompleted / totalTasks) * 100).toFixed(2);
  const numIncomplete = totalTasks - numCompleted;

  const doughnutData = {
    labels: [
      "Completed",
      "Incomplete"
    ],
    datasets: [
      {
        label: "Task Summary",
        data: [
          numCompleted,
          numIncomplete
        ],
        backgroundColor: [
          '#4caf50', 
          '#e0e0e0'
        ],
        borderRadius: 8,
      }
    ]
  }

  return (
    <>
      <div className="tasks-summary-container">
        <div className="tasks-summary-info-container">
          <div className="tasks-summary-info">
            <p className="tasks-summary-description">Completed</p>
            <p className="tasks-summary-percentage">{percentageCompleted}%</p>
          </div>
          <div className="tasks-summary-doughnut-chart">
            <Doughnut data={doughnutData} />
          </div>
        </div>
        {windowWidth >= 768 ? (
          <div className="tasks-summary-button-container">
            <CreateTask handleNewTask={handleNewTask}><FontAwesomeIcon icon={faPlus} />  Add Task</CreateTask>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default TaskSummary;
