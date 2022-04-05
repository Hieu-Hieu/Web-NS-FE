import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../components/admin/Table'
import { listBrandAction, deleteBrandAction } from '../../redux/actions/brandActions'

const Brands = ({ history }) => {
  const dispatch = useDispatch();
  const brandsList = useSelector(state => state.brandsList)
  const { loading, error, brands } = brandsList

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listBrandAction())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const tableHead = [
    'STT',
    'ID',
    'Tên',
    'Sửa',
    'Xóa',
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{item._id}</td>
      <td>{item.name}</td>
      <td><Link to={`/admin/brand/${item._id}`} ><i className='bx bxs-edit'></i></Link> </td>
      <td><div style={{ cursor: 'pointer' }} onClick={() => handleDelete(item._id)} ><i className='bx bx-trash'></i></div></td>
    </tr>
  )

  const handleDelete = (id) => {
    if (window.confirm('Bạn có muốn xóa thương hiệu này không?')) {
      dispatch(deleteBrandAction(id));
    }
  }

  return (
    <div>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <div className="row">
        <div className="col-10">
          <h2 className="page-header">
            Danh mục
          </h2>
        </div>
        <div className="col-2">
          <Link to='/admin/newBrand'>
            <div className="slide__item">
              <div className="sidebar__item-inner active flexcenter">
                <span>Thêm mới</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {
                loading ? <div>Loading...</div> : error ? <div>{error}</div>

                  : brands.length === 0 ? <div>Không có thương hiệu nào</div> :
                    <Table
                      limit='10'
                      headData={tableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={brands}
                      renderBody={(item, index) => renderBody(item, index)}
                    />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brands
