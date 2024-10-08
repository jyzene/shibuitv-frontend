import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import Containers from "../../components/FormLayout/Containers";
import TableForm from "../../components/FormLayout/TableForm";
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
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/categoryPost/', {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setCategories(response.data);
        console.log('categorias',categories)
        } catch (error) {
            Swal.fire('Error', 'Categories couldn not be loaded', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchCategories();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!category) {
          Swal.fire('Error', 'Please, enter a category!', 'error');
          return;
        }
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/categoryPost/', 
            {
                nombreCategoria: category, // El nombre del campo dependerá de cómo está definida tu API
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Agrega el token en el encabezado
                },
            });
    
          Swal.fire('Success', 'New category added!', 'success');
          setCategory(''); // Limpiar el campo de entrada
          fetchCategories(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'Category could not be added', 'error');
        }
      };

    const handleChange = (e) => { //basicamente actualiza el array? de formData conforme se llenan los campos del form
        setCategory(e.target.value);
    };

    // Función para eliminar una categoría
    const deleteCategory = async (id) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/categoryPost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                  },
            });
            Swal.fire('Success', 'Category was deleted!', 'success');
            fetchCategories(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'Category could not be deleted', 'error');
        }
    };

    // Función para seleccionar la categoría a editar
    const selectCategoryForEdit = async (category) => {
        const token = localStorage.getItem('token');
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
                await axios.put(`http://127.0.0.1:8000/detallesPost/categoryPost/${category.id}`, 
                { 
                    nombreCategoria: newCategoryName
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                    },
                }
                );
                Swal.fire('Success', 'Category modified correctly', 'success');
                fetchCategories(); // Volvemos a cargar las categorías
                setEditCategoryId(null); // Salir del modo de edición
                setEditCategoryName("");
            } catch (error) {
                Swal.fire('Error', 'Category could not be modified', 'error');
            }
        }
    };

    return(
        <>
            <FormLayout>
                <Containers>
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
                        </div>
                        <SubmitButton text="Add Category"/>
                    </form>
                </Containers>
                <Containers>
                    <TableForm 
                        columns={['id','nombreCategoria']}
                        data={categories}
                        onEdit={selectCategoryForEdit}
                        onDelete={deleteCategory}
                        />
                </Containers>
            </FormLayout>
        </>
    )
}

export default CategoryForm