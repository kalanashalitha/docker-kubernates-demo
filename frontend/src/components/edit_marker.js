import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import FormControl from 'react-bootstrap/Form'
//import { useState } from 'react';

const EditMarker = ({ loadJobs, isOpen, setHide, selectedJob, setSelectedJob, setSelectedPlace }) => {

    const [title, setTitle] = useState(selectedJob?.title);

    const handleChange = (e) => {
      const title = e.target.value;
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

    const hideModel = () => {
      setHide();
    };

    const save = async () => {
      try {
        console.log("selectedJob", selectedJob);
        const response = await axios.put('http://localhost:8080/api/job/save-job', selectedJob);
        console.log(response);
        if(201 == response.status || 204 == response.status) {
          setSelectedPlace(selectedJob.title);
          hideModel();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const deleteJob = async () => {
      try {
        console.log("selectedJob", selectedJob);
        const response = await axios.delete('http://localhost:8080/api/job/delete-job', { data: selectedJob } );
        console.log(response);
        if(200 == response.status) {
          hideModel();
          loadJobs();
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      setTitle(selectedJob?.title);
    }, [selectedJob]);
  
    return (
      <>
        <Modal show={isOpen} onHide={hideModel}>
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
            <Button variant="secondary" onClick={hideModel}>
              Close
            </Button>
            <Button variant="primary" onClick={save}>
              Save Vehicle
            </Button>
            <Button variant="danger" onClick={deleteJob}>Delete Vehicle</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
};

export default EditMarker;