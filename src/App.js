import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from './component/Home';
import CreatePost from './component/CreatePost';
import Login from './component/Login';
import Logout from './component/Logout';
import Navbar from './component/Navbar';
import Moretext from './component/Moretext';
import ImagePost from './component/ImagePost';
import Test from './component/Test';
import { useState } from 'react';

function App() {
const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <Navbar isAuth={isAuth}/>
      <Routes>
        <Route path ="/" element={<Home />} ></Route>
        <Route path ="/createpost" element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path ="/login" element={<Login setIsAuth={setIsAuth}/>} ></Route>
        <Route path ="/logout" element={<Logout setIsAuth={setIsAuth}/>} ></Route>
        <Route path="/motetext/:postId" element={<Moretext />} ></Route>
        <Route path="/imgpost" element={<ImagePost setIsAuth={isAuth}/>} ></Route>
        <Route path="/test" element={<Test/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
