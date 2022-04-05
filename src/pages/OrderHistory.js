import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Table from '../components/admin/Table'
import { myOrders as myOrdersAction } from '../redux/actions/orderAction'
import numberWithCommas from '../utils/numberWithCommas'

const OrderHistory = ({ history }) => {

  const myOrders = useSelector(state => state.myOrders)
  const { loading, error, orders } = myOrders;
  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(myOrdersAction())
    }
  }, [dispatch, userInfo, history])

  const customerTableHead = [
    'Mã đơn hàng',
    'Ngày mua',
    'Sản phẩm',
    'Tổng tiền',
    'Trạng thái',
    'Chi tiết'
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const trangthai = { 'DANG_XU_LY': 'Đang xử lý', 'CHO_GIAO': 'Chờ giao hàng', 'DANG_GIAO': 'Đang giao hàng', 'DA_GIAO': 'Đã giao hàng', 'DA_HUY': 'Đã hủy' }

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item._id}</td>
      <td>{item.createdAt.substr(0, 10).split('-').reverse().join('/')}</td>
      <td>{item.orderItems[0].product && item.orderItems[0].product.name}</td>
      <td>{item.totalPrice && numberWithCommas(item.totalPrice)}đ</td>
      <td>{trangthai[item.status]}</td>
      <td style={{ cursor: 'pointer', color: 'GrayText' }}
      ><span onClick={() => { history.push('/order-detail/' + item._id) }}>Chi tiết</span> </td>
    </tr>
  )

  return (
    <div>

      <div className="row">
        <div className="col-12">

          <div className="card">
            <h3>Đơn hàng của tôi</h3>
            <div className="card__body"
              style={{ maxHeight: '500px', overflowY: 'scroll' }}
            >
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}

              {!orders && <div>Không có đơn hàng nào</div>}
              {(orders && orders.length >= 0) &&
                (<Table
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={orders && orders}
                  renderBody={(item, index) => renderBody(item, index)}
                />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
