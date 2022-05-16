import UserContext from '../components/UserContext';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Profile = () => {

  const { setUser, user } = useContext(UserContext);
  const [setShowEditPopup, showEditPopup] = useState(false);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(window.localStorage.getItem('user'));
      if (userInfo.name) {
        setUser(userInfo);
      }
    } catch {
      setUser({});
    }
  }, []);

  return (
    <div>
      <div>
        Name : {user.name}<br />
        Email : {user.email}<br />
        Road : {user.road}<br />
        City : {user.city}<br />
        Country : {user.country}<br />
        Contact No : {user.contactNo}
      </div>
      <br /><br />
      <div hidden={showEditPopup}></div>
      <Button onClick={() => setShowEditPopup(true)}> Edit </Button>
    </div>

  );
};

export default Profile;