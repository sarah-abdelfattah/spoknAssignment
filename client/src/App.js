
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import the styles
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/styles";

//Import the pages/components
import Homepage from "./Pages/Homepage";

function App() {
  // eslint-disable-next-line
  var currentLocation = window.location.pathname;
  // eslint-disable-next-line
  var t = (document.title = 'Spokn');
  //  6 9 3 12

  return (
    <div className='App'>
      <div className='elements'>
        <Router>
          <Switch>
            <Route exact path='/home' render={(props) => <Homepage {...props} />} />
            <Route exact path='/' render={(props) => <Homepage {...props} />} />

            {/* {/* <Route exact path='/post:id' render={(props) => <Post {...props} />} />/*} */}

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
