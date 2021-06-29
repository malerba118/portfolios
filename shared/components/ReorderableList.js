import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const defaults = {
  getId: (o) => o.id,
  getListStyle: (isDraggingOver) => ({
    display: "flex",
  }),
  getItemStyle: (isDragging) => ({
    marginRight: 8,
    display: "inline-block",
  }),
};

const ReorderableList = ({
  items,
  onChange,
  children,
  getId = defaults.getId,
  getListStyle = defaults.getListStyle,
  getItemStyle = defaults.getItemStyle,
}) => {
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const nextItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    onChange(nextItems);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <Draggable
                key={getId(item)}
                draggableId={getId(item)}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...getItemStyle(snapshot.isDragging),
                      ...provided.draggableProps.style,
                      // cursor: "move",
                    }}
                  >
                    {children(item)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderableList;
