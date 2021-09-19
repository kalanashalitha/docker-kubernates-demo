import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from './UserContext';

const UnProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user.name) {
    return <Redirect to="/" />;
   }
  return children;
};
 
export default UnProtectedRoute;