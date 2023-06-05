import { Routes, Route } from 'react-router-dom'

import User from "./pages/User";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';


function App() {

  return (



    <>
      <Routes>
        <Route path='/*' element={<User />} />
        <Route path='/user/*' element={<User />} />

      </Routes>
    </>
  );
}

export default App;
