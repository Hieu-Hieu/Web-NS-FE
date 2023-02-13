import React, { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const Search = forwardRef((props, searchMobileRef) => {
  let navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      navigate(`/catalog?name=${text}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form
      className="simple-search"
      onSubmit={handleSubmit}
      ref={searchMobileRef}
    >
      <input
        type="text"
        placeholder="Tìm kiếm..."
        required
        onChange={(e) => setText(e.target.value)}
        autoFocus
        onBlur={props.hanldeOnblur}
      />
      <div className="search-action">
        <button type="submit">
          <i className="bx bx-search"></i>
        </button>
        <span>
          <i className="bx bxs-microphone"></i>
        </span>
      </div>
    </form>
  );
});
