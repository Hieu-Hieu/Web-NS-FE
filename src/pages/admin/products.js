
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import numberWithCommas from '../../utils/numberWithCommas'


import Table from '../../components/admin/Table'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listProductsAdmin, deleteProductAction } from '../../redux/actions/productActions'

const Products = ({ history }) => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productsList
    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    const [pageNumber, setPageNUmber] = useState(1);
    const [keyword, setKeyWord] = useState('');

    useEffect(() => {

        if (userInfo && userInfo.role === 'admin') {
            dispatch(listProductsAdmin({
                pageNumber
            }
            ))
        } else {
            history.push('/login')
        }

    }, [dispatch, pageNumber, history, userInfo])

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa')) {
            dispatch(deleteProductAction(id, pageNumber));
        }
    }

    const handlePageChange = ({ newPage }) => {
        if (newPage) {
            setPageNUmber(newPage || page)
        }
    }

    const handleSearch = () => {
        console.log(keyword)
        if (keyword !== '') {
            dispatch(listProductsAdmin({ keyword: keyword }))
        }
    }

    const customerTableHead = [
        'STT',
        'Ảnh',
        'Tên',
        'Loại',
        'Giá',
        'Trong kho',
        'Đã bán',
        'Thương hiệu',
        'Trạng thái',
        'Sửa',
        'Xóa'
    ]


    const renderHead = (item, index) => <th key={index}>{item}</th>

    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td><img src={item.images[0]} alt="Hình ảnh"
                style={{ maxWidth: '40px' }}
            /></td>
            <td style={{ minWidth: '110px' }}>{item.name}</td>
            <td style={{ minWidth: '110px' }} >{(item.category && item.category.name) || ''}</td>
            <td>{numberWithCommas(item.price)}</td>
            {/* <td>{item.discount + '%'}</td> */}
            <td>{item.qtyInStock}</td>
            <td>{item.sold}</td>
            <td>{item.brand.name}</td>
            {/* <td style={{ minWidth: '140px' }}  >{item.description.substring(0, 32) + '...'}</td> */}
            {/* <td>{item.createdAt || ''}</td> */}
            <td>{item.status ? 'active' : 'disable'}</td>
            <td><Link to={`/admin/product/${item._id}`} ><i className='bx bxs-edit'></i></Link> </td>
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
                <div className="col-6">
                    <h2 className="page-header">
                        Danh sách sản phẩm
                    </h2>
                </div>
                <div className="col-4">
                    <div style={{ display: 'flex' }}>
                        <input type="text" placeholder="Tìm kiếm..." required
                            style={{ height: '32px' }}
                            onChange={(e) => setKeyWord(e.target.value)}
                        />
                        <button
                            style={{ backgroundColor: '#cbd5cd', borderRadius: '5px', padding: '0 10px' }}
                            type="button" onClick={() => handleSearch()}><span>Tìm</span></button>
                    </div>
                </div>
                <div className="col-2">
                    <Link to='/admin/newproduct'>
                        <div className="slide__item">
                            <div className="sidebar__item-inner active flexcenter">
                                <span>Thêm SP</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {loading && <div></div>}
                    {error && <div>{error.message}</div>}
                    <div className="card">
                        <div className="card__body">
                            {
                                products &&
                                <Table
                                    limit='10'
                                    headData={customerTableHead}
                                    renderHead={(item, index) => renderHead(item, index)}
                                    bodyData={products}
                                    renderBody={(item, index) => renderBody(item, index)}
                                    page={page}
                                    pages={pages}
                                    handlePageChange={handlePageChange}
                                />

                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products
