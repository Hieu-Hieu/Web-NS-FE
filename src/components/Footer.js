import React from 'react'

import { Link } from 'react-router-dom'

import Grid from './Grid'

import logo from '../images/logo__txt.PNG'

const footerAboutLinks = [
    {
        display: "Giới thiệu",
        path: "/about"
    },
    {
        display: "Liên hệ",
        path: "/contact"
    },
    {
        display: "Sản phẩm",
        path: "/category"
    }
]

const footerCustomerLinks = [
    {
        display: "Chính sách đổi trả",
        path: "/contact"
    },
    {
        display: "Chính sách bảo hành",
        path: "/contact"
    },
    {
        display: "Chính sách hoàn tiền",
        path: "/contact"
    }
]
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <Grid
                    col={4}
                    mdCol={2}
                    smCol={1}
                    gap={10}
                >
                    <div>
                        <div className="footer__title">
                            Tổng đài hỗ trợ
                        </div>
                        <div className="footer__content">
                            <p>
                                Liên hệ đặt hàng <strong>0123456789</strong>
                            </p>
                            <p>
                                Thắc mắc đơn hàng <strong>0123456789</strong>
                            </p>
                            <p>
                                Góp ý, khiếu nại <strong>0123456789</strong>
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Về NSHC
                        </div>
                        <div className="footer__content">
                            {
                                footerAboutLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="footer__title">
                            Chăm sóc khách hàng
                        </div>
                        <div className="footer__content">
                            {
                                footerCustomerLinks.map((item, index) => (
                                    <p key={index}>
                                        <Link to={item.path}>
                                            {item.display}
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <div className="footer__about">
                        <p>
                            <Link to="/">
                                <img src={logo} className="footer__logo" alt="" />
                            </Link>
                        </p>
                        <p>
                            Mã số thuế: 00000000 <br />
                            Địa chỉ Nông trại: Số 1 Võ Văn Ngân <br />
                            Email: nongsansach@gmail.com <br />
                            Shopee: Nông Sảnh Sạch <br />
                            Fanpage: Nông Sản Sạch
                        </p>
                    </div>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
