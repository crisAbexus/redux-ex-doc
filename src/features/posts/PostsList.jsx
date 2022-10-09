import React, { useEffect } from "react";
import { PostAuthor } from "./PostAuthor";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectAllPosts, fetchPosts } from "./postsSlice";

export const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const postStatus = useSelector((state) => {
    return state.posts.status
  })

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

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
