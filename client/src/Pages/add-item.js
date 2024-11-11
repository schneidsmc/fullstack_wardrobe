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
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import OrganizationTagsInput from "../Components/input-tags";
import BackgroundRemovalToggle from "../Components/backgroundToggle";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  color: Yup.string().required("Color is required"),
  season: Yup.string().required("Season is required"),
  occasion: Yup.string().required("Occasion is required"),
});

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [itemModal, setItemModal] = useState(false);
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

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
          <BackgroundRemovalToggle />
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
          {imageSrc && (
            <img
              src={imageSrc}
              className="img-fluid"
              alt="Captured"
              style={{ maxWidth: "100%", height: "auto" }}
              effect=""
            />
          )}
          <Formik
            initialValues={{
              category: "",
              color: "",
              season: "",
              occasion: "",
              tags: [],
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              // console.log(values);
              const itemData = new FormData();
              itemData.append("category", values.category);
              itemData.append("color", values.color);
              itemData.append("season", values.season);
              itemData.append("occasion", values.occasion);
              tags.forEach((tag) => itemData.append("tags[]", tag));
              if (imageSrc) {
                const imageBlob = dataURLtoBlob(imageSrc);
                itemData.append("image", imageBlob, "image.jpg");
              }
              try {
                const token = localStorage.getItem("token");
                // console.log("GETTING TOKEN FROM LOCAL STORAGE:", token);
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
                // alert("Item Saved to Closet!");
                handleCloseModal(resetForm);
                resetForm();
              }
            }}
          >
            {({ resetForm }) => (
              // CATEGORY
              <Form>
                {/* Category Field */}
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Field as="select" name="category" className="form-control">
                    <option value="" label="Select a category" />
                    <optgroup label="Tops">
                      <option value="tank">Tank</option>
                      <option value="sweater">Sweater</option>
                      <option value="long sleeve">Long Sleeve</option>
                      <option value="short sleeve">Short Sleeve</option>
                      <option value="jacket">Jacket</option>
                      <option value="tube top">Tube Top</option>
                    </optgroup>
                    <optgroup label="Bottoms">
                      <option value="shorts">Shorts</option>
                      <option value="pants">Pants</option>
                      <option value="skirt">Skirt</option>
                    </optgroup>
                    <optgroup label="Shoes">
                      <option value="heels">Heels</option>
                      <option value="boots">Boots</option>
                      <option value="sandals">Sandals</option>
                      <option value="sneakers">Sneakers</option>
                    </optgroup>
                    <optgroup label="Accessories">
                      <option value="necklace">Necklace</option>
                      <option value="earrings">Earrings</option>
                      <option value="bag">Bag</option>
                      <option value="hat">Hat</option>
                      <option value="scarf">Scarf</option>
                      <option value="bracelet">Bracelet</option>
                      <option value="ring">Rings</option>
                      <option value="sunglasses">Sunglasses</option>
                    </optgroup>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Color Field */}
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <Field as="select" name="color" className="form-control">
                    <option value="" label="Select a color" />
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="gray">Gray</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="brown">Brown</option>
                    <option value="pink">Pink</option>
                    <option value="beige">Beige</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="multicolor">Multicolor</option>
                  </Field>
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Season Field */}
                <div className="form-group">
                  <label htmlFor="season">Season</label>
                  <Field as="select" name="season" className="form-control">
                    <option value="" label="Select a season" />
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="autumn">Autumn</option>
                    <option value="winter">Winter</option>
                  </Field>
                  <ErrorMessage
                    name="season"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Occasion Field */}
                <div className="form-group">
                  <label htmlFor="occasion">Occasion</label>
                  <Field as="select" name="occasion" className="form-control">
                    <option value="" label="Select an occasion" />
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="activewear">Activewear</option>
                    <option value="vacation">Vacation</option>
                    <option value="party">Party</option>
                    <option value="holiday">Holiday</option>
                  </Field>
                  <ErrorMessage
                    name="occasion"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <label>Custom Tags: </label>
                <OrganizationTagsInput tags={tags} setTags={setTags} />

                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Add Item
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CameraPage;
