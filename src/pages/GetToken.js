import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import { } from '../styles/login.css'
import { fogotPassword } from '../redux/actions/userAction'

const GetToken = (props) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dispatch(fogotPassword({ email }))) {
      props.history.push('reset_password')
    }

  }

  return (
    <Helmet title="Lấy mã">
      <div className="login">
        <form onSubmit={handleSubmit} >
          <h3>Lấy mã</h3>
          <div className="input-group sort">
            <input type="email" placeholder="Địa chỉ email của bạn" required
              onChange={(e) => setEmail(e.target.value)}

            />
            <i className="bx bx-envelope fa-2x i-login"></i>
          </div>
          <button className="btn btn-submit" type="submit">
            Lấy mã</button>
          <div>  Quay lại trang<Link to="/login">  Đăng nhập</Link></div>
        </form>
      </div>
    </Helmet>

  )
}

export default GetToken

