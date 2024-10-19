import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostsTable = ({ columns = [], data = [] }) => { //columns es el nombre de las columnas, osea el nombre de los campos del json
  const navigate = useNavigate();

  const handleRowClick = (postId) => {
    // Navega a la ruta de detalles del post
    navigate(`/admin/PostDetail/${postId}`);
  };
  
  return (
    <div className="overflow-x-auto mt-10">
      <table className="min-w-full table-auto shadow-md rounded-lg font-paragraph text-m">
        <tbody>
        {data.length > 0 ? (
          data.map((dataset,index) => (
            <tr key={index} className="transition duration-500" onClick={() => handleRowClick(dataset.id)}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b-2 border-wood">
                  {dataset[col]} {/* Ajusta esta lógica a la estructura de datos */}
                </td>
              ))}
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

export default PostsTable;