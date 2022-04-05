import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateSlideAction, detailSlideAction } from '../../redux/actions/slideAction'
import { Link } from 'react-router-dom';


const EditSlide = ({ match, history }) => {

  const slideId = match.params.id;

  const slideDetail = useSelector(state => state.detailSlide)
  const { loading, error, slide } = slideDetail;

  const updateSlide = useSelector(state => state.updateSlide)
  const { loading: loadingUpdate, error: erorUpdate } = updateSlide;

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
      if (!slide || slide._id !== slideId) {
        dispatch(detailSlideAction(slideId))
      } else {
        setName(slide.name)
        setImage(slide.image)
        setPath(slide.path)
        setDescription(slide.description)
        setStatus(slide.status)
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, slideId, slide, history, userInfo])

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateSlideAction({
      _id: slide._id,
      name,
      status,
      description,
      image,
      path,
    }))
    // setTimeout(() => {
    //   success && toast.success("Cập nhật thành công")
    //   erorUpdate && toast.success(erorUpdate)
    //   // alert('ok')
    // }, 2000)
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
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
      />

      <h2 className="page-header">Chỉnh sửa Slide</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {loadingUpdate && <div>Loading...</div>}
            {erorUpdate && <div>{erorUpdate}</div>}
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Cam sành hữu cơ"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                    value={name}
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
                  <img src={image} alt="hình ảnh" />

                  <div>Tải hình ảnh lên</div>
                  <input type="file" id="file"
                    onChange={handleUploadImage}
                  />
                  <div className="userUpdateItem">
                    <label>Đường dẫn tới sản phẩm</label>
                    <input
                      type="text"
                      placeholder="Cam sành hữu cơ"
                      className="userUpdateInput"
                      onChange={e => setPath(e.target.value)}
                      value={path}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Mô tả</label>
                    <textarea
                      placeholder=""
                      className="userUpdateInput"
                      onChange={e => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                  </div>
                </div>
                <Link to="/admin/slides" className="userUpdateButton">Trở về</Link>
                <button className="userUpdateButton">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSlide;

