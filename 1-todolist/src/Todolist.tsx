type propsType = {
  type: string
  tasks: tasksType[]
}
type tasksType = {
  id: number
  title: string
  isDone: boolean
}

export function Todolist({type, tasks}: propsType) {
  return (
    <>
      <div>
        <h3>{type}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {tasks.map(t => <li key={t.id}><input type="checkbox" onChange={() => {
          }} checked={t.isDone}/> <span>{t.title}</span></li>)}
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </>
  );
}

