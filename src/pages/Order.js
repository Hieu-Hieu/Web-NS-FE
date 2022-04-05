import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Helmet from '../components/Helmet'

import numberWithCommas from '../utils/numberWithCommas'
import { } from '../styles/order.css'
import axios from 'axios'
import { createOrder } from '../redux/actions/orderAction'

const Order = (props) => {

  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart

  const orderCreate = useSelector(state => state.createOrder);
  const { order, loading, error } = orderCreate;

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [mail, setMail] = useState('')
  const [housseNumber, setHouseNumber] = useState('')
  const [note, setNote] = useState('')
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);

  let total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + 30000;

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      setFname(userInfo.firstName)
      setLname(userInfo.lastName)
      setPhone(userInfo.phone)
      setMail(userInfo.email)
      if (order && Object.keys(order).length !== 0) {
        props.history.push('/order-detail/' + order._id);
      } else if (error) {
        alert('Đăt hàng không thành công, xin hãy đặt lại. Rất xin lỗi quý khách vì sự bất tiện này!')
      }

    } else {
      props.history.push('/login?redirect=order');
    }
  }, [props.history, userInfo, order, cartItems, error])

  const getProvince = async () => {
    const { data: { data } } = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
      headers: {
        token: '27430fe2-5cc5-11ec-bde8-6690e1946f41',
      }
    })

    setProvinces(data.reduce((list, item) => {
      list.push({
        ProvinceID: item.ProvinceID,
        ProvinceName: item.ProvinceName
      });
      return list.sort((first, second) => first.ProvinceID - second.ProvinceID);
    }, []));
  }
  const getDistrict = async (ProvinceID) => {
    const { data: { data } } = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${ProvinceID}`, {
      headers: {
        token: '27430fe2-5cc5-11ec-bde8-6690e1946f41',
      }
    })
    setDistricts(data);

  }
  const getWard = async (districtID) => {
    const { data: { data } } = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtID}`, {
      headers: {
        token: '27430fe2-5cc5-11ec-bde8-6690e1946f41',
      }
    })
    setWards(data);
  }
  const onChangeProvince = (e) => {
    const name = e.target.value;
    setProvince(name)
    const province = provinces.find(item => item.ProvinceName === name);
    getDistrict(province.ProvinceID);
    console.log('change district')
  }

  const onChangeDistrict = (e) => {
    const name = e.target.value;
    setDistrict(name)
    const district = districts.find(item => item.DistrictName === name);
    getWard(district.DistrictID);
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const address = {
      province: province,
      district: district,
      ward: ward,
      detail: housseNumber,
    }

    if (userInfo && cartItems.length > 0) {
      if (window.confirm('Xác nhận đặt hàng')) {
        dispatch(
          createOrder({
            user: userInfo._id, totalPrice: total, address, paymentMethod: paymentMethod,
            paymentResult: false, mail, firstName: fname, lastName: lname,
            message: note, phone, orderItems: cartItems,
          })
        );
        // console.log(order)
      }
    }
  }
  useEffect(() => {
    getProvince()
  }, [])
  return (

    <Helmet title="Đặt hàng">

      <form className="order" onSubmit={handleSubmitOrder}>
        <div className="order__info-shipping">
          <h4 className="order__info-title">Thông tin đặt hàng</h4>
          <div className="order__info-form">

            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Họ</label>
                <input className="order__info-input"
                  required
                  value={lname}
                  onChange={e => setLname(e.target.value)}
                />
              </div>

              <div className="order__info-form-item half">
                <label className="order__info-input-label">Tên</label>
                <input className="order__info-input"
                  required
                  value={fname}
                  onChange={e => setFname(e.target.value)}

                />
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Số điện thoại</label>
                <input className="order__info-input"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}

                />
              </div>

              <div className="order__info-form-item half">
                <label className="order__info-input-label">Email</label>
                <input className="order__info-input"
                  required
                  value={mail}
                  onChange={e => setMail(e.target.value)}
                />
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Tỉnh, thành phố</label>
                <select onChange={onChangeProvince} required>
                  {/* {console.log(provinces)} */}
                  <option value="">Chọn Tỉnh, Thành phố</option>
                  {provinces && provinces.map((item) => (
                    <option value={item.ProvinceName} key={item.ProvinceID}>{item.ProvinceName}</option>
                  ))}
                </select>
              </div>
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Quận, huyện</label>
                <select onChange={onChangeDistrict} required>
                  {/* {console.log(provinces)} */}
                  <option value="">Quận, huyện</option>
                  {districts.map((item) => (
                    <option value={item.DistrictName} key={item.DistrictID}>{item.DistrictName}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Xã phường</label>
                <select onChange={(e) => setWard(e.target.value)} required>
                  {/* {console.log(provinces)} */}
                  <option value="">Xã,phường</option>
                  {wards.map((item) => (
                    <option value={item.WardName} key={item.WardCode}>{item.WardName}</option>
                  ))}
                </select>
              </div>
              <div className="order__info-form-item half">
                <label className="order__info-input-label">Số nhà, thôn/xóm</label>
                <input className='order__info-input' required onChange={(e) => setHouseNumber(e.target.value)}></input>
              </div>
            </div>
            <div className="order__info-item">
              <div className="order__info-form-item">
                <label className="order__info-input-label">Ghi chú</label>
                <textarea className="order__info-input"
                  onChange={e => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="order__list">
          <div className="order__list-title">Đơn hàng của bạn</div>
          <div className="order__list-sub-title">Sản phẩm</div>
          <ul className="order__list-product">
            {
              cartItems.map((item, index) => (
                <li key={index} className="order__list-product-item">

                  <span className="order__list-product-item-left">
                    <div className="order__list-product-name">{item.name}</div>
                    <div className="order__list-product-quantity">x{item.quantity}</div>
                  </span>
                  <div className="order__list-product-price">{numberWithCommas(item.price * item.quantity)}đ</div>

                </li>
              ))
            }

          </ul>
          <div className="order__shipping">
            <div className="order__shipping-title">Phí vận chuyển</div>
            <div className="order__shipping-fee">{numberWithCommas(30000)}đ</div>
          </div>
          <div className="order__price">
            <div className="order__price-title">Tổng tiền</div>
            <div className="order__price-total">{numberWithCommas(total)}đ</div>
          </div>
          <div className="order__payment">

            <div className="order__payment-item">
              <input defaultChecked={paymentMethod === 'COD'} type="radio" id="COD" name="pay" value="COD"
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="COD">Thanh toán khi nhận hàng</label>
            </div>
            <div className="order__payment-item">
              <input type="radio" id="online" name="pay" value="Online"
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="online">Thánh toán qua PayPal</label>
            </div>

            <div className="order__button">
              <button type="submit" className="order__button-checkout">Đặt hàng</button>
              <button className="order__button-return" onClick={() => props.history.push('/catalog')}>Tiếp tục mua hàng</button>
            </div>
            <div className="order__button">
              {loading && <div>Đang xử lý...</div>}
              {error && <div>Error</div>}
            </div>
          </div>
        </div>
      </form>

    </Helmet>
  )
}

export default Order
