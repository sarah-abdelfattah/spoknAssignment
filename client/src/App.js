
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import the styles
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Styles/Homepage.scss";
import "./Styles/PostPage.scss";

//Import the pages/components
import Homepage from "./Pages/Homepage";
import PostPage from "./Pages/PostPage";

function App() {
  // eslint-disable-next-line
  var currentLocation = window.location.pathname;
  // eslint-disable-next-line
  var t = (document.title = 'Spokn');


  return (
    <div className='App'>
      <div className='elements'>
        <Router>
          <Switch>
            <Route exact path='/home' render={(props) => <Homepage {...props} />} />
            <Route exact path='/:id' render={(props) => <PostPage {...props} />} />
            <Route path='/' render={(props) => <Homepage {...props} />} />

            {/* {/* <Route exact path='/post:id' render={(props) => <Post {...props} />} />/*} */}

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
