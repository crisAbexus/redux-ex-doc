import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./postsSlice";

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector(state => {
    return selectPostById(state, postId);
  })


  return (
    <section>
      <article>
        {(post) ? (
          <>
            <h2>{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <ReactionButtons post={post} />
            <Link to={`/editPost/${post.id}`} className="button">
              Edit Post
            </Link>
            <PostAuthor userId={post.user} />
          </>
        ) : <h2>Post not found!</h2>}
      </article>
    </section>
  )
}
