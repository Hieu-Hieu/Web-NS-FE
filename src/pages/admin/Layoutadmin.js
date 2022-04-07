import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin/indexadmin.scss'
import RouterAdmin from '../../customRouter/RouterAdmin'

/* components */
import Sidebar from '../../components/admin/Sidebar'
import Topnav from '../../components/admin/Topnav'
import { useSelector } from 'react-redux'

const Layoutadmin = () => {
    let navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    return (

        <>
            {
                userInfo && userInfo.role === 'admin' ?
                    <>
                        <Sidebar />
                        <div className="layout__content">
                            <Topnav />
                            <div className="layout__content-main">
                                <RouterAdmin />
                            </div>
                        </div>

                    </>
                    : navigate("/login")
            }
        </>
    )
}

export default Layoutadmin
