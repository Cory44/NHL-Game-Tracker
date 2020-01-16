import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GameList from './game-list/GameList';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    //<App />,
    <GameList />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
