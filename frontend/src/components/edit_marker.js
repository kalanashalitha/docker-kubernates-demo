import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
//import { useState } from 'react';

const EditMarker = ({ isOpen, setOpen, selectedJob }) => {
    //const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
  
    return (
      <>
        <Modal show={isOpen} onHide={setOpen}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedJob?selectedJob.title:''}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default EditMarker;