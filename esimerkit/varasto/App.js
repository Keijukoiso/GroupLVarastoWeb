import './App.css';

import Header from './components/Header';
import Hakusivu from './components/Hakusivu';
//import Haku from './components/Haku';<Route exact path="/haku"><Haku /></Route>

import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// npm install -S react-router-dom

function App() {
  return (
    <div className="App">
         <Router>
          <Header /> 
        <Switch>
          <Route exact path="/haku"><Hakusivu /></Route>
        </Switch>
      </Router>
	</div>
);
}



export default App;
