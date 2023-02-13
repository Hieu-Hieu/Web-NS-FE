import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateUserProfile } from '../../redux/actions/userAction'
import Table from '../../components/admin/Table'
import { listUserAction } from '../../redux/actions/userAction'
import SearchAdmin from '../../components/admin/SearchAdmin';

const Customers = ({ history }) => {

    const userList = useSelector(state => state.userList)
    const { loading, error, users, page, pages } = userList;

    const dispatch = useDispatch();

    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    const [pageNumber, setPageNUmber] = useState(1);


    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(listUserAction({ pageNumber }))
        } else {
            history.push('/login')

        }
    }, [dispatch, history, userInfo, pageNumber])

    const customerTableHead = [
        'STT',
        'Avatar',
        'Tên',
        'Email',
        'Địa chỉ',
        'Trạng thái',
        'chỉnh sửa',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const handleChangeStatus = (status, id) => {
        dispatch(updateUserProfile({
            status: status,
            _id: id,
        }))
    }

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            {/* <td>{item.role}</td> */}
            <td><img src={item.avatar} alt='Hình ảnh' style={{ width: '30px' }} /></td>
            <td>{item.lastName + ' ' + item.firstName}</td>
            <td>{item.email}</td>
            {/* <td>{item.phone}</td> */}
            <td>{item.address}</td>
            <td>{item.status ? 'Hoạt động' : 'Đang khóa'}</td>
            <td>
                <select onChange={(e) => handleChangeStatus(e.target.value, item._id)}>
                    <option selected={item.status} value="false">Block</option>
                    <option selected={item.status} value="true">Active</option>
                </select>
            </td>
        </tr>
    )

    const handleSearchData = (text) => {
        if (text !== '') {
            dispatch(listUserAction({ pageNumber: 1 || pageNumber, keyword: text }));
        }
    }

    const handlePageChange = ({ newPage }) => {
        if (newPage) {
            setPageNUmber(newPage || page)
            dispatch(listUserAction({ pageNumber: newPage || page }))

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
                        Quản lý người dùng
                    </h2>
                </div>
                <div className="col-2">
                    <h2 className="page-header">
                        <SearchAdmin handleSearchData={handleSearchData} />

                    </h2>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    {loading && <div></div>}
                    {error && <div>{error}</div>}
                    {
                        users ?
                            <div className="card">
                                <div className="card__body">
                                    <Table
                                        limit='10'
                                        headData={customerTableHead}
                                        renderHead={(item, index) => renderHead(item, index)}
                                        bodyData={users}
                                        renderBody={(item, index) => renderBody(item, index)}
                                        page={page}
                                        pages={pages}
                                        handlePageChange={handlePageChange}
                                    /> :

                                </div>
                            </div> : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Customers
