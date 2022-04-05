import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ page, pages, getFilterUrl }) => {

  const pageNumber = [];
  if (pages) {
    for (let i = 1; i <= pages; i++) {
      pageNumber.push(i);
    }
  }

  // const handlePageChange = (number) => {
  //   // return (
  //   //   <Link to={`/catalog/pageNumber/${number}`}></Link>
  //   // )
  //   props.history.push(`/catalog/pageNumber/${number}`)
  // }
  console.log('render')

  return (
    <div className="paginate">
      <ul className="paginate__list">
        {page === 1 ?
          <li className="paginate__list-item">
            <button style={{ cursor: 'default', backgroundColor: "#f5f5f5" }}>Trang trước</button>
          </li>
          :
          <li className="paginate__list-item">
            <button>Trang trước</button>
          </li>
        }
        {pageNumber.map((number) => {
          if (number === page) {
            return <li className="paginate__list-item">
              <button className="active">{number}</button>
            </li>
          } else {
            return <li className="paginate__list-item">
              {/* <button onClick={() => handlePageChange(number)}>{number}</button> */}
              <Link to={`/catalog/pageNumber/${number}`}>{number}</Link>
            </li>
          }
        })
        }
        <li className="paginate__list-item">
          <button>...</button>
        </li>
        <li className="paginate__list-item">
          <button>Trang sau</button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;