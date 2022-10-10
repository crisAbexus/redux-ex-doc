import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "../users/usersSlice";
import { selectAllPosts } from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector(state => selectUserById(state, userId))
  console.log(`🙏%cUserPage.jsx:12 - user`, 'font-weight:bold; background:#3cc300;color:#fff;'); //DELETEME
  console.log(user); // DELETEME

  const postsForUser = useSelector(state => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.user === userId);
  })

  const postTitles = postsForUser.map((post) => {
    return (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    )
  })
  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
