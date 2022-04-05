import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../../images/logo__txt.PNG'

import sidebar from '../../fakedata/sidebar'

const SidebarItem = props => {
    const active = props.active ? 'active' : ''

    return (
        <div className="sidebar__item">
            <div className={`sidebar__item-inner ${active}`}>
                <i className={props.icon}></i>
                <span>{props.title}</span>
            </div>
        </div>
    )
}

const Sidebar = (props) => {

    const activeItem = sidebar.findIndex((item => item.route === props.location.pathname))

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img onClick={() => props.history.push('/')}
                    src={logo} className="company logo" alt="logo" />
            </div>
            {
                sidebar.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={index === activeItem}
                        />

                    </Link>
                ))
            }
        </div>
    )
}

export default Sidebar
