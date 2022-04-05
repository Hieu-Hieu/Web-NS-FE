import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { detailsUser, updateUserProfile } from '../redux/actions/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = ({ history }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [matchedPassword, setMatchedPassword] = useState(true);
  const [image, setImage] = useState('');

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;
  const userDetail = useSelector(state => state.userDetail);
  const { loading, error, user } = userDetail;
  const dispatch = useDispatch()

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {

    if (!userInfo) {
      history.push('/login')
    } else {
      if (userInfo && userInfo.role === 'admin') {
        history.push('/admin')
      }
      else if (!user) {
        dispatch(detailsUser(userInfo._id));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
        setImage(user.avatar);
      }
    }

    // }
  }, [dispatch, userInfo, user, history])

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch update profile

    if (password !== confirmPassword) {
      setMatchedPassword(false);
    } else {
      setMatchedPassword(true);
      dispatch(
        updateUserProfile({
          _id: user._id,
          firstName,
          lastName,
          email,
          password,
          address,
          phone,
          avatar: image,
        })
      );
    }
  }

  const uploadImage = (e) => {
    const cloundName = 'dl02ow13v';
    const uploadPreset = 'oj8a39rm';
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", uploadPreset);


    axios.post(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, formData)
      .then(res => {
        setImage(res.data.url)

      }).catch(error =>
        console.log(error)
      )
  }

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <h2 className="page-header">Tài khoản của tôi</h2>
      <div className="row">
        <div className="col-4">
          <div className="card full-height">
            {
              loading ? <div>Loading...</div> : error ? <div>{error}</div>
                : <div>
                  <div className="userShowTop">
                    <img
                      src={(user && user.avatar) || ''}
                      alt=""
                      className="userShowImg"
                    />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{(user && user.name) || ''}</span>
                      <span className="userShowUserTitle">Loại TK: {(user && user.role) || ''}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Thông tin tài khoảns</span>
                    <div className="userShowInfo">
                      <i className="bx bx-user bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && (user.lastName + ' ' + user.firstName)) || ''}</span>
                    </div>

                    <span className="userShowTitle">Thông tin liên hệ</span>
                    <div className="userShowInfo">
                      <i className="bx bx-phone bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.phone) || ''}</span>
                    </div>
                    <div className="userShowInfo">
                      <i className="bx bx-mail-send bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.email) || ''}</span>
                    </div>
                    <div className="userShowInfo">
                      <i className="bx bx-map bx-sm userUpdateIcon"></i>
                      <span className="userShowInfoTitle">{(user && user.address) || ''}</span>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
        <div className="col-8">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <span className="userShowTitle">Cập nhật thông tin</span>
                {loadingUpdate && <div>Đang cập nhật...</div>}
                {errorUpdate && <div>{errorUpdate}</div>}

                <div className="userUpdateItem">
                  <label>Họ và tên đệm</label>
                  <input
                    type="text"
                    placeholder="Ngo Xuan"
                    className="userUpdateInput"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                  />
                  {console.log(lastName)}
                </div>
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    placeholder="Thang"
                    className="userUpdateInput"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="+01 23456789"
                    className="userUpdateInput"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="mail@gmail.com"
                    className="userUpdateInput"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Địa chỉ</label>
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="userUpdateInput"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="userUpdateLeft">
                <span className="userShowTitle">Thay đổi mật khẩu</span>
                <div className="userUpdateItem">
                  <label>Nhập mật khẩu</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="userUpdateInput"
                    onChange={e => setPassword(e.target.value)}
                    title="Mật khẩu phải chứa ít nhất một số và một chữ cái viết hoa và viết thường và ít nhất 8 ký tự trở lên"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Xác thực mật khẩu</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="userUpdateInput"
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  {(!matchedPassword) && <div>Mật khẩu không khớp!</div>}
                </div>
              </div>


              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={image}
                    alt=""
                  />
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input onChange={uploadImage} type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
