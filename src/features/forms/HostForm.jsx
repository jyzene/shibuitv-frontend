import React, {useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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
        try {
        const response = await axios.get('http://127.0.0.1:8000/detallesPost/hostPost/');
        setHosts(response.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudo cargar los hosts', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchHosts();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          console.log(host)
          const response = await axios.post('http://127.0.0.1:8000/detallesPost/hostPost/', host);
          Swal.fire('Éxito', 'host agregado!', 'success');
          setHost({
            nombresHost: '',
            apellidosHost: '',
            direccionHost: '',
            telefonoHost: ''
          });
          fetchHosts(); // Actualizar la lista de categorías
        } catch (error) {
            Swal.fire('Error', 'No se pudo añadir el host', 'error');
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
        try {
            await axios.delete(`http://127.0.0.1:8000/detallesPost/hostPost/${id}`);
            Swal.fire('Éxito', 'Host eliminado exitosamente', 'success');
            fetchHosts(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el host', 'error');
        }
    };

    const selectHostForEdit = async (host) => {
        const { value: formValues } = await Swal.fire({
            title: "Modify the Host",
            html:
                `<label for="swal-input1">Host Name</label>` +
                `<input id="swal-input1" class="swal2-input" value="${host.nombresHost}">` +
                `<label for="swal-input2">Host Lastname</label>` +
                `<input id="swal-input2" class="swal2-input" value="${host.apellidosHost}">` +
                `<label for="swal-input3">Host address</label>` +
                `<input id="swal-input3" class="swal2-input" value="${host.direccionHost}">` +
                `<label for="swal-input4">Host phone number</label>` +
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
                    Swal.showValidationMessage('todos los campos deben ser agregados y ser validos!');
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
                });
                Swal.fire('Success', 'host modificado correctamente', 'success');
                fetchHosts(); // Volvemos a cargar los tipos
            } catch (error) {
                Swal.fire('Error', 'No se pudo modificar a host', 'error');
            }
        }
    };
    

    return(
        <>
            <div className="p-8 bg-paper min-h-screen">
                <h2 className="text-lg font-title mb-4">Agregar Hosts</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <label htmlFor="nombresHost" className="block text-sm font-medium text-gray-700">Nombre(s) del Host:</label>
                        <input
                            type="text"
                            id="nombresHost"
                            name="nombresHost"
                            value={host.nombresHost}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellidosHost" className="block text-sm font-medium text-gray-700">Apellido(s):</label>
                        <input
                            type="text"
                            id="apellidosHost"
                            name="apellidosHost"
                            value={host.apellidosHost}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="direccionHost" className="block text-sm font-medium text-gray-700">Direccion:</label>
                        <input
                            type="text"
                            id="direccionHost"
                            name="direccionHost"
                            value={host.direccionHost}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div>
                        <label htmlFor="nombreTipo" className="block text-sm font-medium text-gray-700">Telefono: </label>
                        <input
                            type="number"
                            id="telefonoHost"
                            name="telefonoHost"
                            value={host.telefonoHost}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green text-white font-bold py-2 px-4 rounded-full">
                        Agregar Host
                    </button>
                </form>
                <h3 className="text-md font-title mb-4">Hosts Existentes</h3>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <tbody>
                        {hosts.length > 0 ? (
                            hosts.map((host) => (
                            <tr key={host.id}>
                                <td className="border px-4 py-2">{host.apellidosHost}, {host.nombresHost}</td>
                                <td className="border px-4 py-2">{host.direccionHost}</td>
                                <td className="border px-4 py-2">{host.telefonoHost}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => selectHostForEdit(host)} className="bg-blue-500 text-wood rounded px-2 py-1 mr-2">
                                        Editar
                                    </button>
                                    <button onClick={() => deleteHost(host.id)} className="bg-red-500 text-wood rounded px-2 py-1">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border px-4 py-2" colSpan="2">No hay hosts registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HostForm