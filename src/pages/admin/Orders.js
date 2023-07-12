import React, { useEffect, useState } from "react";
import { orderListAction } from "../../redux/actions/orderAction";
import Table from "../../components/admin/Table";
import numberWithCommas from "../../utils/numberWithCommas";

import { useDispatch, useSelector } from "react-redux";
import { updateStatusOrderAction } from "../../redux/actions/orderAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchAdmin from "../../components/admin/SearchAdmin";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useValues } from "../../hooks";

const Orders = ({}) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error, page, pages } = orderList;
  const myInfo = useSelector((state) => state.userSignin);
  const { userInfo } = myInfo;
  const navigate = useNavigate();

  const [values, setValues] = useValues({
    curFilterState: "DANG_XU_LY",
  });

  const [pageNumber, setPageNUmber] = useState(1);

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(orderListAction({ keyword: "DANG_XU_LY" }));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  const customerTableHead = [
    "Mã đơn",
    "Người đặt",
    "Tổng tiền ",
    "Địa chỉ giao ",
    "Thanh toán",
    "Trạng thái",
    "Chi tiết",
  ];

  const fullAddress = (item) => {
    // console.log(item)
    return (
      item.detail +
      ", " +
      item.ward +
      ", " +
      item.district +
      ", " +
      item.province
    );
  };

  const handleChangeOrderState = (id, status) => {
    dispatch(updateStatusOrderAction({ status, id, pageNumber }));
    dispatch(orderListAction({ keyword: values.curFilterState }));
  };

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item._id}</td>
      <td style={{ minWidth: "180px" }}>
        {item.lastName + " " + item.firstName}
      </td>
      <td>{numberWithCommas(item.totalPrice)}</td>
      {/* {console.log(item)} */}
      <td>{(item.address && fullAddress(item.address)) || item.shipAddress}</td>
      <td>{item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}</td>

      <td>
        <select
          onChange={(e) => handleChangeOrderState(item._id, e.target.value)}
        >
          <option selected={item.status === "DANG_XU_LY"} value="DANG_XU_LY">
            Đang xử lý
          </option>
          <option selected={item.status === "CHO_GIAO"} value="CHO_GIAO">
            Chờ giao hàng
          </option>
          <option selected={item.status === "DANG_GIAO"} value="DANG_GIAO">
            Đang giao hàng
          </option>
          <option selected={item.status === "DA_GIAO"} value="DA_GIAO">
            Đã giao hàng
          </option>
          <option selected={item.status === "DA_HUY"} value="DA_HUY">
            Đã hủy
          </option>
        </select>
      </td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => window.open("/admin/order/" + item._id, "_blank")}
      >
        <i className="bx bx-detail"></i>
      </td>
    </tr>
  );

  const handleSearchData = (text) => {
    if (text !== "") {
      dispatch(orderListAction({ pageNumber: 1 || pageNumber, keyword: text }));
    }
  };

  const handlePageChange = ({ newPage }) => {
    if (newPage) {
      setPageNUmber(newPage || page);
      dispatch(orderListAction({ pageNumber: newPage || page }));
    }
  };

  const handleSelect = (keyword) => {
    dispatch(orderListAction({ keyword: keyword }));
    setValues({
      curFilterState: keyword,
    });
  };

  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
      />
      <div className="row">
        <div className="col-8">
          <h2 className="page-header">Đơn hàng</h2>
        </div>
        <div className="col-4">
          <h2 className="page-header">
            <SearchAdmin handleSearchData={handleSearchData} />
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 10,
            }}
          >
            <Select
              onChange={(value) => handleSelect(value)}
              style={{ margin: "0 -10px 30px -20px" }}
              defaultValue={"DANG_XU_LY"}
            >
              <Select.Option value="DANG_XU_LY">Đơn hàng mới</Select.Option>
              <Select.Option value="CHO_GIAO">Đơn hàng chờ giao</Select.Option>
              <Select.Option value="DANG_GIAO">
                Đơn hàng đang giao
              </Select.Option>
              <Select.Option value="DA_GIAO">Đơn hàng đã giao</Select.Option>
              <Select.Option value="DA_HUY">Đơn hàng đã hủy</Select.Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            {loading && <div></div>}
            {error && <div>{error}</div>}
            {orders ? (
              <div className="card__body">
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={orders && orders}
                  renderBody={(item, index) => renderBody(item, index)}
                  page={page}
                  pages={pages}
                  handlePageChange={handlePageChange}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
