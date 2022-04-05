import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import { } from '../styles/login.css'
import { resetPassword } from '../redux/actions/userAction'

const ResetPassword = (props) => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [matchedPassword, setMatchedPassword] = useState(true);

  const dispatch = useDispatch();

  const state = useSelector(state => state.forgotPassword);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword === rePassword) {
      setMatchedPassword(true);
      dispatch(resetPassword({ _id: userInfo && userInfo._id, password: newPassword, code: token }))
    } else {
      setMatchedPassword(false);
    }
  };

  const resetPass = useSelector(state => state.resetPassword);
  const { success, loading, error } = resetPass;

  useEffect(() => {
    if (success) {
      alert('Đổi mật khẩu thành công. Đăng nhập để mua sắm nào!');
      props.history.push('/login');
    }
  }, [success, props.history]);

  return (
    <Helmet title="Đặt lại mật khẩu">
      <div className="login">
        <form onSubmit={submitHandler} >
          <h3>Đặt lại mật khẩu</h3>
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {(!matchedPassword) && <div>Mật khẩu không khớp!</div>}

          <div className="input-group sort">
            <input type="text" placeholder="Nhập mã code" required
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="input-group sort">
            <input type="password" placeholder="Nhập mật khẩu mới" required
              onChange={(e) => setNewPassword(e.target.value)}
              title="Mật khẩu phải chứa ít nhất một số và một chữ cái viết hoa và viết thường và ít nhất 8 ký tự trở lên"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            />
            <i className="bx bx-lock fa-2x i-login"></i>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Nhập lại mật khẩu" required
              onChange={(e) => setRePassword(e.target.value)}
            />
            <i className="bx bx-lock fa-2x i-login"></i>
          </div>
          <button className="btn btn-submit" type="submit">
            Đổi mật khẩu</button>
          <p>  Quay lại trang<Link to="/login"> đăng nhập</Link></p>
        </form>
      </div>
    </Helmet>

  )
}

export default ResetPassword

