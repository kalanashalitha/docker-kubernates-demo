import Modal from 'react-bootstrap/Modal'
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import FormControl from 'react-bootstrap/Form'
//import { useState } from 'react';

const EditMarker = ({ loadJobs, isOpen, setHide, selectedJob, setSelectedJob, setSelectedPlace }) => {

  const [title, setTitle] = useState(selectedJob?.title);
  const [brand, setBrand] = useState(selectedJob?.vehicleInfo.brand);
  const [model, setModel] = useState(selectedJob?.vehicleInfo.model);
  const [year, setYear] = useState(selectedJob?.vehicleInfo.year);
  const [price, setPrice] = useState(selectedJob?.vehicleInfo.price);

  // const handleChange = (e) => {
  //   const title = e.target.value;
  // };

  const hideModel = () => {
    setHide();
  };

  const saveCall = async (vehicleToSave) => {

    console.log("save", vehicleToSave);

    try {
      const response = await axios.put('http://localhost:8080/api/job/save-vehicle', vehicleToSave);
      console.log(response);
      if (201 == response.status || 204 == response.status) {
        setSelectedPlace(selectedJob.title);
        hideModel();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveVehicle = (e) => {
    e.preventDefault();
    const { titleEdited, brandEdited, modelEdited, yearEdited, priceEdited } = e.target.elements;
    console.log("titleEdited", titleEdited.value);
    setTitle(titleEdited.value);
    setBrand(brandEdited.value);
    setModel(modelEdited.value);
    setYear(yearEdited.value);
    setPrice(priceEdited.value);
    let save = {
      id: selectedJob.id,
      title: title,
      vehicleInfo: {
        brand: brand,
        model: model,
        year: year,
        price: price,
        transmission: ''
      },
      description: selectedJob.description,
      userId: selectedJob.userId,
      marker: selectedJob.marker,
      type: selectedJob.type
    };
    console.log("save", save);
    setSelectedJob(save);
    saveCall(save);
  };

  const deleteJob = async () => {
    try {
      console.log("selectedJob", selectedJob);
      const response = await axios.delete('http://localhost:8080/api/job/delete-vehicle', { data: selectedJob });
      console.log(response);
      if (200 == response.status) {
        hideModel();
        loadJobs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTitle(selectedJob?.title);
    setBrand(selectedJob?.vehicleInfo.brand);
    setModel(selectedJob?.vehicleInfo.model);
    setYear(selectedJob?.vehicleInfo.year);
    setPrice(selectedJob?.vehicleInfo.price);
  }, [selectedJob]);

  return (
    <>
      <Modal show={isOpen} onHide={hideModel}>
        <Form onSubmit={saveVehicle}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <div>
              Title : <input value={title} type="text" onChange={handleChange} />
            </div> */}

            <Form.Group className="mb-3" controlId="titleEdited">
              <Form.Label>Title</Form.Label>
              <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="brandEdited">
              <Form.Label>Brand</Form.Label>
              <Form.Control value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modelEdited">
              <Form.Label>Model</Form.Label>
              <Form.Control value={model} onChange={(e) => setModel(e.target.value)} type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="yearEdited">
              <Form.Label>Year</Form.Label>
              <Form.Control value={year} onChange={(e) => setYear(e.target.value)} type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceEdited">
              <Form.Label>Price</Form.Label>
              <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="" />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" >
              Save Vehicle
            </Button>
            <Button variant="danger" onClick={deleteJob}>Delete Vehicle</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditMarker;