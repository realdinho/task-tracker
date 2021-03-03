import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { FaPlusCircle, FaTimesCircle } from 'react-icons/fa'
// import Button from './Button'

const Header = ({ title, showAdd, onAdd }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      {
        location.pathname === '/' && (
          showAdd 
          ? <FaTimesCircle className='btn-close' onClick={onAdd} />
          : <FaPlusCircle className='btn-plus' onClick={onAdd} />
        )
      }
      {/* <Button color='green' text='Add' onClick={onAdd} /> */}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header
