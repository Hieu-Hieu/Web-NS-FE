import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoryAction } from '../../redux/actions/categoryActions';
import { listBrandAction } from '../../redux/actions/brandActions';
import { updateProductAction, detailsProduct } from '../../redux/actions/productActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditProduct = ({ history, match }) => {

  const productId = match.params.id;

  const myInfo = useSelector(state => state.userSignin);
  const { userInfo } = myInfo;
  const listCategory = useSelector(state => state.categoriesList);
  const { categories } = listCategory;
  const brandsList = useSelector(state => state.brandsList);
  const { loading: loadingBrands, error: errorBrands, brands } = brandsList;
  const productDetail = useSelector(state => state.productDetail);
  const { loading, error, product } = productDetail;

  const [name, setName] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [brand, setbrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [certification, setCertification] = useState('');
  const [status, setStatus] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      if (brands && brands.length === 0) {
        dispatch(listBrandAction());
      }
      if (categories && categories.length === 0) {
        dispatch(categoryAction());
      }
      if (!product || product._id !== productId) {
        dispatch(detailsProduct(productId))
      }
      else if (Object.keys(product).length !== 0) {
        setName(product.name)
        setCategory(product.category && product.category._id)
        setbrand(product.brand && product.brand._id)
        setDescription(product.description)
        setCertification(product.certification)
        setDiscount(product.discount)
        setPrice(product.price)
        setQtyInStock(product.qtyInStock)
        setImage1(product.images[0])
        setImage2(product.images[1])
        setStatus(product.status)
      }
    } else {
      history.push('/login')
    }

  }, [history, userInfo, dispatch, brands, categories, product, productId])

  const handleUploadImage = (e) => {
    const cloundName = 'dl02ow13v';
    const uploadPreset = 'oj8a39rm';
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", uploadPreset);

    axios.post(`https://api.cloudinary.com/v1_1/${cloundName}/upload`, formData)
      .then(res => {
        if (image1 === '') {
          setImage1(res.data.url)
        } else {
          setImage2(res.data.url)
        }

      }).catch(error =>
        console.log(error)
      )
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(updateProductAction({
      _id: productId,
      name,
      brand,
      category,
      description,
      price,
      qtyInStock,
      discount,
      certification,
      creator: userInfo._id,
      images: [image1, image2],
      status,
    }))

  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2400}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <h2 className="page-header">Chỉnh sửa sản phẩm</h2>
      <div className="row">
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        <div className="col-10">
          <div className="card full-height">
            <form action="" className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Tên sản phẩm:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: Cà phê rang xay..."
                    className="userUpdateInput"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Giá:(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 200000"
                    className="userUpdateInput"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Giảm giá(%):(*)</label>
                  <input
                    type="text"
                    placeholder="VD: 30%"
                    className="userUpdateInput"
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                    value={discount}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Số lượng:(*)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="20"
                    className="userUpdateInput"
                    onChange={(e) => setQtyInStock(e.target.value)}
                    required
                    value={qtyInStock}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Danh mục:</label>

                  <select onChange={e => setCategory(e.target.value)} required>
                    {
                      categories &&
                      categories.map((item, index) =>
                        <option key={index} value={item._id}
                          selected={product && product.category === item._id}
                        >{item.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Thương hiệu:</label>

                  <select onChange={e => setbrand(e.target.value)} value={brand}>
                    {loadingBrands ? '' : errorBrands ? '' :
                      brands &&
                      brands.map((item, index) =>
                        <option key={index} value={item._id}
                          selected={brand === item._id}
                        >{item.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className="userUpdateItem">
                  <label>Chứng nhận:</label>
                  <input
                    type="text"
                    placeholder="VD: VietGAP"
                    className="userUpdateInput"
                    onChange={(e) => setCertification(e.target.value)}
                    value={certification}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Trạng thái:</label>
                  <select>
                    <option value={false}>Ẩn đi</option>
                    <option value={true} selected={status}>Hiển thị</option>
                  </select>
                </div>

                <div className="userUpdateItem">
                  <label>Mô tả</label>
                  {/* <textarea
                    id="description"
                    rows="3"
                    type="text"
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    value={description}
                  ></textarea> */}
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      setDescription(editor.getData())
                    }}
                    data={description}
                  />
                </div>
                <div className="userUpdateUpload">
                  <label>Hình ảnh:</label>
                  <input placeholder="Nhập url hình ảnh"
                    onChange={(e) => setImage1(e.target.value)}
                    value={image1}
                    required
                    className='userUpdateInput'
                  ></input>
                  <span>Hoặc tải lên</span>
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input onChange={handleUploadImage} type="file" id="file" multiple="multiple" style={{ display: "none" }} />
                </div>
                <div className="userUpdateUpload">
                  <label>Hình ảnh:</label>
                  <input placeholder="Nhập url hình ảnh"
                    onChange={(e) => setImage2(e.target.value)}
                    value={image2}
                    className='userUpdateInput'
                  ></input>
                  <span>Hoặc tải lên</span>
                  <label htmlFor="file">
                    <i className="bx bx-upload bx-sm userUpdateIcon"></i>
                  </label>
                  <input onChange={handleUploadImage} type="file" id="file" multiple="multiple" style={{ display: "none" }} />
                </div>
                <span style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <button onClick={() => { history.push('/admin/products') }} className="userUpdateButton"
                    style={{ width: '30%' }}
                  >Trở về</button>
                  <button type="submit" className="userUpdateButton"
                    style={{ width: '30%' }}
                  >Cập nhật</button>
                </span>
              </div>

              {/* <div className="userUpdateRight">
                
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}

export default EditProduct
