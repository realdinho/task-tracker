import { FaTrash, FaBell, FaBellSlash } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggleReminder }) => {
  return (
    <div 
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggleReminder(task.id)}
    >
      <h3>
        {task.text} 
        <FaTrash 
          style={{ color: 'red', cursor: 'pointer' }} 
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>
        { task.reminder ? <FaBell/> : <FaBellSlash/> } 
        {task.day}
      </p>
    </div>
  )
}

export default Task
