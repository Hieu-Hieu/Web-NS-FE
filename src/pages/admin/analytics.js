import React, { useEffect } from 'react'

// import Chart from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../components/admin/Table'
import { sumarryOrders } from '../../redux/actions/statisticActions'
import numberWithCommas from '../../utils/numberWithCommas'

// const chartOptions = {
//     series: [{
//         name: 'Online Customers',
//         data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
//     }, {
//         name: 'Store Customers',
//         data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
//     }],
//     options: {
//         color: ['#6ab04c', '#2980b9'],
//         chart: {
//             background: 'transparent'
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             curve: 'smooth'
//         },
//         xaxis: {
//             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
//         },
//         legend: {
//             position: 'top'
//         },
//         grid: {
//             show: false
//         }
//     }
// }



const Analytics = ({ history }) => {
    const state = useSelector(state => state.revenueBy);
    const { loading, error, revenue } = state;
    const dispatch = useDispatch();

    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(sumarryOrders("day"))
        } else {
            history.push('/login')
        }
    }, [history, userInfo])

    const tableHead = [
        'STT',
        'Thời gian',
        'Tổng đơn hàng',
        'Tổng doanh thu',
    ]

    const renderHead = (item, index) => <th key={index}>{item}</th>
    const renderBody = (item, index) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.label && (item.label.split('-').reverse().join('-'))}</td>
            <td>{item.orders}</td>
            <td>{numberWithCommas(item.value)}đ</td>

        </tr>
    )

    const handleChangeFilter = (value) => {
        dispatch(sumarryOrders(value))
    }
    return (
        <>
            {/* <div className="row">
                <div className="col-12">
                    <div className="card full-height">
                        <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>

            </div> */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <div>Lọc theo:</div>
                            <select onChange={(e) => handleChangeFilter(e.target.value)}>
                                <option selected value="day">Hôm nay</option>
                                <option value="week">Tuần này</option>
                                <option value="day-of-month">Tháng</option>
                                <option value="month-of-year">Năm</option>
                            </select>
                            {
                                loading ? <div>Loading...</div> : error ? <div>{error}</div>

                                    : revenue && revenue.length === 0 ? <div>Không có dữ liệu</div> :
                                        <Table
                                            // limit='10'
                                            headData={tableHead}
                                            renderHead={(item, index) => renderHead(item, index)}
                                            bodyData={revenue}
                                            renderBody={(item, index) => renderBody(item, index)}
                                        />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics
