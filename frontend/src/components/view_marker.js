import Modal from 'react-bootstrap/Modal'
import { Form, Image } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PhotoPreview from './PhotoPreview';
//import FormControl from 'react-bootstrap/Form'
//import { useState } from 'react';

const ViewMarker = ({ isOpen, setHide, selectedJob, setSelectedPlace }) => {

  const [title, setTitle] = useState(selectedJob?.title);
  const [brand, setBrand] = useState(selectedJob?.vehicleInfo.brand);
  const [model, setModel] = useState(selectedJob?.vehicleInfo.model);
  const [year, setYear] = useState(selectedJob?.vehicleInfo.year);
  const [price, setPrice] = useState(selectedJob?.vehicleInfo.price);
  const [photoList, setPhotoList] = useState(selectedJob?.photoList ? selectedJob.photoList : []);
  const [showPreview, setShowPreview] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  // const handleChange = (e) => {
  //   const title = e.target.value;
  // };

  const hideModel = () => {
    setHide();
  };

  const hidePreview = () => {
    setShowPreview(false);
  };

  useEffect(() => {
    setSelectedPlace(selectedJob?.title);
    setTitle(selectedJob?.title);
    setBrand(selectedJob?.vehicleInfo.brand);
    setModel(selectedJob?.vehicleInfo.model);
    setYear(selectedJob?.vehicleInfo.year);
    setPrice(selectedJob?.vehicleInfo.price);
    setPhotoList(selectedJob?.photoList);
  }, [selectedJob]);

  return (
    <>
      <PhotoPreview photo={previewPhoto} showPreview={showPreview} hidePreview={hidePreview} />
      <Modal show={isOpen} onHide={hideModel}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>View Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="titleEdited">
              <Form.Label>Title : &nbsp;</Form.Label>
              {title} 
            </Form.Group>
            <Form.Group className="mb-3" controlId="brandEdited">
              <Form.Label>Brand : &nbsp;</Form.Label>
              {brand} 
            </Form.Group>
            <Form.Group className="mb-3" controlId="modelEdited">
              <Form.Label>Model : &nbsp;</Form.Label>
              {model}
            </Form.Group>
            <Form.Group className="mb-3" controlId="yearEdited">
              <Form.Label>Year : &nbsp;</Form.Label>
              {year} 
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceEdited">
              <Form.Label>Price : &nbsp;</Form.Label>
              {price}
            </Form.Group>
            {/* <div className="m-3">
              <label className="mx-3">Choose file: </label>
              <input ref={inputRef} className="d-none" type="file" />
              <button onClick={handleUpload} className="btn btn-outline-primary">
                Upload
              </button>
            </div> */}
            {/* {photoList ? <Image
              src={photoList[0]?.base64String} style="width:50px;height:50px;"
              thumbnail
            /> : null} */}
            <div className="table-horiz-scroll">
              <table>
                {photoList ?
                  photoList.map((photo) => (
                    <th key={photo?.base64String}>
                      <Image style={{ width: '150', height: 'auto' }} onClick={() => { setShowPreview(true); setPreviewPhoto(photo); console.log("aaaaaaaaaa") }}
                        key={photo?.base64String}
                        src={photo?.base64String}
                        thumbnail
                      />
                    </th>
                  )) : null}
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ViewMarker;