import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = forwardRef((props, searchMobileRef) => {
  let navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      navigate(`/catalog?name=${text}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form className="simple-search" onSubmit={handleSubmit} ref={searchMobileRef}>
      <input type="text" placeholder="Tìm kiếm..." required
        onChange={(e) => setText(e.target.value)}
        autoFocus
        onBlur={props.hanldeOnblur}
      />
      <button type="submit"><i className='bx bx-search'></i></button>
    </form>
  )
})

export default Search;