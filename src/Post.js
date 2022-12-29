import React from 'react';
import {useParams, Link} from 'react-router-dom';

const Post = (props) => {
    const posts = props.posts;
    const params = useParams();
    const id = params._id;
    const post = posts.find(post => post._id === id);
    if (!post){
      return null;
    }
    return (
      <div> 
        <h1><Link to='/posts'>  {post.title} </Link></h1>
        <p> Description: {post.description} </p>
        <p> Price = {post.price} </p>
        <p> Location = {post.location} </p>
        <p> Will Deliver: {post.willDeliver} </p>
      </div>
    )
  }

  export default Post