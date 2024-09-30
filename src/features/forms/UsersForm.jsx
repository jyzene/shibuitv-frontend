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

    return(
        <>
            <FormLayout>
                <Containers>
                    <TitleForm text="Add New User"/>
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="nombresUser"
                                name="nombresUser"
                                label="User name(s)"
                                value={user.idUsuarioDetalle.nombresUser}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="apellidosUser"
                                name="apellidosUser"
                                label="User Lastname(s)"
                                value={user.idUsuarioDetalle.apellidosUser}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <InputForm
                                type="text"
                                id="direccionUser"
                                name="direccionUser"
                                label="Address"
                                value={user.direccionUser}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputForm
                                type="number"
                                id="telefonoUser"
                                name="telefonoUser"
                                label="Phone Number"
                                value={user.telefonoUser}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <InputForm
                                type="email"
                                id="correoUser"
                                name="correoUser"
                                label="Email"
                                value={user.correoUser}
                                onChange={handleChange}
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
                        <SubmitButton text="submit"/>
                    </form>
                </Containers>
                <Containers>
                    <TableForm 
                            columns={['id','nombresUser','apellidosUser','direccionUser','telefonoUser','correoUser']}
                            data={users}
                            //onEdit={selectTypeForEdit}
                            onDelete={deleteUser}
                    />
                </Containers>
            </FormLayout>
        </>
    )
}

export default UsersForm