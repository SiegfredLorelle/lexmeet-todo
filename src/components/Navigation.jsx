import "../assets/styles/sidebar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faThumbTack, faCalendarDays, faUser} from '@fortawesome/free-solid-svg-icons'


const SideBar = () => {
  return (
    <>
      <aside className="sidebar-container">
        <nav>
          <ul>
            <li>
              <NavItem icon={faHouseChimney} text="Home" link="/"/>
              <NavItem icon={faThumbTack} text="Tasks" link="/tasks"/>
              <NavItem icon={faCalendarDays} text="Schedule" link="#TODO"/>
              <NavItem icon={faUser} text="Profile" link="#TODO"/>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}

const NavItem = ({icon, text, link}) => {
  return (
    <>
      <a href={link}>
        <div className="sidebar_icon-text-container">
          <FontAwesomeIcon icon={icon} />
          <span>{text}</span>
        </div>
      </a>
    </>
  )
}

export default SideBar