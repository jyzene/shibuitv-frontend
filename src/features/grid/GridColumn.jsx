import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const GridColumn = ({ columnData, items }) => {
    const { itemsOrder, id } = columnData;
    console.log(items)
  
    return (
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col w-full min-h-60 h-fit"
          >
            {itemsOrder.map((itemId, index) => {
              const item = items[itemId];
  
              return (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <div
                      className="border-b rounded-md flex flex-col p-2 m-2 bg-pink-500"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      <p className="font-paragraph text-l">{item.title}</p>
                      <p className="font-paragraph text-l">{item.duarcion}</p>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  };
  

export default GridColumn;