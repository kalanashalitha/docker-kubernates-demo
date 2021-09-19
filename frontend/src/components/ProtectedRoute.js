import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from './UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user.name) {
    return <Redirect to="/login" />;
   }
  return children;
};
 
export default ProtectedRoute;