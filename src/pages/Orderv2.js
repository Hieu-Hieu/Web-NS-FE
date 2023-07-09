import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Helmet from "../components/Helmet";
import numberWithCommas from "../utils/numberWithCommas";
import { createOrder } from "../redux/actions/orderAction";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Menu, Radio, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { SettingOutlined } from "@ant-design/icons";
import { useValues } from "../hooks";
import orderApi from "../api/orderApi";
import moment from "moment";

const Order2 = (props) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.createOrder);
  const { order, loading, error } = orderCreate;

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState(() => userInfo?.email);
  const [housseNumber, setHouseNumber] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [to_ward_code, set_To_ward_code] = useState("");
  const [to_district_id, set_To_district_id] = useState("");

  const [values, setValues] = useValues({
    shippingFee: 30000,
    listShippingService: [
      {
        service_id: 53320,
        short_name: "Chuyển phát thương mại điện tử",
        service_type_id: 2,
      },
    ],
    selectedShippingService: {
      service_id: 53320,
      short_name: "Chuyển phát thương mại điện tử",
      service_type_id: 2,
    },
    leadTime: null,
  });

  let total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + 30000;

  const navigate = useNavigate();

  const convertUnixTime = (utcTime) => {
    if (utcTime) {
      const date = moment.unix(utcTime).utc();
      const formattedDate = date.format("DD/MM/YYYY");
      return formattedDate;
    }
    return null;
  };

  useEffect(() => {
    if (district) {
      orderApi
        .getShippingServices({
          to_district: to_district_id,
          from_district: 1456,
        })
        .then((res) => {
          setValues({ listShippingService: res.data });
        });
    }
  }, [district]);

  useEffect(() => {
    if (ward) {
      orderApi
        .getShippingFee({
          to_district: +to_district_id,
          to_ward_code: +to_ward_code,
        })
        .then((res) => {
          setValues({ shippingFee: res.data?.total });
        });

      orderApi
        .getShippingLeadtime({
          to_district_id: +to_district_id,
          to_ward_code: +to_ward_code,
          service_id: values.selectedShippingService.service_id,
        })
        .then((res) => {
          setValues({ leadTime: convertUnixTime(res?.data?.leadtime) });
        });
    }
  }, [ward, values.selectedShippingService?.service_id]);

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      setFname(userInfo.firstName);
      setLname(userInfo.lastName);
      setPhone(userInfo.phone);
      setMail(userInfo.email);
      if (order && Object.keys(order).length !== 0) {
        navigate("/order-detail/" + order._id);
      } else if (error) {
        alert(
          "Đăt hàng không thành công, xin hãy đặt lại. Rất xin lỗi quý khách vì sự bất tiện này!"
        );
      }
    } else {
      navigate("/login?redirect=order");
    }
  }, [props.history, userInfo, order, cartItems, error]);

  const getProvince = async () => {
    const {
      data: { data },
    } = await axios.get(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          token: "27430fe2-5cc5-11ec-bde8-6690e1946f41",
        },
      }
    );

    setProvinces(
      data.reduce((list, item) => {
        list.push({
          ProvinceID: item.ProvinceID,
          ProvinceName: item.ProvinceName,
        });
        return list.sort(
          (first, second) => first.ProvinceID - second.ProvinceID
        );
      }, [])
    );
  };
  const getDistrict = async (ProvinceID) => {
    const {
      data: { data },
    } = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${ProvinceID}`,
      {
        headers: {
          token: "27430fe2-5cc5-11ec-bde8-6690e1946f41",
        },
      }
    );
    setDistricts(data);
  };
  const getWard = async (districtID) => {
    const {
      data: { data },
    } = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtID}`,
      {
        headers: {
          token: "27430fe2-5cc5-11ec-bde8-6690e1946f41",
        },
      }
    );
    setWards(data);
  };
  const onChangeProvince = (value, data) => {
    const name = value;
    set_To_ward_code(data?.key);
    setProvince(name);
    const province = provinces.find((item) => item.ProvinceName === name);
    getDistrict(province.ProvinceID);
    console.log("change district");
  };

  const onChangeDistrict = (value) => {
    const name = value;
    setDistrict(name);
    const district = districts.find((item) => item.DistrictName === name);
    set_To_district_id(district.DistrictID);
    console.log(district);

    getWard(district.DistrictID);
  };

  const onChangeWard = (value, data) => {
    setWard(value);
    set_To_ward_code(data?.key);
  };

  const handleSubmitOrder = async (e) => {
    // e.preventDefault();
    const address = {
      province: province,
      district: district,
      ward: ward,
      detail: housseNumber,
      to_district_id: to_district_id,
      to_ward_code: to_ward_code,
    };

    if (userInfo && cartItems.length > 0) {
      if (window.confirm("Xác nhận đặt hàng")) {
        console.log({
          user: userInfo._id,
          totalPrice: total,
          address,
          paymentMethod: paymentMethod,
          paymentResult: false,
          mail,
          firstName: fname,
          lastName: lname,
          message: note,
          phone,
          orderItems: cartItems,
        });
        return;
        dispatch(
          createOrder({
            user: userInfo._id,
            totalPrice: total,
            address,
            paymentMethod: paymentMethod,
            paymentResult: false,
            mail,
            firstName: fname,
            lastName: lname,
            message: note,
            phone,
            orderItems: cartItems,
          })
        );
      }
    }
  };
  useEffect(() => {
    getProvince();
  }, []);
  return (
    <Helmet title="Đặt hàng">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <Form className="order" onFinish={handleSubmitOrder} layout="vertical">
        <div className="order__info-shipping">
          <h4 className="order__info-title">Thông tin đặt hàng</h4>
          <div className="order__info-form">
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Họ</label>
                <input
                  className="order__info-input"
                  required
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                /> */}
                <Form.Item
                  label="Họ"
                  name="lastName"
                  rules={[{ required: true, message: "NHập họ của bạn" }]}
                >
                  <Input onChange={(e) => setLname(e.target.value)} />
                </Form.Item>
              </div>

              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Tên</label>
                <input
                  className="order__info-input"
                  required
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                /> */}
                <Form.Item
                  label="Tên"
                  name="firstName"
                  rules={[{ required: true, message: "NHập tên của bạn" }]}
                >
                  <Input onChange={(e) => setFname(e.target.value)} />
                </Form.Item>
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Số điện thoại</label>
                <input
                  className="order__info-input"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                /> */}
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: "Số điện thoại của bạn" }]}
                >
                  <Input onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>
              </div>

              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Email</label>
                <input
                  className="order__info-input"
                  required /
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                /> */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Nhập email của bạn" }]}
                >
                  <Input
                    onChange={(e) => setMail(e.target.value)}
                    defaultValue={userInfo?.email}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">
                  Tỉnh, thành phố
                </label> */}
                {/* <select onChange={onChangeProvince} required>
                  <option value="">Chọn Tỉnh, Thành phố</option>
                  {provinces &&
                    provinces.map((item) => (
                      <option value={item.ProvinceName} key={item.ProvinceID}>
                        {item.ProvinceName}
                      </option>
                    ))}
                </select> */}
                <Form.Item
                  name="province"
                  label="Tỉnh, Thành phố"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Chọn Tỉnh, Thành phố"
                    onChange={(value, data) => {
                      onChangeProvince(value, data);
                    }}
                  >
                    {provinces.map((item) => (
                      <Select.Option
                        value={item.ProvinceName}
                        key={item.ProvinceID}
                      >
                        {item.ProvinceName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Quận, huyện</label> */}
                {/* <select onChange={onChangeDistrict} required>
                  <option value="">Quận, huyện</option>
                  {districts.map((item) => (
                    <option value={item.DistrictName} key={item.DistrictID}>
                      {item.DistrictName}
                    </option>
                  ))}
                </select> */}
                <Form.Item
                  name="district"
                  label="Quận, huyện"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Quận, huyện"
                    onChange={(value, data) => onChangeDistrict(value, data)}
                  >
                    {districts.map((item) => (
                      <Select.Option
                        value={item.DistrictName}
                        key={item.DistrictID}
                      >
                        {item.DistrictName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="order__info-item-half">
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">Xã phường</label>
                <select
                  // onChange={(e) => {
                  //   setWard(e.target.value);
                  //   set_To_ward_code();
                  // }}
                  required
                >
                  <option value="">Xã,phường</option>
                  {wards.map((item) => (
                    <option value={item.WardName} key={item.WardCode}>
                      {item.WardName}
                    </option>
                  ))}
                </select> */}
                <Form.Item
                  name="ward"
                  label="Xã,phường"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Xã,phường"
                    onChange={(value, data) => {
                      onChangeWard(value, data);
                    }}
                  >
                    {wards.map((item) => (
                      <Select.Option value={item.WardName} key={item.WardCode}>
                        {item.WardName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="order__info-form-item half">
                {/* <label className="order__info-input-label">
                  Số nhà, thôn/xóm
                </label>
                <input
                  className="order__info-input"
                  required
                  onChange={(e) => setHouseNumber(e.target.value)}
                ></input> */}
                <Form.Item
                  name="houseNumber"
                  label="Số nhà, thôn/xóm"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="order__info-item">
              <div className="order__info-form-item">
                {/* <label className="order__info-input-label">Ghi chú</label>
                <textarea
                  className="order__info-input"
                  onChange={(e) => setNote(e.target.value)}
                /> */}
                <Form.Item name="note" label="Ghi chú">
                  <Input.TextArea onChange={(e) => setNote(e.target.value)} />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------- */}
        <div className="order__list">
          <div className="order__list-title">Đơn hàng của bạn</div>
          <div className="order__list-sub-title">Sản phẩm</div>
          <ul className="order__list-product">
            {cartItems.map((item, index) => (
              <li key={index} className="order__list-product-item">
                <span className="order__list-product-item-left">
                  <div className="order__list-product-name">{item.name}</div>
                  <div className="order__list-product-quantity">
                    x{item.quantity}
                  </div>
                </span>
                <div className="order__list-product-price">
                  {numberWithCommas(item.price * item.quantity)}đ
                </div>
              </li>
            ))}
          </ul>
          <br />
          <div className="order__shipping-2">
            <div className="order__shipping-title">Hình thức vận chuyển</div>
            <Menu mode="vertical" selectable={false}>
              <Menu.Item key="mail">
                <strong>Đơn vị vận chuyển:</strong> Giao hàng nhanh
              </Menu.Item>
              <Menu.Item key="app">
                <strong>Loại: </strong>
                <Select
                  placeholder="Chọn loại vận chuyển"
                  defaultValue={values.selectedShippingService.service_id}
                  onChange={(data, data2) => {
                    setValues({ selectedShippingService: data2?.data });
                  }}
                >
                  {values.listShippingService?.map((item) => {
                    return (
                      <Select.Option
                        key={item?.service_id}
                        value={item?.service_id}
                        data={item}
                      >
                        {item?.short_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Menu.Item>
              {values.leadTime && (
                <Menu.Item key="type">
                  <span style={{ color: "#ee4d2d" }}>
                    Nhận hàng vào: {values.leadTime}
                  </span>
                </Menu.Item>
              )}
              <Menu.Item
                key="setting"
                style={{ marginRight: 0, paddingRight: 0 }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>Phí vận chuyển:</strong>
                  <span> {numberWithCommas(values.shippingFee || 30000)}đ</span>
                </div>
              </Menu.Item>
            </Menu>
            {/* <Radio checked>
              <></>Giao hàng nhanh
            </Radio>
            <span>Nhận hàng vào: 20/10/2022</span> */}
          </div>
          {/* <div className="order__shipping">
            <div className="order__shipping-title">Phí vận chuyển</div>
            <div className="order__shipping-fee">
              {numberWithCommas(shippingFee)}đ
            </div>
          </div> */}
          <div className="order__price">
            <div className="order__price-title">Tổng tiền</div>
            <div className="order__price-total">{numberWithCommas(total)}đ</div>
          </div>
          <div className="order__payment">
            <div className="order__payment-item">
              <input
                defaultChecked={paymentMethod === "COD"}
                type="radio"
                id="COD"
                name="pay"
                value="COD"
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="COD">Thanh toán khi nhận hàng</label>
            </div>
            <div className="order__payment-item">
              <input
                type="radio"
                id="paypal"
                name="pay"
                value="paypal"
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="online">Thánh toán qua PayPal</label>
            </div>
            <div className="order__payment-item">
              <input
                type="radio"
                id="vnpay"
                name="pay"
                value="vnpay"
                onClick={(e) => setPaymentMethod(e.target.value)}
              />
              <label for="online">Thanh toán bằng Vnpay</label>
            </div>
            <div className="order__button">
              <Form.Item>
                <button type="submit" className="order__button-checkout">
                  Đặt hàng
                </button>
              </Form.Item>
              <Form.Item>
                <button
                  className="order__button-return"
                  onClick={() => navigate("/catalog")}
                >
                  Tiếp tục mua hàng
                </button>
              </Form.Item>
            </div>
            <div className="order__button">
              {loading && <div>Đang xử lý...</div>}
              {error && <div>Error</div>}
            </div>
          </div>
        </div>
      </Form>
    </Helmet>
  );
};

export default Order2;
