import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import axios from "axios";

const SelectHost = ({ apiEndpoint, valueField, handleChange, selectedValue, label, name }) => {
  const [options, setOptions] = useState([]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setOptions(response.data); // Assuming the API returns an array of data
    } catch (error) {
        Swal.fire('Error', 'Hosts could not be loaded', 'error');
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  return (
    <div>
      {label && <label htmlFor={name} className="block text-sm font-subtitle text-wood">{label}</label>}
      <select
        id={name}
        name={name}
        value={selectedValue}
        onChange={handleChange}
        className="mt-1 block w-full border border-wood rounded-md shadow-sm py-2 px-3 font-subtitle text-base2 focus:outline-none focus:ring-green focus:border-green"
        required
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option[valueField]} value={option[valueField]}>
            {`${option.name} ${option.lastname}`} {/* Combine name and lastname */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectHost;
