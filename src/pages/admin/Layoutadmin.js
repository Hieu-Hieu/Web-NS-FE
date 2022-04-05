import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import '../../styles/admin/indexadmin.scss'
import RouterAdmin from '../../customRouter/RouterAdmin'

/* components */
import Sidebar from '../../components/admin/Sidebar'
import Topnav from '../../components/admin/Topnav'
import { useSelector } from 'react-redux'

const Layoutadmin = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <Route render={(props) => (
            userInfo && userInfo.role === 'admin' ?
                <div>
                    <Sidebar {...props} />
                    <div className="layout__content">
                        <Topnav />
                        <div className="layout__content-main">
                            <RouterAdmin />
                        </div>
                    </div>
                </div>
                : <Redirect to="/login"></Redirect>
        )} />
    )
}

export default Layoutadmin
