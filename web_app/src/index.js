import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';


import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
// import Provider from './components/store/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider> */}
    <Router>
      <App />
    </Router>

    {/* </Provider> */}
  </React.StrictMode>

);
