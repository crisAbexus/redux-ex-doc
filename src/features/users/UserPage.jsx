import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUserById } from "../users/usersSlice";
import { useGetPostsQuery } from "../api/apiSlice"
import { selectAllPosts, selectPostByUser } from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const user = useSelector(state => selectUserById(state, userId))

  const selectPostsForUser = (useMemo) => {
    return useMemo(() => {
      const emptyArray = [];
      return createSelector(
        (res) => {
          return res.data;
        },
        (res, userId) => {
          return userId;
        },
        (data, userId) => {
          const data_filtered_by_id = data?.filter((post) => {
            return post.user === userId;
          })
          return data_filtered_by_id ?? emptyArray;
        }
      )
    }, [])
  }
  const postsForUser = useGetPostsQuery(undefined, {
    selectFromResult: (result) => {
      return ({
        ...result,
        postsForUser: selectPostsForUser(result, userId),
      })
    }
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
};
