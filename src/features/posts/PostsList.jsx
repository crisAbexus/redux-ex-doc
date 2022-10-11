import React, { useEffect } from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactionButtons } from "./ReactionButtons";
import { selectAllPosts, fetchPosts, selectPostIds, selectPostById, } from "./postsSlice";
import { Spinner } from '../../components/Spinner'

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => {
    const selectedPost = selectPostById(state, postId);
    return selectedPost;
  })
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
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const orderedPostIds = useSelector(selectPostIds);
  const postStatus = useSelector((state) => {
    return state.posts.status
  })
  const error = useSelector((state) => {
    return state.posts.error;
  })

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  let content;

  if (postStatus === 'loading') {
    content = <Spinner text='Loading...' />
  } else if (postStatus === 'succeeded') {
    // sort posts in reverse chronological order by datetme string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPostIds.map((postId) => {
      return (
        <PostExcerpt key={postId} postId={postId} />
      )
    })
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Post</h2>
      {content}
    </section>
  )
}

