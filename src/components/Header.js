import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLogOutAction } from "../redux/actions/userAction";
import Dropdown from "./admin/Dropdown";

import logo from "../images/Capture.PNG";

import Search from "./Search";
import { useTranslation } from "react-i18next";
import LangSelector from "./LanguageSelector";

const Header = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { pathname } = useLocation();

  const { t } = useTranslation();

  const headerRef = useRef(null);

  const mainNav = [
    {
      display: t("home"),
      path: "/",
    },
    {
      display: t("products"),
      path: "/catalog",
    },
  ];

  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  let user_menu = [];
  if (userInfo) {
    if (userInfo.role === "admin") {
      user_menu = [
        {
          icon: "bx bx-user",
          content: t("admin_page"),
          go: "admin",
        },
        {
          icon: "bx bx-log-out-circle bx-rotate-180",
          content: t("logout"),
          go: "",
        },
      ];
    } else {
      user_menu = [
        {
          icon: "bx bx-user",
          content: t("account"),
          go: "/my-profile",
        },
        {
          icon: "bx bx-user",
          content: t("orders"),
          go: "order-history",
        },
        {
          icon: "bx bx-log-out-circle bx-rotate-180",
          content: t("logout"),
          go: "",
        },
      ];
    }
  }

  useEffect(() => {
    const isScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("shrink");
      } else {
        headerRef.current?.classList.item("shrink") &&
          headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", isScroll);

    return () => {
      window.removeEventListener("scroll", isScroll);
    };
  }, [cartItems]);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  const signoutHandler = () => {
    dispatch(userLogOutAction());
  };

  const searchMobileRef = useRef(null);
  const handleFucusSearch = () => {
    searchMobileRef.current.classList.toggle("active");
  };
  const hanldeOnblur = () => {
    // searchMobileRef.current.classList.remove('active');
    // setShowSearch(false)
  };

  return (
    <div className="header" ref={headerRef}>
      <div className="container header__inner">
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__logo" style={{ height: "100%" }}>
            <Link to="/">
              <img
                src={logo}
                alt="#"
                style={{ width: "60px", borderRadius: "50%" }}
              />
            </Link>
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right__item">
              <i
                className="bx bx-search search-icon-mobile"
                onClick={handleFucusSearch}
              ></i>
              <Search ref={searchMobileRef} hanldeOnblur={hanldeOnblur} />
            </div>

            <div className="header__menu__item header__menu__right__item">
              <Link to="/cart">
                <span className="cart-icon-wrap">
                  {cartItems ? (
                    cartItems.length > 0 ? (
                      <span className="cart-icon-amout">
                        {cartItems.length}
                      </span>
                    ) : (
                      false
                    )
                  ) : (
                    false
                  )}
                  <i className="bx bx-shopping-bag"></i>
                </span>
              </Link>
            </div>
            <div className="header__menu__item header__menu__right__item">
              {!userInfo ? (
                <div className="user-login-icon">
                  <Link to="/login" className="user-icon">
                    <i class="bx bx-user"></i>
                  </Link>
                  <Link to="/login">{t("login")}</Link>
                  <Link to="/register">| {t("logout")}</Link>
                </div>
              ) : (
                <div className="user-wrap">
                  <Dropdown
                    customToggle={() => renderUserToggle(userInfo)}
                    contentData={user_menu}
                    renderItems={(item, index) =>
                      renderUserMenu(item, index, signoutHandler)
                    }
                    // logOut ={signoutHandler}
                  />
                </div>
              )}
              <LangSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.avatar} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.firstName}</div>
  </div>
);

const renderUserMenu = (item, index, signoutHandler) => (
  <Link
    to={item.go}
    key={index}
    onClick={item.go === "" && (() => signoutHandler())}
  >
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

export default Header;
