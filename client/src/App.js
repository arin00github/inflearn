
import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import LandingPage from './component/LandingPage/LandingPage'
import LoginPage from './component/LoginPage/LoginPage'
import RegisterPage from './component/RegisterPage/RegisterPage';
import UserPage from './component/UserPage/UserPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/user" component={UserPage}/>
      </Switch>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
