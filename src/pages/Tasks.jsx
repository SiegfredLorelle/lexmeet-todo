import TaskSummary from "../components/TaskSummary";
import ScrollableMenu from "../components/ScrollableMenu";

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

  return (
    <>
      <section className="tasks-section tasks">
        <h2>LIST NAME</h2>
        <TaskSummary numCompleted={3} totalTasks={4} />
        <h3>Tasks</h3>
        <ScrollableMenu commands={filterCommands}/>
        <ScrollableMenu commands={sortCommands}/>
        <ul>
          <li>Task here</li>
          <li>Task here</li>
          <li>Task here</li>
          <li>Task here</li>
          <li>Task here</li>
        </ul>
      </section>
    </>
  )
}



export default Tasks