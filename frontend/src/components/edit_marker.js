import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import FormControl from 'react-bootstrap/Form'
//import { useState } from 'react';

const EditMarker = ({ isOpen, setOpen, selectedJob, setSelectedJob }) => {
    console.log("isOpen", isOpen);
    //const [show, setShow] = useState(false);
    //const handleShow = () => setShow(true);
    const [title, setTitle] = useState(selectedJob?.title);
    console.log("selectedJob", selectedJob);

    const handleChange = (e) => {
      const title = e.target.value;
      console.log("title", title);
      setTitle(title);
      let save = {
        id: selectedJob.id,
        title: title,
        description: selectedJob.description,
        userId: selectedJob.userId,
        marker: selectedJob.marker
      };
      setSelectedJob(save);
    };

    const save = async () => {
      console.log("selectedJob", selectedJob);
      try {
        console.log("selectedJob", selectedJob);
        const response = await axios.put('http://localhost:8080/api/job/save-job', selectedJob);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      setTitle(selectedJob?.title);
    }, [selectedJob]);
  
    return (
      <>
        <Modal show={isOpen} onHide={setOpen}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Listing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Title : <input value={title} type="text" onChange={handleChange} />
            </div>
            {/* {selectedJob?selectedJob.title:''} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={setOpen}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default EditMarker;