import React from 'react';

const Searchbar = ({ onSearch }) => {
  return (
    <div className="mb-2 mt-2">
      <input
        className="form-control"
        type="input"
        placeholder="Buscar"
        aria-label="Busca"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;
