import TaskSummary from "../components/TaskSummary";

const Tasks = () => {
    return (
        <>
          <ListsSection />
          <TasksSection />
        </>
    )
}

const ListsSection = () => {
  return (
    <>
      <section className="tasks-section lists">
        <hgroup>
          <h2>Lists</h2>
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

const TasksSection = () => {
  return (
    <>
      <section className="tasks-section tasks">
        <h2>LIST NAME</h2>
        <TaskSummary numCompleted={3} totalTasks={4} />
        <ul>
          <li>TASKS</li>
          <li>TASKS</li>
          <li>TASKS</li>
          <li>TASKS</li>
          <li>TASKS</li>
        </ul>
      </section>
    </>
  )
}



export default Tasks