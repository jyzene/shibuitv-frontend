// src/components/Table.js
import React from 'react';

const TableForm = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="py-2 px-4 border-b-2 border-gray-300 text-left">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b border-gray-300">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableForm;
