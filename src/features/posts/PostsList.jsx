import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { ReactionButtons } from "./ReactionButtons";
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
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetPostsQuery();
  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a, b) => {
      return (b.date.localeCompare(a.date))
    })
    return sortedPosts
  }, [posts])

  let content;

  if (isLoading) {
    content = <Spinner text='Loading...' />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => {
      return (
        <PostExcerpt key={post.id} post={post} />
      )
    })
    const containerClassname = classnames(`posts-container`, {
      disabled: isFetching,
    })
    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = (<div>{error?.toString()}</div>)
  }

  return (
    <section className="posts-list">
      <h2>Post</h2>
      <button onClick={refetch} >Refetch Posts</button>
      {content}
    </section>
  )
}

