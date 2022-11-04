import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Post from './components/post/Post';
import Edit from './components/post/Edit';
import Create from './components/post/Create';


function App(): JSX.Element {
  return (
   <div className="App">
    <Navbar/>
    <div className={'container'}>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/post/:postId"} element={<Post/>}/>
        <Route path={'/edit/:postId'} element={<Edit/>}/>
        <Route path={'/create'} element={<Create/>}/>
      </Routes>
    </div>
   </div>
  );
}

export default App;
