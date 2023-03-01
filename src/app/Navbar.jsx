import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchNotificationsWebsocket, selectNotificationsMetada, useGetNotificationsQuery } from "../features/notifications/notificationsSlice";

export const Navbar = () => {
  const dispatch = useDispatch()
  useGetNotificationsQuery();
  const notificationsMetada = useSelector(selectNotificationsMetada);
  const numUnreadNotifications = notificationsMetada.filter((n) => {
    n => !n.read;
  }).length

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket);
  }
  let unreadNotificxationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificxationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    )
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/"> + Add Post</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificxationsBadge}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
