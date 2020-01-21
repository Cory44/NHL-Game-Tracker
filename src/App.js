import React from 'react';
import Schedule from './game-list/Schedule.js';
import GameDashboard from './game-dashboard/GameDashboard.js';
// import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Schedule} />
        <Route path='/game/:id' component={GameDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
