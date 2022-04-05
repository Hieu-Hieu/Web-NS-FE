import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Table from '../../components/admin/Table'
import { listSlidesAdmin, deleteSlideAction } from '../../redux/actions/slideAction'
import Loading from '../../components/Loading'
import Search from '../../components/Search'

const Slides = ({ history }) => {
  const dispatch = useDispatch();
  const slideList = useSelector(state => state.slideList);
  const { loading, error, slides } = slideList;
  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listSlidesAdmin())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const tableHead = [
    'STT',
    'Hình ảnh',
    'Tên',
    'Trạng thái',
    'Sửa',
    'Xóa',
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa')) {
      dispatch(deleteSlideAction(id));
    }
  }

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td><img src={item.image} alt="ảnh"
        style={{ maxWidth: '40px' }}
      /></td>
      <td>{item.name}</td>
      <td>{item.status ? 'Active' : 'Dissable'}</td>
      <td><Link to={`/admin/slides/${item._id}`} ><i className='bx bxs-edit'></i></Link> </td>
      <td>
        <div style={{ cursor: 'pointer' }} onClick={() => handleDelete(item._id)} >
          <i className='bx bx-trash'></i>
        </div>
      </td>
    </tr>
  )
  return (
    <div>
      <div className="row">
        <div className="col-8">
          <h2 className="page-header">
            Slides
          </h2>
        </div>
        <div className="col-2">
          <h2 className="page-header">
            <Search />
          </h2>
        </div>
        <div className="col-2">
          <Link to='/admin/newSlide'>
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
                loading ? <Loading /> : error ? <div>{error}</div>
                  : slides.length === 0 ? <div>Không có slide nào</div> :
                    <Table
                      limit='10'
                      headData={tableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={slides}
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

export default Slides;
