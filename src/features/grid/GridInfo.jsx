import React, { useEffect, useState } from 'react';
import FormLayout from "../../components/FormLayout/FormLayout";
import TitleForm from "../../components/FormLayout/TitleForm";
import { useLocation } from 'react-router-dom';
import Containers from '../../components/FormLayout/Containers';

function GridInfo() {

    const location = useLocation();
    const [eventos, setEventos] = useState([]);
    //const [horariosCalculados, setHorariosCalculados] = useState([]);

    // Acceder a 'orderData' desde 'location.state'
    useEffect(() => {
        if (location.state && location.state.orderData) {
            const { orderData } = location.state;
            console.log("Datos recibidos:", orderData);
            setEventos(orderData.items); // Asignar los datos a la variable de 'eventos'
        }
    }, [location.state]);
    /**
     * Función para calcular los horarios de inicio y fin de cada evento.
     * @param {Array} eventos - Lista de eventos con la duración en formato decimal.
     * @param {String} horaInicio - Hora de inicio en formato "HH:MM".
     * @returns {Array} - Lista de eventos con horarios calculados.
     */
    function calcularHorarios(eventos, horaInicio) {
    // Función para convertir tiempo decimal a minutos.
        const convertirADuracionMinutos = (duracion) => {
            let [minutos, segundos] = duracion.toString().split('.').map(Number);

            if (minutos >= 60) {
                const horas = Math.floor(minutos / 60);
                minutos = minutos % 60;
                return horas * 60 + minutos + (segundos || 0) / 60;
            }

            return minutos + (segundos || 0) / 60;
        };

        // Función para convertir minutos a formato "HH:MM".
        const convertirAMinutosAHora = (totalMinutos) => {
            const horas = Math.floor(totalMinutos / 60);
            const minutos = Math.round(totalMinutos % 60);
            return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`;
        };

        // Función para convertir la hora "HH:MM" a minutos.
        const convertirHoraAMinutos = (hora) => {
            const [horas, minutos] = hora.split(':').map(Number);
            console.log(horas * 60 + minutos)
            return horas * 60 + minutos;
        };

        // Inicializar el horario actual con la hora de inicio.
        let horarioActual = convertirHoraAMinutos(horaInicio);
        const eventosConHorarios = [];

        // Recorrer los eventos y calcular horarios.
        eventos.forEach((evento) => {
            const duracionMinutos = convertirADuracionMinutos(evento.duarcion);

            // Asignar horario de inicio y calcular horario de fin.
            const hora_inicio = convertirAMinutosAHora(horarioActual);
            horarioActual += duracionMinutos;
            const hora_fin = convertirAMinutosAHora(horarioActual);
            const id_evento = evento.id_evento
            const id_parrilla = evento.parrilla

            // Añadir el evento con sus horarios calculados.
            eventosConHorarios.push({
            id_evento,
            id_parrilla,
            hora_inicio,
            hora_fin,
            id_transmision
            });
        });

        return eventosConHorarios;
    }

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const url = 'http://127.0.0.1:8000/Events/bulkParrilla/';
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(eventosConHorarios), // Convertir los eventos a JSON
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al guardar los eventos:', errorData);
            alert('Hubo un error al guardar los eventos. Revisa la consola para más detalles.');
            return;
          }
    
          const data = await response.json();
          console.log('Eventos guardados exitosamente:', data);
          alert('Los eventos se han guardado correctamente.');
        } catch (error) {
          console.error('Error en la solicitud:', error);
          alert('No se pudo conectar con el servidor.');
        }
      };
    

    const horaInicio = '00:00'; // Hora de inicio de la grilla
    const id_transmision = 1
    const eventosConHorarios = calcularHorarios(eventos, horaInicio);
    //console.log(eventos)

    console.log(eventosConHorarios);
  
  return (
    <div>
        <FormLayout>
          <Containers>
          <TitleForm text="Final Schedule"/>
            <button onClick={handleSave}>Save</button>
            <table className="min-w-full table-auto shadow-md rounded-lg font-paragraph text-m">
                <thead>
                    <tr className="bg-green text-white">
                        <th className="px-4 py-2">Event ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Start Time</th>
                        <th className="px-4 py-2">End Time</th>
                        <th className="px-4 py-2">Live</th>
                    </tr>
                </thead>
                <tbody>
                    {eventosConHorarios.length > 0 ? (
                        eventosConHorarios.map((evento, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2 text-center">{evento.id_evento}</td>
                                <td className="px-4 py-2 text-center">{evento.title}</td>
                                <td className="px-4 py-2 text-center">{evento.hora_inicio}</td>
                                <td className="px-4 py-2 text-center">{evento.hora_fin}</td>
                                <td className="px-4 py-2 text-center">
                                    {evento.en_vivo ? 'Yes' : 'No'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-4 py-2 text-center">
                                No events found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
          </Containers>
        </FormLayout>
    </div>
  );
}

export default GridInfo;
