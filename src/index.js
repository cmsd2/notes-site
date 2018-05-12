import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';
import config from './config';

Amplify.configure({
    Auth: config.auth
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
