import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
// import axios from 'axios';
import * as Yup from "yup";
// import { SchemaTypeOptions } from 'mongoose';

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Selection is required"),
  size: Yup.string().required("Input is required"),
  color: Yup.string().required("Input is required"),
  brand: Yup.string().required("Input is required"),
});

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [itemModal, setItemModal] = useState(false);
  // Reference to the webcam component

const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image
    setImageSrc(imageSrc);
    setItemModal(true);
    if (imageSrc) {
      console.log(imageSrc); // Display the photo in the console
    }
  };

const handleCloseModal = (resetForm) => {
  setItemModal(false);
  resetForm();
  setImageSrc(null)
}  

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center">Webcam Capture</h2>

          {/* Webcam component */}
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={{
              width: 1280,
              height: 720,
              facingMode: "user",
            }}
          />

          {/* Capture Button */}
          <div className="text-center mt-4">
            <Button onClick={capture} variant="primary">
              Capture Photo
            </Button>
          </div>
        </Col>
      </Row>
      {/* MODAL BABAY */}
      <Modal show={itemModal} onHide={() => handleCloseModal(() => {})}>
        <ModalHeader closeButton>Add Item</ModalHeader>
        <ModalBody>
          {imageSrc && <img src={imageSrc} alt="Captured" />}
          <Formik
            initialValues={{
              category: "",
              size: "",
              color: "",
              brand: "",
            }}
            onSubmit={(values, {resetForm}) =>{
              console.log(values);
              handleCloseModal(resetForm);
            }}
            validate={validationSchema}
          >
            {({ resetForm }) => (
              <Form>
                <label htmlFor="category">Category</label>
                <Field
                  as="select"
                  id="category"
                  className="form-control"
                  placeholder="Select an Option"
                >
                  <option value="" label="Select an Option"></option>
                  <option value="tops" label="Tops">
                    Tops
                  </option>
                  <option value="tottoms" label="Bottoms">
                    Bottoms
                  </option>
                  <option value="accesories" label="Accessories">
                    Acessories
                  </option>
                  <option value="shoes" label="Shoes">
                    Shoes
                  </option>
                </Field>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => handleCloseModal(resetForm)}>
                  Reset
                </button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CameraPage;
