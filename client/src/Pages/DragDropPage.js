import React, { useState } from "react";
import { Accordion, Card, Breadcrumb, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { DndProvider } from "react-dnd"; // The DndProvider component is used to wrap your app, passing the HTML5Backend to manage the drag-and-drop interactions.
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "../Components/DraggableItem"; // Each item that can be dragged is wrapped with the useDrag hook. This hook defines the behavior when the item is being dragged.
import DropArea from "../Components/DropArea"; // The DropArea component is where items can be dropped. It uses the useDrop hook to define the target for draggable items.

const DragDropPage = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(null); // for the accordion

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div>DragDropPage</div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/closet")}>
            Closet
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => navigate("/dragdrop")}>
            Create Outfift
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="text-center">
          <Link to="/closet">
            <Button variant="primary" className="mb-3">
              Save Outfit
            </Button>
          </Link>
          <div className="text-center">
            <Button variant="primary" className="mb-3">
              Randomize Outfit
            </Button>
          </div>
        </div>
        <DropArea />
        <Accordion
          activeKey={activeKey}
          onSelect={(selectedKey) => setActiveKey(selectedKey)} // Toggle accordion items
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Add Items</Accordion.Header>
            <Card>
              <Accordion.Body>
                <DraggableItem>
                  Here is where the clothing items will go!
                </DraggableItem>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      </div>
    </DndProvider>
  );
};

export default DragDropPage;
