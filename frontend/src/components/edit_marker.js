import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
//import FormControl from 'react-bootstrap/Form'
//import { useState } from 'react';

const EditMarker = ({ isOpen, setOpen, selectedJob }) => {
    console.log("isOpen", isOpen);
    //const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    console.log("selectedJob", selectedJob);

    const handleChange = () => {

    };
  
    return (
      <>
        <Modal show={isOpen} onHide={setOpen}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <input value={(null !== selectedJob)?selectedJob.title:""} type="text" onChange={handleChange} />
            </div>
            {/* {selectedJob?selectedJob.title:''} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={setOpen}>
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