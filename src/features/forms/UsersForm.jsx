import React, {useState,useEffect} from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const UsersForm = () => {
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        nombreUser: '',
        passwordUser: '',
        idRol: '',  // Valor por defecto para el rol
        idUsuarioDetalle: {
            nombresUser: '',
            apellidosUser: '',
            direccionUser: '',
            telefonoUser: '',
            correoUser: ''
        },
        idEstado: 1 
    });
    const [users, setUsers] = useState([]);
    //const navigate = useNavigate();

    // Función para obtener los tipos desde el API
    const fetchUsers = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/adminUsers/usuarioDetalle/');
        setUsers(response.data);
        } catch (error) {
            Swal.fire('Error', 'No se pudo cargar los usuarios', 'error');
        }
    };

     // Ejecutar fetchCategories cuando se monta el componente
    useEffect(() => {
        fetchUsers();
    }, []); // El array vacío [] asegura que se ejecute solo una vez al montar el componente


    // Enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user)
            const response = await axios.post('http://127.0.0.1:8000/adminUsers/usuarioMaestro/', user);
            console.log('respuesta ', response)
            //Swal.fire('Éxito', 'usuario agregado!', 'success');
            setUsers({
                nombreUser: '',
                passwordUser: '',
                idRol: '',  // Valor por defecto para el rol
                idUsuarioDetalle: {
                    nombresUser: '',
                    apellidosUser: '',
                    direccionUser: '',
                    telefonoUser: '',
                    correoUser: ''
                },
                idEstado: 1
            });
            fetchUsers(); // Actualizar la lista de usuarios
            const { nombreUser, plain_password } = response.data;
        
            Swal.fire({
                title: 'Éxito',
                html: `Usuario: <strong>${nombreUser}</strong><br>Contraseña: <strong>${plain_password}</strong>`,
                icon: 'success'
            });
        } catch (error) {
            Swal.fire('Error', 'No se pudo añadir el usuario', 'error');
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name in user.idUsuarioDetalle) {
            // Si el campo está dentro de idUsuarioDetalle
            setUser((prevState) => ({
                ...prevState,
                idUsuarioDetalle: {
                    ...prevState.idUsuarioDetalle,
                    [name]: value,
                }
            }));
        } else {
            // Si el campo está fuera de idUsuarioDetalle
            // setUser({
            //     ...user,
            //     [name]: value
            // });
            if (name === 'idRol') {
                // Convertir a número decimal antes de almacenarlo
                setUser({
                  ...user,
                  [name]: parseInt(value) || '' // Si es inválido, establecerlo como cadena vacía
                });
            } else {
                // Para los otros campos, mantener el valor de texto
                setUser({
                  ...user,
                  [name]: value
                });
            }
        }
    };
    

    // Función para eliminar un tipo
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/adminUsers/usuarioDetalle/${id}`);
            Swal.fire('Éxito', 'Usuario eliminado exitosamente', 'success');
            fetchUsers(); // Actualizar lista después de la eliminación
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
    };

    // const selectHostForEdit = async (host) => {
    //     const { value: formValues } = await Swal.fire({
    //         title: "Modify the Host",
    //         html:
    //             `<label for="swal-input1">Host Name</label>` +
    //             `<input id="swal-input1" class="swal2-input" value="${host.nombresHost}">` +
    //             `<label for="swal-input2">Host Lastname</label>` +
    //             `<input id="swal-input2" class="swal2-input" value="${host.apellidosHost}">` +
    //             `<label for="swal-input3">Host address</label>` +
    //             `<input id="swal-input3" class="swal2-input" value="${host.direccionHost}">` +
    //             `<label for="swal-input4">Host phone number</label>` +
    //             `<input id="swal-input4" class="swal2-input" type="number" value="${host.telefonoHost}">`,
    //         focusConfirm: false,
    //         showCancelButton: true,
    //         preConfirm: () => {
    //             const newName = document.getElementById('swal-input1').value;
    //             const newLastName = document.getElementById('swal-input2').value;
    //             const newAddress = document.getElementById('swal-input3').value;
    //             const newPhone = parseInt(document.getElementById('swal-input4').value);
    
    //             // Validar los campos antes de confirmar
    //             if (!newName || !newLastName || !newAddress || isNaN(newPhone)) {
    //                 Swal.showValidationMessage('todos los campos deben ser agregados y ser validos!');
    //                 return false; // Evita que se cierre el modal si hay un error
    //             }
    //             return [newName, newLastName, newAddress, newPhone];
    //         }
    //     });
    
    //     if (formValues) {
    //         const [newName, newLastName, newAddress, newPhone] = formValues;
    //         // Aquí llamamos a la función para actualizar el tipo
    //         try {
    //             await axios.put(`http://127.0.0.1:8000/detallesPost/hostPost/${host.id}`, {
    //                 nombresHost: newName,
    //                 apellidosHost: newLastName,
    //                 direccionHost: newAddress,
    //                 telefonoHost: newPhone
    //             });
    //             Swal.fire('Success', 'host modificado correctamente', 'success');
    //             fetchHosts(); // Volvemos a cargar los tipos
    //         } catch (error) {
    //             Swal.fire('Error', 'No se pudo modificar a host', 'error');
    //         }
    //     }
    // };
    

    return(
        <>
            <div className="p-8 bg-paper min-h-screen">
                <h2 className="text-lg font-title mb-4">Agregar Usuarios</h2>
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <label htmlFor="nombresUser" className="block text-sm font-medium text-gray-700">Nombre(s) del Usuario:</label>
                        <input
                            type="text"
                            id="nombresUser"
                            name="nombresUser"
                            value={user.idUsuarioDetalle.nombresUser}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apellidosUser" className="block text-sm font-medium text-gray-700">Apellido(s):</label>
                        <input
                            type="text"
                            id="apellidosUser"
                            name="apellidosUser"
                            value={user.idUsuarioDetalle.apellidosUser}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="direccionUser" className="block text-sm font-medium text-gray-700">Direccion:</label>
                        <input
                            type="text"
                            id="direccionUser"
                            name="direccionUser"
                            value={user.direccionUser}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefonoUser" className="block text-sm font-medium text-gray-700">Telefono: </label>
                        <input
                            type="number"
                            id="telefonoUser"
                            name="telefonoUser"
                            value={user.telefonoUser}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="correoUser" className="block text-sm font-medium text-gray-700">Email: </label>
                        <input
                            type="email"
                            id="correoUser"
                            name="correoUser"
                            value={user.correoUser}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="idRol" className="block text-sm font-medium text-gray-700">Rol del Usuario:</label>
                        <select
                            id="idRol"
                            name="idRol"
                            value={user.idRol}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green focus:border-green"
                            required
                        >
                            <option value="" disabled>Seleccione un rol</option>
                            <option value="1">Administrador</option>
                            <option value="2">Coordinador</option>
                            <option value="3">Creador</option>
                            <option value="4">Analista</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-green text-white font-bold py-2 px-4 rounded-full">
                        Agregar Usuario
                    </button>
                </form>
                <h3 className="text-md font-title mb-4">Usuarios Existentes</h3>
                <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                            <tr key={user.id}>
                                <td className="border px-4 py-2">{user.apellidosUser}, {user.nombresUser}</td>
                                <td className="border px-4 py-2">{user.direccionUser}</td>
                                <td className="border px-4 py-2">{user.telefonoUser}</td>
                                <td className="border px-4 py-2">{user.correoUser}</td>
                                <td className="border px-4 py-2">
                                    {/* <button onClick={() => selectHostForEdit(host)} className="bg-blue-500 text-wood rounded px-2 py-1 mr-2">
                                        Editar
                                    </button> */}
                                    <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-wood rounded px-2 py-1">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border px-4 py-2" colSpan="2">No hay usuarios registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsersForm