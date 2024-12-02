import React from "react";
import { useDrop } from "react-dnd";

const DropArea = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item) => console.log(`Dropped: ${item.name}`),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const backgroundColor = isOver
    ? "lightyellow"
    : canDrop
      ? "lightblue"
      : "white";

  return (
    <div
      ref={drop}
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px dashed black",
        minHeight: "200px",
        backgroundColor,
      }}
    >
      {canDrop ? "Release to add" : "Drag an item here"}
    </div>
  );
};

export default DropArea;
