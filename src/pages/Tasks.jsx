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