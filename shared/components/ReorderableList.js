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
  getItemStyle: (isDragging) => ({}),
};

const ReorderableList = ({
  items,
  onChange,
  direction = "horizontal",
  isDisabled = false,
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
      <Droppable
        isDropDisabled={isDisabled}
        droppableId="droppable"
        direction={direction}
      >
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
                isDragDisabled={isDisabled}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...getItemStyle(snapshot.isDragging, index),
                      ...provided.draggableProps.style,
                      cursor: isDisabled ? undefined : "move",
                    }}
                  >
                    {children(item, index)}
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
