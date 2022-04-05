import React, { useState } from "react";
import { } from '../styles/search.css';

const Search = (props) => {

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      props.history.push(`/catalog/name/${text}`)
    } else {
      props.history.push('/')
    }
  }

  return (
    <form className="simple-search" onSubmit={handleSubmit}>
      <input type="text" placeholder="Tìm kiếm..." required
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit"><i className='bx bx-search'></i></button>
    </form>
  )
}

export default Search;