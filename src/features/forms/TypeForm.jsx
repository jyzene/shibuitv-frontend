import React, {useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const TypeForm = () => {
    const [error, setError] = useState('');
    const [type, setType] = useState({
        nombreTipo: '',
        duracionTipo: ''
    });
    const [types, setTypes] = useState([]);
    //const navigate = useNavigate();

    // Función para obtener los tipos desde el API
    const fetchTypes = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/typePost/');
        setTypes(response.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudo cargar los tipos', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchTypes();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/typePost/', type);
          Swal.fire('Éxito', 'tipo agregado!', 'success');
          setType({
            nombreTipo: '',
            duracionTipo: ''
          });
          fetchTypes(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'No se pudo añadir el tipo', 'error');
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Verificar si el campo es el precio (decimal)
        if (name === 'duracionTipo') {
          // Convertir a número decimal antes de almacenarlo
          setType({
            ...type,
            [name]: parseFloat(value) || '' // Si es inválido, establecerlo como cadena vacía
          });
        } else {
          // Para los otros campos, mantener el valor de texto
          setType({
            ...type,
            [name]: value
          });
        }
      };

    // Función para eliminar un tipo
    const deleteType = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/typePost/${id}`);
            Swal.fire('Éxito', 'Tipo eliminado exitosamente', 'success');
            fetchTypes(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el tipo', 'error');
        }
    };

    const selectTypeForEdit = async (type) => {
        const { value: formValues } = await Swal.fire({
            title: "Modify the Type",
            html:
                `<label for="swal-input1">Type Name</label>` +
                `<input id="swal-input1" class="swal2-input" value="${type.nombreTipo}">` +
                `<label for="swal-input2">Duration</label>` +
                `<input id="swal-input2" class="swal2-input" type="number" step="0.01" value="${type.duracionTipo}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const newName = document.getElementById('swal-input1').value;
                const newDuration = parseFloat(document.getElementById('swal-input2').value);
    
                // Validar los campos antes de confirmar
                if (!newName || isNaN(newDuration)) {
                    Swal.showValidationMessage('Ambos campos deben ser agregados y ser validos!');
                    return false; // Evita que se cierre el modal si hay un error
                }
                return [newName, newDuration];
            }
        });
    
        if (formValues) {
            const [newName, newDuration] = formValues;
            // Aquí llamamos a la función para actualizar el tipo
            try {
                await axios.put(`http://127.0.0.1:8000/detallesPost/typePost/${type.id}`, {
                    nombreTipo: newName,
                    duracionTipo: newDuration
                });
                Swal.fire('Success', 'Tipo modificado correctamente', 'success');
                fetchTypes(); // Volvemos a cargar los tipos
            } catch (error) {
                Swal.fire('Error', 'No se pudo modificar el tipo', 'error');
            }
        }
    };
    // Función para seleccionar la categoría a editar
    // const selectTypeForEdit = async (type) => {
    //     // setEditCategoryId(category.id);
    //     // setEditCategoryName(category.nombreCategoria);
    //     const { value: newCategoryName } = await Swal.fire({
    //         title: "Modify the category",
    //         input: "text",
    //         inputLabel: "Category",
    //         inputValue: category.nombreCategoria,
    //         showCancelButton: true,
    //         inputValidator: (value) => {
    //           if (!value) {
    //             return "You need to write something!";
    //           }
    //         }
    //     });
    //     if (newCategoryName) {
    //         // Mostrar mensaje con el nuevo valor ingresado (opcional)
    //         Swal.fire(`The new category name is: ${newCategoryName}`);
    
    //         // Aquí llamamos a la función para actualizar la categoría
    //         try {
    //             await axios.put(`http://127.0.0.1:8000/detallesPost/categoryPost/${category.id}`, { nombreCategoria: newCategoryName });
    //             Swal.fire('Éxito', 'Categoría modificada exitosamente', 'success');
    //             fetchCategories(); // Volvemos a cargar las categorías
    //             setEditCategoryId(null); // Salir del modo de edición
    //             setEditCategoryName("");
    //         } catch (error) {
    //             Swal.fire('Error', 'No se pudo modificar la categoría', 'error');
    //         }
    //     }
    // };

    return(
        <>
            <div className="p-8 bg-paper min-h-screen">
                <h2 className="text-lg font-title mb-4">Agregar Tipos</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <label htmlFor="nombreTipo" className="block text-sm font-medium text-gray-700">Nombre del tipo:</label>
                        <input
                            type="text"
                            id="nombreTipo"
                            name="nombreTipo"
                            value={type.nombreTipo}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div>
                        <label htmlFor="nombreTipo" className="block text-sm font-medium text-gray-700">Duracion Maxima:</label>
                        <input
                            type="number"
                            step="0.01" // Esto permite decimales
                            id="duracionTipo"
                            name="duracionTipo"
                            value={type.duracionTipo}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green text-white font-bold py-2 px-4 rounded-full">
                        Agregar Tipo
                    </button>
                </form>
                <h3 className="text-md font-title mb-4">Tipos Existentes</h3>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <tbody>
                        {types.length > 0 ? (
                            types.map((type) => (
                            <tr key={type.id}>
                                <td className="border px-4 py-2">{type.nombreTipo}</td>
                                <td className="border px-4 py-2">{type.duracionTipo}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => selectTypeForEdit(type)} className="bg-blue-500 text-wood rounded px-2 py-1 mr-2">
                                        Editar
                                    </button>
                                    <button onClick={() => deleteType(type.id)} className="bg-red-500 text-wood rounded px-2 py-1">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border px-4 py-2" colSpan="2">No hay tipos registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TypeForm