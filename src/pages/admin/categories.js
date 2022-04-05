import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '../../components/admin/Table'
import { listCategoriesAdmin, deleteCategoryAction } from '../../redux/actions/categoryActions'

const Categories = ({ history }) => {
    const dispatch = useDispatch();
    const categoriesList = useSelector(state => state.categoriesList)
    const { loading, error, categories } = categoriesList

    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(listCategoriesAdmin())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const tableHead = [
        'STT',
        'Hình ảnh',
        'Thứ tự hiển thị',
        'Tên',
        'Trạng thái',
        'Sửa',
        'Xóa',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa')) {
            dispatch(deleteCategoryAction(id));
        }
    }

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td><img src={item.image} alt="ảnh"
                style={{ maxWidth: '40px' }}
            /></td>
            <td style={{ width: '90px' }}>{item.displayOrder}</td>
            <td>{item.name}</td>
            <td>{item.status ? 'active' : 'disable'}</td>
            <td><Link to={`/admin/categories/${item._id}`} ><i className='bx bxs-edit'></i></Link> </td>
            <td>
                <nav style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(item._id)}
                >
                    <i className='bx bx-trash'></i>
                </nav>
            </td>
        </tr>
    )

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
                    <Link to='/admin/newCategory'>
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
                                    : categories.length === 0 ? <div>Không có danh mục nào</div> :
                                        <Table
                                            limit='10'
                                            headData={tableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={categories}
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

export default Categories
