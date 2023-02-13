import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryAction } from '../../redux/actions/categoryActions';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategory = ({ match, history }) => {

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [status, setStatus] = useState(0)

  const dispatch = useDispatch()

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {

    } else {
      history.push('/login')
    }
  }, [history, userInfo])


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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategoryAction({
      name,
      status,
      displayOrder,
      image,
    }))
  }

  return (
    <div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <h2 className="page-header">Thêm danh mục</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên</label>
                  <input
                    type="text"
                    placeholder="Rau củ quả"
                    className="userUpdateInput"
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái</label>
                  <select onChange={e => setStatus(e.target.value)}>
                    <option value='true'>Hiển thị</option>
                    <option value='false'>Ẩn đi</option>
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Thứ tự hiển thị</label>
                  <input
                    type="number"
                    placeholder="VD: 1"
                    className="userUpdateInput"
                    onChange={e => setDisplayOrder(e.target.value)}
                    required
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Hình ảnh</label>
                  {/* <input
                    type="text"
                    placeholder="Nhập url hình ảnh"
                    className="userUpdateInput"
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  /> */}
                  <img src={image} alt="Hình ảnh"
                    style={{ maxWidth: '200px' }}
                  />
                  <input type="file" id="file"
                    onChange={uploadImage}
                  />
                </div>
                <br />
                <br />
                <button className="userUpdateButton">Tạo</button>
                <br />
                <br />
                <Link to="/admin/categories">
                  <button className="userUpdateButton">Trở về</button>
                </Link>
              </div>
              {/* <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder="Thang Ngo"
                      className="userUpdateInput"
                    />
                  </div>
                </div> */}

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCategory

