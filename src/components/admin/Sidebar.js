import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import logo from '../../images/Capture.PNG'
import sidebar from '../../fakedata/sidebar'

const SidebarItem = props => {
    const active = props.active ? 'active' : ''
    console.log(props)

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

const Sidebar = () => {

    const navigate = useNavigate();
    const activeItem = useLocation().pathname;

    console.log(activeItem)

    return (
        <div className="sidebar active" >
            {/* <div className='sidebar-icon'>
                <i class='bx bx-menu'></i>
            </div> */}
            <div className="sidebar__logo">
                <img onClick={() => navigate('/')}
                    src={logo} className="company logo" alt="logo" />
            </div>
            {
                sidebar.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={item.route === activeItem}
                        />

                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
