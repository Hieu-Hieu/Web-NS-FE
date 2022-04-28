import React, { useState } from 'react'


const Table = props => {

    const initDataShow = props.limit && props.bodyData ? props.bodyData.slice(0, Number(props.limit)) : props.bodyData

    const [dataShow, setDataShow] = useState(initDataShow)

    let pages = props.pages || 1;

    const pageList = [];
    if (pages) {
        for (let i = 1; i <= pages; i++) {
            pageList.push(i);
        }
    }

    const [currPage, setCurrPage] = useState(props.page || 1)

    return (
        <div>
            <div className="table-wrapper">
                <table>
                    {
                        props.headData && props.renderHead ? (
                            <thead>
                                <tr>
                                    {
                                        props.headData.map((item, index) => props.renderHead(item, index))
                                    }
                                </tr>
                            </thead>
                        ) : null
                    }
                    {
                        props.bodyData && props.renderBody ? (
                            <tbody>
                                {
                                    dataShow.map((item, index) => props.renderBody(item, index))
                                }
                            </tbody>
                        ) : null
                    }
                </table>
            </div>
            {
                pages > 1 ? (
                    <div className="table__pagination">
                        {
                            pageList.map((item) => (
                                <div key={item} className={`table__pagination-item ${currPage === item ? 'active' : ''}`} onClick={() => props.handlePageChange({ newPage: item })}>
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </div>
    )
}

export default Table
