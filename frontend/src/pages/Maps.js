import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EditMarker from '../components/edit_marker';
import UserContext from '../components/UserContext';
import { useContext } from 'react';
//import _uniqueId from 'lodash/uniqueId';

const mapStyles = {
  width: '100%',
  height: '80%',
};

const Maps = (props) => {

  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userOwn, setUserOwn] = useState(false);
  //const [id] = useState(_uniqueId('prefix-'));

  const onClick = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setJobs((previousState) => {
      return [
        ...previousState,
        {
          id: null,
          userId: user.userId,
          title: 'new title',
          description: '',
          type: 'VEHICLE',
          vehicleInfo: {
            brand: '',
            model: '',
            year: '',
            price: '',
            transmission: ''
          },
          marker: {
            title: '',
            name: '',
            position: { lat, lng },
          },
        },
      ];
    });
  };

  /*const saveJobs = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/job/save-vehicles', jobs);
      console.log(response.data);
    } catch (error) {
      // error
    }
  };*/

  const onMarkerClick = (props, marker) => {
    let selectedJob = jobs.find(obj => obj.id === marker.name);
    console.log("selected job", selectedJob);
    setSelectedJob(selectedJob);
    setSelectedPlace(selectedJob.title);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    if(user.userId === selectedJob.userId) {
      console.log("user own1", userOwn);
      setUserOwn(true);
    } else {
      console.log("user own2", userOwn);
      setUserOwn(false);
    }
    console.log("user own", userOwn);
  };

  // const onJobClick = ({ job }) => {
  //   console.log("selected job", job);

  // };

  const loadJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/job/all-vehicles');
      setJobs(response.data);
    } catch {
      // error
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <>
      <EditMarker loadJobs={loadJobs} isOpen={showEditPopup} setHide={() => setShowEditPopup(false)} selectedJob={selectedJob} setSelectedJob={setSelectedJob} setSelectedPlace={setSelectedPlace} />
      <h2>Click on the map to add a new vehicle listing</h2>
      { userOwn ? <Button onClick={() => setShowEditPopup(true)}> Edit Listing </Button>: null }
      {/* <Button onClick={saveJobs}> Save Jobs </Button> &nbsp;*/} 
      <div
        style={{
          height: 350,
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          padding: 0
        }}
        className="mt-3"
      >
        <Map
          google={props.google}
          zoom={14}
          style={mapStyles}
          onClick={onClick}
          containerStyle={{
            width: '100%',
            marginLeft: 0
          }}
        >
          {jobs.length > 0 &&
            jobs.map((job) => (
              <Marker
                key={null}
                title={job.title}
                name={job.id}
                position={job.marker.position}
                onClick={onMarkerClick}
              />
            ))}
          {activeMarker ? (
            <InfoWindow
              marker={activeMarker}
              visible={showingInfoWindow}
            >
              <div>
                <h1>{selectedPlace}</h1>
              </div>
            </InfoWindow>
          ) : null}
        </Map>
      </div>
    </>
  );
};

//render(<Example />);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBfwyysUDXs-L80ctr-unjO4u8jUXHJwu4',
})(Maps);
