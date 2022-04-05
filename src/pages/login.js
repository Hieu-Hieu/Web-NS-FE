import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

import Helmet from '../components/Helmet'
import { } from '../styles/login.css'
import { userLoginAction } from '../redux/actions/userAction'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLoginAction({ email, password }));
    }

    const handleGGLogin = (googleData) => {
        dispatch(userLoginAction({ token: googleData.tokenId, ggId: googleData.googleId }));
    }

    const handleGGFailure = () => {
        alert('Đăng nhập không thành công')
    }

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    useEffect(() => {

        if (userInfo) {
            if (userInfo.role === 'admin') {
                props.history.push('/admin')
            } else {
                props.history.push(redirect);
            }
        }

    }, [props.history, redirect, userInfo]);

    return (
        <Helmet title="Đăng nhập">
            <div className="login">
                <form onSubmit={handleSubmit} >
                    <h3>Đăng Nhập</h3>
                    {loading && <div>Loading...</div>}
                    {error && <div className="form-alert">{error}</div>}
                    <div className="input-group">
                        <input type="email" placeholder="Địa chỉ email" required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="far fa-envelope fa-2x i-login"></i>
                    </div>
                    <div className="input-group">
                        <input type="password" placeholder="Mật khẩu" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i className="fas fa-lock fa-2x i-login"></i>
                    </div>
                    <button className="btn btn-submit" type="submit">
                        Đăng nhập</button>
                    <p>Quên mật khẩu ? <Link to="/get-token">Nhấn vào đây</Link></p>
                    <p>Bạn chưa có tài khoản chưa?<Link to="/register">Đăng ký</Link> </p>
                    <p>Hoặc</p>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        onSuccess={handleGGLogin}
                        onFailure={handleGGFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                    {/* <button className="btn btn-fb">Đăng nhập với Google <i class="fab fa-facebook fa-2x"></i></button> */}
                </form>
            </div>
        </Helmet>

    )
}

export default Login
