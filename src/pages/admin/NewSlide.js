import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addSlideAction } from '../../redux/actions/slideAction'
import { Link } from 'react-router-dom';


const NewSlide = ({ history }) => {

  // const Slide = useSelector(state => state.addSlide)
  // const { loading, error, slide } = Slide;

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [path, setPath] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(0)

  const dispatch = useDispatch()

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {

    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addSlideAction({
      name,
      status,
      description,
      image,
      path,
    }))

  }

  const handleUploadImage = (e) => {
    const cloundName = 'dl02ow13v';
    const uploadPreset = 'oj8a39rm';
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", uploadPreset);

    console.log(formData)

    Axios.post(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, formData)
      .then(res => {
        setImage(res.data.url)

      }).catch(error =>
        console.log(error)
      )
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2400}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 className="page-header">Thêm mới Slide</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Cam sành hữu cơ"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái</label>
                  <select defaultValue={status} onChange={e => setStatus(e.target.value)}>
                    <option value='true'>Hiển thị</option>
                    <option value='false' >Ẩn đi</option>
                  </select>
                </div>

                <div className="userUpdateItem">
                  <label>Hình ảnh</label>
                  <img src={image} alt="Hình ảnh" />

                  <br />
                  <input type="file" id="file"
                    onChange={handleUploadImage}
                  />
                  <div className="userUpdateItem">
                    <label>Đường dẫn tới sản phẩm</label>
                    <input
                      type="text"
                      placeholder="Link"
                      className="userUpdateInput"
                      onChange={e => setPath(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Mô tả</label>
                    <textarea
                      placeholder=""
                      className="userUpdateInput"
                      onChange={e => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <br />
                <br />
                <button className="userUpdateButton">Lưu</button>
                <br />
                <br />
                <Link to="/admin/slides">
                  <button className="userUpdateButton">Trở về</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewSlide;

