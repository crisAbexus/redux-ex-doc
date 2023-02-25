import React, { useEffect } from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectAllPosts, fetchPosts, selectPostIds, selectPostById, } from "./postsSlice";
import { Spinner } from '../../components/Spinner'
import { useGetPostsQuery } from '../api/apiSlice'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id} >
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
PostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery();

  let content;

  if (isLoading) {
    content = <Spinner text='Loading...' />
  } else if (isSuccess) {
    content = posts.map((post) => {
      return (
        <PostExcerpt key={post.id} post={post} />
      )
    })
  } else if (isError) {
    content = (<div>{error?.toString()}</div>)
  }

  return (
    <section className="posts-list">
      <h2>Post</h2>
      {content}
    </section>
  )
}

