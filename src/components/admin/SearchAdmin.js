import React, { useState } from "react";

const SearchAdmin = (props) => {

  const [keyword, setKeyWord] = useState('');

  return (
    <div className="simple-search" >
      <input type="text" placeholder="Tìm kiếm..." required
        onChange={(e) => setKeyWord(e.target.value)}
      />
      <button type="button" onClick={() => props.handleSearchData(keyword)}>Go</button>
    </div>
  )
}

export default SearchAdmin;