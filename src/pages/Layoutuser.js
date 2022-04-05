import React from 'react'
import { Route } from 'react-router-dom';

import '../styles/index.scss'

import Footer from '../components/Footer';
import Header from '../components/Header';

import RoutesUser from '../customRouter/RoutersUser';

const Layoutuser = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="main">
                    <RoutesUser />
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Layoutuser
