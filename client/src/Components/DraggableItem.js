import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        margin: "10px",
        padding: "10px",
        border: "1px solid black",
        backgroundColor: isDragging ? "lightgreen" : "white",
        cursor: "move",
      }}
    >
      {name}
    </div>
  );
};

export default DraggableItem;
