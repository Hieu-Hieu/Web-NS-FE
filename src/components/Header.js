import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, Route } from 'react-router-dom'
import { userLogOutAction } from '../redux/actions/userAction'
import Dropdown from './admin/Dropdown'

import logo from '../images/Logo.png'

import Search from './Search'

const mainNav = [
    {
        display: "Trang chủ",
        path: "/"
    },
    {
        display: "Sản phẩm",
        path: "/catalog"
    },
    {
        display: "Giới thiệu",
        path: "/intro"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    }
]

const Header = () => {

    const userSignin = useSelector(state => state.userSignin);
    const dispatch = useDispatch();
    const { userInfo } = userSignin;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const { pathname } = useLocation()
    const activeNav = mainNav.findIndex(e => e.path === pathname)

    const headerRef = useRef(null)
    let user_menu = []
    if (userInfo) {
        if (userInfo.role === 'admin') {
            user_menu = [
                {
                    "icon": "bx bx-user",
                    "content": "Trang Admin",
                    "go": "admin"
                },
                {
                    "icon": "bx bx-log-out-circle bx-rotate-180",
                    "content": "Đăng xuất",
                    "go": ""
                },
            ]
        } else {
            user_menu = [
                {
                    "icon": "bx bx-user",
                    "content": "Tài khoản",
                    "go": "/my-profile"
                },
                {
                    "icon": "bx bx-user",
                    "content": "Đơn hàng",
                    "go": "order-history"
                },
                {
                    "icon": "bx bx-log-out-circle bx-rotate-180",
                    "content": "Đăng xuất",
                    "go": "",
                },
            ]
        }
    }


    useEffect(() => {

        const isScroll = () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.item('shrink') && headerRef.current.classList.remove('shrink')
            }
        }

        window.addEventListener("scroll", isScroll)

        return () => {
            window.removeEventListener("scroll", isScroll)
        };

    }, [cartItems]);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    const signoutHandler = () => {
        dispatch(userLogOutAction());
    }

    const renderUserToggle = (user) => (
        <div className="topnav__right-user">
            <div className="topnav__right-user__image">
                <img src={user.avatar} alt="" />
            </div>
            <div className="topnav__right-user__name">
                {user.firstName}
            </div>
        </div>
    )

    const renderUserMenu = (item, index) => (
        <Link to={item.go} key={index}
            onClick={item.go === "" && (() => signoutHandler())}
        >
            <div className="notification-item">
                <i className={item.icon}></i>
                <span>{item.content}</span>
            </div>
        </Link>
    )


    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                <div className="header__logo" style={{ height: '100%' }}>
                    <img src={logo} alt="#" style={{ width: '60px', borderRadius: '50%' }} />
                </div>
                <div className="header__menu">
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu-alt-left'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNav.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <div className="header__menu__right">
                        <div className="header__menu__item header__menu__right__item">
                            {/* <i className="bx bx-search"></i> */}

                            <Route render={({ history }) => <Search history={history} />}></Route>
                        </div>

                        <div className="header__menu__item header__menu__right__item">
                            <Link to="/cart">
                                <span className="cart-icon-wrap">
                                    {cartItems ? cartItems.length > 0 ?
                                        <span className="cart-icon-amout">{cartItems.length}</span>
                                        : false : false
                                    }
                                    <i className="bx bx-shopping-bag"></i>
                                </span>
                            </Link>
                        </div>
                        <div className="header__menu__item header__menu__right__item">
                            {!userInfo ?
                                <div style={{ fontSize: '14px' }}>
                                    <Link to="/login">Đăng nhập</Link>
                                    <Link to="/register">| Đăng ký</Link>
                                </div>
                                : <div className="user-wrap">
                                    {/* <i className="bx bx-user"></i> */}
                                    {/* <div className="dropdown">
                                        <ul>
                                            <li><Link to=""><span>Tài khoản của tôi</span></Link></li>
                                            <li><Link to="">Đơn mua</Link></li>
                                            <li><Link to="#signout" onClick={signoutHandler}
                                            >Đăng xuất
                                            </Link></li>
                                        </ul>
                                    </div> */}
                                    <Dropdown
                                        customToggle={() => renderUserToggle(userInfo)}
                                        contentData={user_menu}
                                        renderItems={(item, index) => renderUserMenu(item, index)}
                                    // logOut ={signoutHandler}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
