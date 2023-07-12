import React from "react";

import { Link } from "react-router-dom";

import Grid from "./Grid";

import logo from "../images/Capture.PNG";
import { useTranslation } from "react-i18next";

const footerAboutLinks = [
  {
    display: "introduce",
    path: "/about",
  },
  {
    display: "contact",
    path: "/contact",
  },
  {
    display: "products",
    path: "/category",
  },
];

const footerCustomerLinks = [
  {
    display: "return_policy",
    path: "/contact",
  },
  {
    display: "warranty_policy",
    path: "/contact",
  },
  {
    display: "refund_policy",
    path: "/contact",
  },
];
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">{t("support_call_center")}</div>
            <div className="footer__content">
              <p>
                {t("contact_to_order")} <strong>0888308223</strong>
              </p>
              <p>
                {t("order_problem")} <strong>0888308223</strong>
              </p>
              <p>
                {t("feedback_complaints")} <strong>0888308223</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">{t("about_hfood")}</div>
            <div className="footer__content">
              {footerAboutLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{t(item.display)}</Link>
                </p>
              ))}
            </div>
          </div>
          <div>
            <div className="footer__title">{t("customer_care")}</div>
            <div className="footer__content">
              {footerCustomerLinks.map((item, index) => (
                <p key={index}>
                  <Link to={item.path}>{t(item.display)}</Link>
                </p>
              ))}
            </div>
          </div>
          <div className="footer__about">
            <p>
              <Link to="/">
                <img src={logo} className="footer__logo" alt="" />
              </Link>
            </p>
            <p>
              {t("tax_code")}: 00000000 <br />
              {t("address")}: Số 1 Võ Văn Ngân <br />
              Email: Hfood@gmail.com <br />
              Shopee: Hfood <br />
              Fanpage: Hfoof
            </p>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
