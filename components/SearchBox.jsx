import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineCloseCircle } from "react-icons/ai";

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="flex items-center bg-[#1D1D1F] p-2 rounded-md w-[700px] relative">
      <input
        type="text"
        className="flex-grow h-8 px-2 text-white bg-[#1D1D1F]"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        autoFocus
      />

      <button
        className="p-2 text-white absolute right-3 text-lg"
        onClick={() => setShowSearch(false)}
      >
        <AiOutlineCloseCircle />
      </button>
    </div>
  );
};

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBox;
