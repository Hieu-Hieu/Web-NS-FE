import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateBrandAction, detailBrandAction } from '../../redux/actions/brandActions'
import { BRAND_UPDATE_RESET } from '../../redux/constants/brandConstants'

const EditBrand = ({ match, history }) => {

  const brandId = match.params.id;

  const brandDetail = useSelector(state => state.detailBrand)
  const { loading, error, brand } = brandDetail;

  const [name, setName] = useState('')
  const brandUpdate = useSelector(state => state.updateBrand);
  const { loading: loadingUpdate, error: errorUpdate } = brandUpdate;

  const dispatch = useDispatch()
  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      if (!brand || brand._id !== brandId) {
        dispatch(detailBrandAction(brandId))
      } else {
        setName(brand.name)
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, brandId, brand, userInfo, history])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBrandAction({ _id: brandId, name }))
  }

  return (
    <div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <h2 className="page-header">Cập nhật thương hiệu</h2>
      <div className="row">
        <div className="col-10">
          <div className="card full-height">
            {loadingUpdate && <div>Đang cập nhật...</div>}
            {errorUpdate && <div>{errorUpdate}</div>}

            {loading ? <div>Đang tải dữ liệu...</div> : error ? <div>{error}</div>

              : <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Tên thương hiệu</label>
                    <input
                      type="text"
                      placeholder="Dalat Farm"
                      className="userUpdateInput"
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <button className="userUpdateButton" type="submit">Cập nhật</button>
                  <Link to="/admin/brands" onClick={() => dispatch({ type: BRAND_UPDATE_RESET })} className="userUpdateButton" >Trở về</Link>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditBrand;

