import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { selectPostById } from "./postsSlice";

import { Spinner } from '../../components/Spinner';
import { useGetPostQuery } from '../api/apiSlice';

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
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
    );
  }

}
