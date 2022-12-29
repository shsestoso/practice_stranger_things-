import React from 'react';
import {useLocation, Link } from 'react-router-dom';


const Nav = (props) => {
    const posts = props.posts
    const location = useLocation();
    const pathname= location.pathname
    return (
      <nav>
          <Link to='/' className= {pathname === '/' ? 'selected' : ''} >Home</Link>
          <Link to='/posts'className = {pathname.startsWith('/posts')? 'selected' : ''}> Posts ({ posts.length})</Link>
        </nav>
    )
  }

  export default Nav;
