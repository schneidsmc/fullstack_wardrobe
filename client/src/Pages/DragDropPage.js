import React, { useState } from "react";
import { Accordion, Card, Breadcrumb, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const DragDropPage = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(null); // Manage which accordion item is expanded

  return (
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
      <Accordion
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)} // Toggle accordion items
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Items</Accordion.Header>
          <Card>
            <Accordion.Body>
              Here is where the clothing items will go!
            </Accordion.Body>
          </Card>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DragDropPage;
