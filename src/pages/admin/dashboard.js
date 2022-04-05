import React, { useEffect } from 'react'
// import Chart from 'react-apexcharts'
import Loading from '../../components/Loading'

import numberWithCommas from '../../utils/numberWithCommas'
import Table from '../../components/admin/Table'
import StatusCard from '../../components/admin/StatusCart'
//import Badge from '../../components/admin/Badge'
import { useDispatch, useSelector } from 'react-redux'
import { statisticAllAction, topCustomersAction } from '../../redux/actions/statisticActions'

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

const topCustomerTableHeader = [
    'user',
    'Tổng đơn hàng',
    'Trị giá'
]


const renderCusomerHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr key={index}>
        <td>{item.lastName + ' ' + item.firstName}</td>
        <td>{item.totalOrders}</td>
        <td>{numberWithCommas(item.total)}đ</td>
    </tr>
)

// const renderOrderHead = (item, index) => (
//     <th key={index}>{item}</th>
// )

// const renderOrderBody = (item, index) => (
//     <tr key={index}>
//         <td>{item.id}</td>
//         <td>{item.user}</td>
//         <td>{item.price}</td>
//         <td>{item.date}</td>
//         <td>
//             <Badge type={orderStatus[item.status]} content={item.status} />
//         </td>
//     </tr>
// )

const Dashboard = ({ history }) => {

    const state = useSelector(state => state.statisticAll)
    const { loading, error, summary } = state;

    const topCustomers = useSelector(state => state.topCustomers)
    const { loading: loadingCustomers, error: errorCustomers, customers } = topCustomers;

    const dispatch = useDispatch();

    const myInfo = useSelector(state => state.userSignin);
    const { userInfo } = myInfo;

    useEffect(() => {

        if (userInfo && userInfo.role === 'admin') {
            if (!summary) {
                dispatch(statisticAllAction())
            }
            if (!customers) {
                dispatch(topCustomersAction())
            }

        } else {
            history.push('/login')
        }
    }, [dispatch, summary, customers, history, userInfo])

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <div className="row">

                        {loading ? <div></div> : error ? <div>{error}</div> : summary ? (
                            <>
                                {console.log(summary)}
                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bx-user'
                                        count={summary.totalCustomer}
                                        title="Tổng khách hàng"
                                    />
                                </div>
                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bx-shopping-bag'
                                        count={summary.totalProduct}
                                        title="Tổng sản phẩm"
                                    />
                                </div>
                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bxl-product-hunt'

                                        count={summary.totalCategories}
                                        title="Tổng danh mục sản phẩm"
                                    />
                                </div>

                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bx-receipt'
                                        count={summary.totalOrder}
                                        title="Tổng đơn hàng"
                                    />
                                </div>
                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bx-dollar-circle'
                                        count={summary.revenueOrder && numberWithCommas(summary.revenueOrder[0].totalRevenue)}
                                        title="Tổng doanh thu"
                                    />
                                </div>
                                <div className="col-4" >
                                    <StatusCard
                                        icon='bx bx-git-branch'
                                        count={summary.totalBrand}
                                        title="Tổng thương hiệu"
                                    />
                                </div>
                            </>
                        ) : ''
                        }

                    </div>
                </div>
                {/* <div className="col-6">
                    <div className="card full-height">
                    <Chart
                            options={chartOptions.options}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div> */}
                <div className="col-12">
                    <div className="card">
                        <div className="card__header">
                            <h3>top khách hàng</h3>
                        </div>
                        <div className="card__body">
                            {loadingCustomers && <div>Loading...</div>}
                            {errorCustomers && <div>{errorCustomers}</div>}
                            {
                                customers ? (
                                    <Table
                                        headData={topCustomerTableHeader}
                                        renderHead={(item, index) => renderCusomerHead(item, index)}
                                        bodyData={customers && customers}
                                        renderBody={(item, index) => renderCusomerBody(item, index)}
                                    />
                                ) : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
