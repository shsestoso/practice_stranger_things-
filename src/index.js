import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route,} from 'react-router-dom';
import Posts from './Posts';
import Post from './Post';
import Nav from './Nav';
import Login from './Login';




const App = ()=> {
  const [posts, setPosts] = useState ([]);
  const[registerUsername, setRegisterUsername] = useState ('');
  const [registerPassword, setRegisterPassword] = useState ('');
  const[loginUsername, setLoginUsername] = useState ('');
  const [loginPassword, setLoginPassword] = useState ('');
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

  
  const register = (ev) => {
    ev.preventDefault();
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/register', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
       },
         body: JSON.stringify({
          user: {
            username: registerUsername,
            password: registerPassword
          }
        })
      })
         .then(response => response.json())
          .then(result => {
            if (!result.success){
              throw result.error;
            }
            console.log(result);
        })
          .catch(err => console.log(err));
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
      <form onSubmit = { register }> 
          <input 
            placeholder = 'username' 
            value= {registerUsername} 
            onChange = {ev => setRegisterUsername(ev.target.value)}/>
          
          <input 
            placeholder = 'password'
            value= {registerPassword} 
            onChange = {ev => setRegisterPassword(ev.target.value)}/>
          <button> Register </button>
      </form>
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
