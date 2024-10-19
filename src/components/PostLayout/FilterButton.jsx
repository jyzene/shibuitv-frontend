import React from 'react';

const FilterButton = ({ aplicarFiltro, label }) => {
  return (
    <button onClick={aplicarFiltro}
        className={`bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 mt-5 transition duration-500 hover:bg-watermelon`}>
      {label}
    </button>
  );
};

export default FilterButton;
