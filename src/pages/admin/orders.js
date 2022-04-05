import React, { useEffect, useState } from 'react'
import { orderListAction } from '../../redux/actions/orderAction'
import Table from '../../components/admin/Table'
import numberWithCommas from '../../utils/numberWithCommas'

import { useDispatch, useSelector } from 'react-redux'
import { updateStatusOrderAction } from '../../redux/actions/orderAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchAdmin from '../../components/admin/SearchAdmin'


const Orders = ({ history }) => {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.orderList)
    const { loading, orders, error, page, pages } = orderList;
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    const [pageNumber, setPageNUmber] = useState(1);

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(orderListAction({ keyword: 'DANG_XU_LY' }))
        } else {
            history.push('/login')
        }

    }, [dispatch, userInfo, history])

    const customerTableHead = [
        'Mã đơn',
        'Người đặt',
        'Tổng tiền ',
        'Địa chỉ giao ',
        'Thanh toán',
        'Trạng thái',
        'Chi tiết',
    ]

    const fullAddress = (item) => {
        // console.log(item)
        return item.detail + ', ' + item.ward + ', ' + item.district + ', ' + item.province
    }

    const handleChangeOrderState = (id, status) => {
        dispatch(updateStatusOrderAction({ status, id, pageNumber }))
    }

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{item._id}</td>
            <td style={{ minWidth: '180px' }}>{item.lastName + ' ' + item.firstName}</td>
            <td>{numberWithCommas(item.totalPrice)}</td>
            {/* {console.log(item)} */}
            <td>{(item.address && fullAddress(item.address)) || (item.shipAddress)}</td>
            <td>{item.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>

            <td>
                <select onChange={(e) => handleChangeOrderState(item._id, e.target.value)}>
                    <option selected={item.status === "DANG_XU_LY"} value="DANG_XU_LY">Đang xử lý</option>
                    <option selected={item.status === "CHO_GIAO"} value="CHO_GIAO">Chờ giao hàng</option>
                    <option selected={item.status === "DANG_GIAO"} value="DANG_GIAO">Đang giao hàng</option>
                    <option selected={item.status === "DA_GIAO"} value="DA_GIAO">Đã giao hàng</option>
                    <option selected={item.status === "DA_HUY"} value="DA_HUY">Đã hủy</option>
                </select>
            </td>
            <td onClick={() => history.push('/admin/order/' + item._id)}><i className='bx bx-detail'></i></td>
        </tr>
    )

    const handleSearchData = (text) => {
        if (text !== '') {
            dispatch(orderListAction({ pageNumber: 1 || pageNumber, keyword: text }));
        }
    }

    const handlePageChange = ({ newPage }) => {
        if (newPage) {
            setPageNUmber(newPage || page)
            dispatch(orderListAction({ pageNumber: newPage || page }))

        }
    }

    const handleSelect = (keyword) => {
        dispatch(orderListAction({ keyword: keyword }))
    }

    return (
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
            />
            <div className="row">
                <div className="col-10">
                    <h2 className="page-header">
                        Đơn hàng
                    </h2>
                </div>
                <div className="col-2">
                    <h2 className="page-header">
                        <SearchAdmin handleSearchData={handleSearchData} />
                    </h2>
                    <select onChange={(e) => handleSelect(e.target.value)}
                        style={{ margin: '0 -10px 30px -20px' }}
                    >
                        <option value='DANG_XU_LY'>Đơn hàng mới</option>
                        <option value='CHO_GIAO'>Đơn hàng chờ giao</option>
                        <option value='DANG_GIAO'>Đơn hàng đang giao</option>
                        <option value='DA_GIAO'>Đơn hàng đã giao</option>
                        <option value='DA_HUY'>Đơn hàng đã hủy</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-12">

                    <div className="card">
                        {loading && <div></div>}
                        {error && <div>{error}</div>}
                        {orders ?
                            <div className="card__body">
                                <Table
                                    limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={orders && orders}
                                    renderBody={(item, index) => renderBody(item, index)}
                                    page={page}
                                    pages={pages}
                                    handlePageChange={handlePageChange}
                                />

                            </div> : ''
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Orders
