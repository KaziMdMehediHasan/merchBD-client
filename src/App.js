import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Register from './components/Login/Register';
import Homepage from './components/Homepage/Homepage';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import PrivateRoute from './components/Login/PrivateRoute/PrivateRoute';
import UserList from './components/UserList/UserList';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/home'>
          <Homepage />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <PrivateRoute path='/userlist'>
          <UserList/>
        </PrivateRoute>
      </Switch>
    </Router>
    </AuthProvider>
  );
}

export default App;
