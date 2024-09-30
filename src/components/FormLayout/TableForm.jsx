// src/components/Table.js
import React from 'react';
import edit from '../../assets/edit-2.svg';
import deleteicon from '../../assets/delete.svg';

const TableForm = ({ columns = [], data = [], onEdit, onDelete }) => { //columns es el nombre de las columnas, osea el nombre de los campos del json
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto shadow-md rounded-lg font-paragraph text-m">
        <tbody>
        {data.length > 0 ? (
          data.map((dataset,index) => (
            <tr key={index} className="transition duration-500 hover:bg-green">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b-2 border-wood">
                  {dataset[col]} {/* Ajusta esta lógica a la estructura de datos */}
                </td>
              ))}
              <td className="py-2 px-4 border-b-2 border-wood">
                <button
                  onClick={() => onEdit(dataset)}
                  className="bg-blue-500 text-wood rounded px-2 py-1 mr-2"
                >
                  <img src={edit} alt="" />
                </button>
                <button
                  onClick={() => onDelete(dataset['id'])}
                  className="bg-red-500 text-wood rounded px-2 py-1"
                >
                  <img src={deleteicon} alt="" />
                </button>
              </td>
            </tr>
          ))

        ) : (
          <tr>
            <td className="border px-4 py-2" colSpan="2">Nothing to show here!</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default TableForm;
