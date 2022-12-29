import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route,} from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';
import Login from './Login';
import Register from './Register';




const App = ()=> {
  const [posts, setPosts] = useState ([]);
  const [user, setUser] = useState({});
  
  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    if (token){
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
      })
        .then(response => response.json())
        .then(result => {
          const user = result.data;
          setUser(user);
    })
        .catch(err => console.log(err));
  
  }
  }

useEffect (()=> {
  exchangeTokenForUser()
}, [])

  useEffect(() => {
    fetch ('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts')
      .then (response => response.json())
      .then (json => setPosts(json.data.posts))
    }, [])

  const logout = () => {
    window.localStorage.removeItem('token')
    setUser({});
  }
  return (
    <div>
      <h1>Stranger Things </h1>
      {
        user._id ? <div> Welcome {user.username} <button onClick = {logout }> Logout</button></div> : null
      }
      {
        !user._id ? (
      <div> 
          < Register />
          <Login exchangeTokenForUser = { exchangeTokenForUser} />
      </div>) : null
    }
      
      <Routes> 
        <Route 
        path= '/*'
        element = {  
          <Nav posts = {posts} />
        }
        />
        </Routes>
      <Routes>
        <Route path='/' element= { <div>Home</div>} />
        <Route path= '/posts' element ={
          <Posts posts = {posts} />
        }/>
        <Route path= '/posts/:_id' element = {
          <Post posts= {posts} />
        }/>
      </Routes> 
    </div>

  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
