import React from "react";
import { PostAuthor } from "./PostAuthor";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectAllPosts } from "./postsSlice";

export const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  console.log(`🔽%cPostsList.jsx:10 - selectAllPosts`, 'font-weight:bold; background:#34cb00;color:#fff;'); //DELETEME
  console.log(selectAllPosts); // DELETEME
  console.log(`🎈%cPostsList.jsx:12 - posts`, 'font-weight:bold; background:#3cc300;color:#fff;'); //DELETEME
  console.log(posts); // DELETEME
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id} >
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
        <PostAuthor userId={post.user} />
      </article>
    )
  })
  return (
    <section className="posts-list">
      <h2>Post</h2>
      {renderedPosts}
    </section>
  )
}
