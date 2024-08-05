import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskSummary = ({numCompleted, totalTasks}) => {
  const percentageCompleted = numCompleted / totalTasks * 100
  const numIncomplete =  totalTasks - numCompleted

  const doughnutData = {
    labels: [
      "Completed",
      "ToDos"
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

      }
    ]
  }

  return (
    <>
      <div className="tasks-summary-container">
        <div>
          <p>Completed</p>
          <p>90%</p>
          <p>9/10</p>
        </div>
        <Doughnut data={doughnutData} />
      </div>
    </>
  )
}

export default TaskSummary