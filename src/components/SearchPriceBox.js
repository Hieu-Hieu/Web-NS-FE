import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPriceBox = ({ getFilterUrl }) => {
  const styles = {
    height: '30px',
    width: '62px',
    backgroundColor: '#fcfcfc',
    border: 'solid 1px #ccc',
    marginTop: '5px'
  }
  const apply = {
    marginTop: '10px',
    padding: '5px',
    height: '30px',
    width: '100%',
    backgroundColor: '#024137',
    color: '#fff',
    display: 'block',
    textAlign: 'center',
    maxWidth: '140px',

  }

  const [min, setMin] = useState(0)
  const [max, setmax] = useState(0)

  return (
    <div>
      <div className="catalog__filter__widget">
        <div className="catalog__filter__widget__title">
          Khoảng Giá
        </div>

        <div style={{ width: '80%' }}>
          <input style={styles} placeholder="Từ" type="number"
            onChange={(e) => setMin(+(e.target.value))}
          ></input>
          <span style={{ fontSize: '20px', padding: '0 5px' }}>-</span>
          <input style={styles} placeholder="Đến" type="number"
            onChange={(e) => setmax(+(e.target.value))}
          ></input>
          <Link
            to={getFilterUrl({ min: min, max: max })}
            style={apply}
          >
            Áp dụng
          </Link>
        </div>

      </div>


    </div>
  )
}

export default SearchPriceBox;
