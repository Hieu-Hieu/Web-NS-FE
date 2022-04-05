import React from 'react'
import {Link} from 'react-router-dom'

import {} from '../styles/notfound.css'

const NotFound = () => {
    return (
        <div className="notfound">
          <h1>404</h1>
          <span>Ooops!!</span>
          <p>KHÔNG TÌM THẤY TRANG NÀY.</p>
          <Link to="">Trở về trang chủ</Link>
        </div>
    )
}

export default NotFound
