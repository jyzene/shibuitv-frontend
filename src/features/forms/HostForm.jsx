import React, {useState,useEffect} from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import SubmitButton from "../../components/FormLayout/Button";
import InputForm from "../../components/FormLayout/InputForm";
import Containers from "../../components/FormLayout/Containers";
import { useNavigate } from 'react-router-dom';
import TableForm from "../../components/FormLayout/TableForm";
import axios from 'axios';
import Swal from 'sweetalert2';


const HostForm = () => {
    const [error, setError] = useState('');
    const [host, setHost] = useState({
        nombresHost: '',
        apellidosHost: '',
        direccionHost: '',
        telefonoHost:''
    });
    const [hosts, setHosts] = useState([]);
    //const navigate = useNavigate();

    // Función para obtener los tipos desde el API
    const fetchHosts = async () => {
        const token = localStorage.getItem('token');

        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/hostPost/' , {
            headers: {
                Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
        });
        setHosts(response.data);
        } catch (error) {
            Swal.fire('Error', 'Hosts could not be loaded', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchHosts();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/hostPost/', host, {
            headers: {
              Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
            },
          });
          Swal.fire('Éxito', 'host agregado!', 'success');
          setHost({
            nombresHost: '',
            apellidosHost: '',
            direccionHost: '',
            telefonoHost: ''
          });
          fetchHosts(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'Host could not be added', 'error');
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Verificar si el campo es el precio (decimal)
        if (name === 'telefonoHost') {
          // Convertir a número decimal antes de almacenarlo
          setHost({
            ...host,
            [name]: parseInt(value) || '' // Si es inválido, establecerlo como cadena vacía
          });
        } else {
          // Para los otros campos, mantener el valor de texto
          setHost({
            ...host,
            [name]: value
          });
        }
      };

    // Función para eliminar un tipo
    const deleteHost = async (id) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/hostPost/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                },
              });
            Swal.fire('Éxito', 'Host eliminado exitosamente', 'success');
            fetchHosts(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el host', 'error');
        }
    };

    const selectHostForEdit = async (host) => {
        const token = localStorage.getItem('token');
        const { value: formValues } = await Swal.fire({
            title: "Modify the Host",
            html:
                `<label for="swal-input1">Name</label>` +
                `<input id="swal-input1" class="swal2-input" value="${host.nombresHost}">` +
                `<label for="swal-input2">Lastname</label>` +
                `<input id="swal-input2" class="swal2-input" value="${host.apellidosHost}">` +
                `<label for="swal-input3">address</label>` +
                `<input id="swal-input3" class="swal2-input" value="${host.direccionHost}">` +
                `<label for="swal-input4">phone number</label>` +
                `<input id="swal-input4" class="swal2-input" type="number" value="${host.telefonoHost}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                const newName = document.getElementById('swal-input1').value;
                const newLastName = document.getElementById('swal-input2').value;
                const newAddress = document.getElementById('swal-input3').value;
                const newPhone = parseInt(document.getElementById('swal-input4').value);
    
                // Validar los campos antes de confirmar
                if (!newName || !newLastName || !newAddress || isNaN(newPhone)) {
                    Swal.showValidationMessage('All fields must be full and valid!');
                    return false; // Evita que se cierre el modal si hay un error
                }
                return [newName, newLastName, newAddress, newPhone];
            }
        });
    
        if (formValues) {
            const [newName, newLastName, newAddress, newPhone] = formValues;
            // Aquí llamamos a la función para actualizar el tipo
            try {
                await axios.put(`http://127.0.0.1:8000/detallesPost/hostPost/${host.id}`, {
                    nombresHost: newName,
                    apellidosHost: newLastName,
                    direccionHost: newAddress,
                    telefonoHost: newPhone
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Agrega el token en el encabezado
                    },
                });
                Swal.fire('Success', 'Host has been modified', 'success');
                fetchHosts(); // Volvemos a cargar los tipos
            } catch (error) {
                Swal.fire('Error', 'Host could not be modified', 'error');
            }
        }
    };
    

    return(
        <>
            <FormLayout>
                <Containers>
                    <TitleForm text="Agregar Hosts"/>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <InputForm
                                    type="text"
                                    id="nombresHost"
                                    name="nombresHost"
                                    label="Host's Name(s)"
                                    value={host.nombresHost}
                                    onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="apellidosHost"
                                name="apellidosHost"
                                label="Host's Lastname"
                                value={host.apellidosHost}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="direccionHost"
                                name="direccionHost"
                                label="Host's Address"
                                value={host.direccionHost}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputForm
                                type="text"
                                id="telefonoHost"
                                name="telefonoHost"
                                label="Host's Phone Number"
                                value={host.telefonoHost}
                                onChange={handleChange}
                            />
                        </div>
                        <SubmitButton text="Add Host"/>
                    </form>
                </Containers>
                <Containers>
                    <TableForm 
                        columns={['id','nombresHost','apellidosHost','direccionHost','telefonoHost']}
                        data={hosts}
                        onEdit={selectHostForEdit}
                        onDelete={deleteHost}
                        />
                </Containers>
            </FormLayout>
        </>
    )
}

export default HostForm