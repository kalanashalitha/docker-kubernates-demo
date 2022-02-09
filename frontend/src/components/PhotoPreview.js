import Modal from 'react-bootstrap/Modal'
import { Image } from 'react-bootstrap';
import { useEffect } from 'react';

const PhotoPreview = ({ photo, showPreview, hidePreview }) => {

  useEffect(() => {
    console.log("showPreview", showPreview);
  }, [photo]);
  return (
    <>
      <Modal show={showPreview} onHide={hidePreview} aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Preview</Modal.Title> */}
        </Modal.Header>
        <Image
          key={photo?.base64String}
          src={photo?.base64String}
          thumbnail
        />
      </Modal>
    </>
  );
};

export default PhotoPreview;