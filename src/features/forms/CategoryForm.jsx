import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import axios from 'axios';
import Swal from 'sweetalert2'



const CategoryForm = () => {
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");
    const navigate = useNavigate();

    // Función para obtener las categorías desde el API
    const fetchCategories = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/categoryPost/');
        setCategories(response.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron cargar las categorías', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchCategories();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) {
          Swal.fire('Error', 'El campo de categoría no puede estar vacío', 'error');
          return;
        }
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/categoryPost/', {
            nombreCategoria: category, // El nombre del campo dependerá de cómo está definida tu API
          });
    
          Swal.fire('Éxito', 'Categoría añadida con éxito', 'success');
          setCategory(''); // Limpiar el campo de entrada
          fetchCategories(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'No se pudo añadir la categoría', 'error');
        }
      };

    const handleChange = (e) => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        setCategory(e.target.value);
    };

    // Función para eliminar una categoría
    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/categoryPost/${id}`);
            Swal.fire('Éxito', 'Categoría eliminada exitosamente', 'success');
            fetchCategories(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
        }
    };

    // Función para seleccionar la categoría a editar
    const selectCategoryForEdit = async (category) => {
        // setEditCategoryId(category.id);
        // setEditCategoryName(category.nombreCategoria);
        const { value: newCategoryName } = await Swal.fire({
            title: "Modify the category",
            input: "text",
            inputLabel: "Category",
            inputValue: category.nombreCategoria,
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            }
        });
        if (newCategoryName) {
            // Mostrar mensaje con el nuevo valor ingresado (opcional)
            Swal.fire(`The new category name is: ${newCategoryName}`);
    
            // Aquí llamamos a la función para actualizar la categoría
            try {
                await axios.put(`http://127.0.0.1:8000/detallesPost/categoryPost/${category.id}`, { nombreCategoria: newCategoryName });
                Swal.fire('Éxito', 'Categoría modificada exitosamente', 'success');
                fetchCategories(); // Volvemos a cargar las categorías
                setEditCategoryId(null); // Salir del modo de edición
                setEditCategoryName("");
            } catch (error) {
                Swal.fire('Error', 'No se pudo modificar la categoría', 'error');
            }
        }
    };

    return(
        <>
            <FormLayout>
                <TitleForm text="Add Categories"/>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                    <InputForm
                        type="text"
                        id="category"
                        name="category"
                        label="new category"
                        value={category}
                        onChange={handleChange}
                    />
                    {/* <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                    /> */}
                    </div>
                    <SubmitButton text="Add Category"/>
                </form>
                <h3 className="text-md font-title mb-4">Categorías Existentes</h3>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border px-4 py-2">{category.nombreCategoria}</td>
                                <td className="border px-4 py-2">
                                <button onClick={() => selectCategoryForEdit(category)} className="bg-blue-500 text-wood rounded px-2 py-1 mr-2">
                                    Editar
                                </button>
                                <button onClick={() => deleteCategory(category.id)} className="bg-red-500 text-wood rounded px-2 py-1">
                                    Eliminar
                                </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border px-4 py-2" colSpan="2">No hay categorías registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </FormLayout>
        </>
    )
}

export default CategoryForm