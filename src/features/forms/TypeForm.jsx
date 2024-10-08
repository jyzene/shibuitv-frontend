import React, {useState,useEffect} from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import Containers from "../../components/FormLayout/Containers";
import TableForm from "../../components/FormLayout/TableForm";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

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
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/typePost/', {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
          });
        setTypes(response.data);
        } catch (error) {
            Swal.fire('Error', 'Content Types could not be loaded', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchTypes();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/typePost/', type, {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
          });
          Swal.fire('Éxito', 'Type was added', 'success');
          setType({
            nombreTipo: '',
            duracionTipo: ''
          });
          fetchTypes(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'Type could not be added', 'error');
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
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/typePost/${id}`,{
                headers: {
                  Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                },
              });
            Swal.fire('Éxito', 'Type deleted succesfully!', 'success');
            fetchTypes(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'Type could not be deleted', 'error');
        }
    };

    const selectTypeForEdit = async (type) => {
        const token = localStorage.getItem('token');

        const { value: formValues } = await Swal.fire({
            title: "Modify Type",
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
                    Swal.showValidationMessage('Fields should be filled and be valid!');
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
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                    },
                });
                Swal.fire('Success', 'Type was modified', 'success');
                fetchTypes(); // Volvemos a cargar los tipos
            } catch (error) {
                Swal.fire('Error', 'Type could not be modified', 'error');
            }
        }
    };

    return(
        <>
            <FormLayout>
                <Containers>
                    <TitleForm text="Add Content Type"/>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="nombreTipo"
                                name="nombreTipo"
                                label="New type"
                                value={type.nombreTipo}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputForm
                                type="number"
                                id="duracionTipo"
                                name="duracionTipo"
                                label="Max. time length"
                                value={type.duracionTipo}
                                onChange={handleChange}
                            />
                        </div>
                        <SubmitButton text="submit"/>
                    </form>
                </Containers>
                <Containers>
                    <TableForm 
                            columns={['id','nombreTipo','duracionTipo']}
                            data={types}
                            onEdit={selectTypeForEdit}
                            onDelete={deleteType}
                    />
                </Containers>
            </FormLayout>
        </>
    )
}

export default TypeForm