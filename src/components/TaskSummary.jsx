import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


ChartJS.register(ArcElement, Tooltip);

const TaskSummary = ({numCompleted, totalTasks}) => {
  const percentageCompleted = numCompleted / totalTasks * 100
  const numIncomplete =  totalTasks - numCompleted

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
        hoverOffset: 4
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
            <p className="tasks-summary-fraction">{numCompleted}/{totalTasks}</p>
          </div>
          <div className="tasks-summary-doughnut-chart">
            <Doughnut data={doughnutData} />
          </div>
        </div>

        <div className="tasks-summary-button-container">
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </>
  )
}

export default TaskSummary