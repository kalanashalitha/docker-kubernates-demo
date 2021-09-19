import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import UserContext from './components/UserContext';
import Maps from './pages/Maps';
// import UnProtectedRoute from './components/UnProtectedRoute';

const App = () => {
  const [user, setUser] = useState({});

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

  return(
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Layout>
            <Switch>
                
              <Route path="/login" exact>
                <Login/>
              </Route>

              <Route path="/signup">
                <Signup />
              </Route>
              
              <ProtectedRoute>
                <Route path="/" exact>
                  <Home/>
                </Route>

                <Route path="/jobs">
                  <Jobs/>
                </Route>

                <Route path="/map">
                  <Maps />
                </Route>
              </ProtectedRoute>
            </Switch>
          </Layout>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
    );
};

export default App;
