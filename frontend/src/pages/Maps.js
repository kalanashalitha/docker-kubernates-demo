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
  console.log("user", user);
  const [jobs, setJobs] = useState([]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  //const [id] = useState(_uniqueId('prefix-'));

  const onClick = (t, map, coord) => {
    console.log("user id", user.userId);
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setJobs((previousState) => {
      return [
        ...previousState,
        {
          id: null,
          title: 'new plumbing job',
          description: 'desc',
          userId: user.userId,
          marker: {
            title: 'kalana',
            name: 'shalitha',
            position: { lat, lng },
          },
        },
      ];
    });
  };

  const saveJobs = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/job/save-jobs', jobs);
      console.log(response.data);
    } catch (error) {
      // error
    }
  };

  const onMarkerClick = (props, marker) => {
    console.log("selected marker", marker);
    console.log("this.jobs.", jobs);
    let selectedJob = jobs.find(obj => obj.id === marker.name);
    console.log("selected job", selectedJob);
    setSelectedJob(selectedJob);
    setSelectedPlace(selectedJob.title);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    
  };

  // const onJobClick = ({ job }) => {
  //   console.log("selected job", job);

  // };

  const loadJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/job/all-jobs');
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
      <EditMarker isOpen={showEditPopup} setOpen={() => setShowEditPopup(false)} selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
      <h2>Click on the map to add a new vehicle listing</h2>
      <Button onClick={saveJobs}> Save Jobs </Button> &nbsp; <Button onClick={() => setShowEditPopup(true)}> Edit Listing </Button> <br />
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
