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
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image
    setImageSrc(imageSrc);
    setItemModal(true);
    if (imageSrc) {
      console.log("Photo Captured!"); // Display the photo in the console
    }
  };

  const handleCloseModal = (resetForm) => {
    setItemModal(false);
    resetForm();
    setImageSrc(null);
  };
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime }, "image.png");
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
            screenshotFormat="jpg"
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
          {imageSrc && <img 
            src={imageSrc} 
            className="img-fluid"
            alt="Captured"
            style={{ maxWidth: "100%", height: "auto" }} />}
          <Formik
            initialValues={{
              category: "",
              size: "",
              color: "",
              brand: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              const itemData = new FormData();
              itemData.append("category", values.category);
              itemData.append("size", values.size);
              itemData.append("color", values.color);
              itemData.append("brand", values.brand);
              if (imageSrc) {
                const imageBlob = dataURLtoBlob(imageSrc);
                itemData.append("image", imageBlob, "image.jpg");
              }
              try {
                const token = localStorage.getItem("token");
                console.log("GETTING TOKEN FROM LOCAL STORAGE:", token);
                // for (let [key, value] of itemData.entries()) {
                //   console.log(key, value);
                // }
                const response = await axios.post("/api/upload", itemData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                });
                console.log("ITEM LOGGED:", response);
                navigate("/closet");
              } catch (error) {
                console.error("Error loggin item", error);
              } finally {
                handleCloseModal(resetForm);
                resetForm();
              }
            }}
          >
            {({ resetForm }) => (
              // CATEGORY
              <Form>
                <label htmlFor="category">Category</label>
                <Field
                  as="select"
                  id="category"
                  name="category"
                  className="form-control"
                  placeholder="Select an Option"
                >
                  <option value="" label="Select an Option"></option>
                  <option value="tops" label="Tops">
                    Tops
                  </option>
                  <option value="bottoms" label="Bottoms">
                    Bottoms
                  </option>
                  <option value="accesories" label="Accessories">
                    Acessories
                  </option>
                  <option value="shoes" label="Shoes">
                    Shoes
                  </option>
                </Field>
                {/* SIZE FIELD */}
                <label htmlFor="size">Size</label>
                <Field
                  as="select"
                  id="size"
                  name="size"
                  className="form-control"
                  placeholder="Select an Option"
                >
                  <option value="" label="Select an Option"></option>
                  <option value="small" label="Small">
                    Tops
                  </option>
                  <option value="medium" label="Medium">
                    Bottoms
                  </option>
                  <option value="large" label="Large">
                    Acessories
                  </option>
                  <option value="xlarge" label="XL">
                    Shoes
                  </option>
                </Field>
                {/* COLOR FIELD */}
                <label htmlFor="color">Color</label>
                <Field
                  as="select"
                  id="color"
                  name="color"
                  className="form-control"
                  placeholder="Select an Option"
                >
                  <option value="" label="Select an Option"></option>
                  <option value="blue" label="Blue">
                    Tops
                  </option>
                  <option value="red" label="Red">
                    Bottoms
                  </option>
                  <option value="orange" label="Orange">
                    Acessories
                  </option>
                  <option value="purple" label="Purple">
                    Shoes
                  </option>
                </Field>
                {/* BRAND */}
                <label htmlFor="brand">Brand</label>
                <Field
                  as="select"
                  id="brand"
                  name="brand"
                  className="form-control"
                  placeholder="Select an Option"
                >
                  <option value="" label="Select an Option"></option>
                  <option value="rei" label="REI">
                    Tops
                  </option>
                  <option value="gap" label="Gap">
                    Bottoms
                  </option>
                  <option value="duluth" label="DuluthTrading">
                    Acessories
                  </option>
                  <option value="target" label="Target">
                    Shoes
                  </option>
                </Field>
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => handleCloseModal(resetForm)}
                >
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
