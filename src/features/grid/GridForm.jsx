import { useState, useEffect } from "react";
import FormLayout from "../../components/FormLayout/FormLayout";
import Containers from "../../components/FormLayout/Containers";
import TitleForm from "../../components/FormLayout/TitleForm";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import {
  DragDropContext,
  Draggable,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import GridColumn from "./GridColumn";

//add this if using next.js and keep the strict mode to false
export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {},
  };
}

const GridForm = () => {
//   const [columnsOrder, setColumnsOrder] = useState(INITIAL_COLUMN_ORDER);
//   const [data, setData] = useState(INITIAL_COL_DATA);

  const [items, setItems] = useState({});
  const [columns, setColumns] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
        // Define una función para obtener los datos de la API
        const fetchEventData = async () => {
        const token = localStorage.getItem('token');
        try {
            // Realiza la solicitud a la API
            const response = await axios.get('http://127.0.0.1:8000/Posts/PostEventInfo/', {
                headers: {
                    Authorization: `Bearer ${token}`, // Si es necesario enviar un token
                },
            }); 
            const eventos = response.data; // Asumiendo que los datos están en response.data

            const columnData = {
                "column-1": { id: "column-1", title: "Schedule", itemsOrder: [] },
                "column-2": { id: "column-2", title: "List of Events", itemsOrder: [] },
            };

            // Transforma los datos recibidos en el formato necesario para ITEMS
            const transformedItems = eventos.reduce((acc, evento, index) => {
            const id = `item-${index + 1}`; // Genera un ID único para cada evento
            acc[id] = {
                id: id,
                id_evento: evento.id,
                title: evento.nombre_evento,   // Usamos 'nombre_evento' como título
                en_vivo: evento.en_vivo,       // Otro dato del evento, si es necesario
                publicacion: evento.id_publicacion, // Asociamos la publicación
                duarcion: evento.id_publicacion__duracionPost, // Asociamos la publicación
                parrilla: 1
            };

            const columnId = "column-2";
            columnData[columnId].itemsOrder.push(id);

            return acc;
            }, {});

            // Actualizamos el estado de `items`
            setItems(transformedItems);
            setColumns(columnData);
        } catch (error) {
            Swal.fire('Error', 'Events could not be retrieved', 'error');
        }
        };

        // Llama a la función para obtener los datos de la API
        fetchEventData();
    }, []);

    const handleDragDrop = (results) => {
        const { source, destination, type } = results;
      
        if (!destination) return;
      
        // Si el elemento se deja en la misma posición, no se realiza ningún cambio
        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        )
          return;
      
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
      
        if (type === "COLUMN") {
          // Manejando el reordenamiento de columnas
          const reorderedColumns = Object.keys(columns);
          const [removedColumn] = reorderedColumns.splice(sourceIndex, 1);
          reorderedColumns.splice(destinationIndex, 0, removedColumn);
      
          // Generamos el nuevo objeto `columns` basado en el orden reordenado
          const newColumns = reorderedColumns.reduce((acc, colId) => {
            acc[colId] = columns[colId];
            return acc;
          }, {});
      
          setColumns(newColumns);
          // Guardar la nueva configuración de columnas en la base de datos si es necesario
        } else {
          // Manejando los cambios de elementos dentro de una columna o entre columnas
          const sourceColumnId = source.droppableId;
          const destColumnId = destination.droppableId;
      
          // Clonamos las listas de items para las columnas de origen y destino
          const sourceItemsOrder = [...columns[sourceColumnId].itemsOrder];
          const destItemsOrder = sourceColumnId === destColumnId ? sourceItemsOrder : [...columns[destColumnId].itemsOrder];
      
          // Removemos el item de la columna de origen
          const [movedItem] = sourceItemsOrder.splice(sourceIndex, 1);
      
          // Insertamos el item en la columna de destino en la posición indicada
          destItemsOrder.splice(destinationIndex, 0, movedItem);
      
          // Creamos un nuevo objeto `columns` para reflejar los cambios
          const newColumns = {
            ...columns,
            [sourceColumnId]: {
              ...columns[sourceColumnId],
              itemsOrder: sourceItemsOrder,
            },
            [destColumnId]: {
              ...columns[destColumnId],
              itemsOrder: destItemsOrder,
            },
          };
      
          setColumns(newColumns);
          // Guardar el nuevo estado en la base de datos si es necesario
        }
    };

    const handleSaveSchedule = () => {
      let totalDuration = 0;
      const columnId = "column-1";
      const column = columns[columnId];

      const orderData = {
        items: column.itemsOrder.map((itemId) => ({
          id: itemId,
          ...items[itemId], // Copia todas las propiedades del item
        })),
      };

      console.log("Datos guardados:", orderData);

      orderData.items.forEach((item) => {
        const [horas, minutos] = item.duarcion.split('.').map(Number);
        const duracionHoras = horas + (minutos ? minutos / 60 : 0);
        totalDuration += duracionHoras;
      });

      console.log('totalDuration', totalDuration)
      // Verificar si la suma total de las duraciones es mayor a 24 horas
      if (totalDuration > 1440) {
          alert("Error: La duración total de los eventos supera las 24 horas. Por favor ajuste la programación.");
          return; // Detenemos la ejecución para no proceder con navigate
      }

      if (totalDuration === 1440) {
          // Si la duración total es exactamente 24 horas, procedemos a navegar
          navigate('/admin/grid-info', { state: { orderData } });  // Cambia '/success-page' por la ruta que desees
      } else {
          alert(`La duración total es ${totalDuration.toFixed(2)} horas. Debe ser igual a 24 horas para continuar.`);
      }
      
    };
    

  return (
    <FormLayout>
        <Containers>
            <TitleForm text="Grid Organization"/>
            <div className="flex h-full w-full items-center flex-col">
                {/* Set up DragDropContext */}
                <DragDropContext onDragEnd={handleDragDrop}>
                    {/* Render Droppable area for columns */}
                    <Droppable droppableId="ROOT" type="COLUMN" direction="HORIZONTAL">
                        {(provided) => (
                        <div
                            className="flex items-start w-full md:max-w-6xl justify-center border min-h-96 py-4 mt-6 rounded-md overflow-auto"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Map through columns keys to render each column */}
                            {Object.keys(columns).map((colId, index) => {
                            const columnData = columns[colId];
                            return (
                                <Draggable
                                draggableId={columnData.id}
                                key={columnData.id}
                                index={index}
                                >
                                {(provided) => (
                                    <div
                                    className="rounded-md border flex flex-col max-w-m mx-3"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    >
                                    <div
                                        {...provided.dragHandleProps}
                                        className="flex items-center justify-between w-80 gap-2 hover:bg-green p-4 border-b border-b-gray-700 rounded-t-md"
                                    >
                                        <p className="text-l font-subtitle">
                                        {columnData.title}
                                        </p>
                                    </div>

                                    {/* Render items within the column */}
                                    <GridColumn 
                                        columnData={columnData} 
                                        items={items} 
                                    />
                                    </div>
                                )}
                                </Draggable>
                            );
                            })}
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </Containers>
        <button className="bg-green text-white font-subtitle py-2 px-4 rounded-full w-64 transition duration-500 hover:bg-watermelon" onClick={handleSaveSchedule}>
          Save
        </button>                      
    </FormLayout>
    
  );
}

export default GridForm;
