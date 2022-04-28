import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

import Helmet from '../components/Helmet'
import { userLoginAction } from '../redux/actions/userAction'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error1, setError1] = useState('');

    const { search } = useLocation();
    const dispatch = useDispatch();
    //get redirect params
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : '/';
    let navigate = useNavigate();

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    useEffect(() => {

        if (userInfo) {
            if (userInfo.role === 'admin') {
                navigate('/admin')
            } else {
                navigate(redirect)
            }
        }

    }, [redirect, userInfo]);

    useEffect(() => {
        console.log('err')
        if (error && !error1) {
            setError1(error);
            setTimeout(() => {
                setError1('');
            }, 3000)
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLoginAction({ email, password }));
    }

    const handleGGLogin = (googleData) => {
        dispatch(userLoginAction({ token: googleData.tokenId, ggId: googleData.googleId }));
    }

    const handleGGFailure = () => {
        console.log("Google Login Fail");
    }

    return (
        <Helmet title="Đăng nhập">
            <div className="login">
                <form onSubmit={handleSubmit} >
                    <h3>Đăng Nhập</h3>
                    {loading && <div>Đăng nhập...</div>}
                    {error1 && <div className="form-alert">{error1}</div>}
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
                        <box-icon name='show'></box-icon>
                    </div>
                    <button className="btn btn-submit" type="submit">
                        Đăng nhập</button>
                    <p>Quên mật khẩu ? <Link to="/get-token">Nhấn vào đây</Link></p>
                    <p>Bạn chưa có tài khoản chưa?<Link to="/register">Đăng ký</Link> </p>
                    <p>Hoặc</p>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={handleGGLogin}
                        onFailure={handleGGFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                </form>
            </div>
        </Helmet>

    )
}

export default Login;
