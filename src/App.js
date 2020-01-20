import React from 'react';
import Schedule from './game-list/Schedule.js';
import GameDashboard from './GameDashboard.js';
// import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Schedule} />
          <Route path='/game/:id' component={GameDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
