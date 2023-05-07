import React from "react";

import "../styles/index.scss";

import Footer from "../components/Footer";
import Header from "../components/Header";

import RoutesUser from "../customRouter/RoutersUser";
import ChatWidget from "../components/Chat/GPT/ChatWidget";

const Layoutuser = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="main">
          <RoutesUser />
          <ChatWidget />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layoutuser;
