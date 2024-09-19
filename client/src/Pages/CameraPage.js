import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button, Container, Row, Col } from 'react-bootstrap';

const CameraPage = () => {
  const webcamRef = useRef(null); // Reference to the webcam component

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture image
    if (imageSrc) {
      console.log(imageSrc); // Display the photo in the console
    }
  };

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
              facingMode: { exact: "environment" }
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
    </Container>
  );
};

export default CameraPage;
