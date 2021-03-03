import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!text) {
      alert('please add a task')
      return
    }

    onAdd({ text, day, reminder })

    setText('')
    setDay('')
    setReminder('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        {/* <label className='label-form'>Task</label> */}
        <input 
          type='text' 
          placeholder='Task Description'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        {/* <label className='label-form'>Day & Time</label> */}
        <input 
          type='text' 
          placeholder='Day & Time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control-check'>
        <input 
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
        <label className='label-form'>Set Reminder?</label>
      </div>

      <input type='submit' value='Save' className='btn btn-block' />
    </form>
  )
}

export default AddTask
