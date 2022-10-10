import React from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import { selectAllUsers } from "../users/usersSlice";

import { selectAllNotifications, fetchNotifications } from "./notificationsSlice";

export const NotidicationsList = () => {
  const notifications = useSelector(selectAllNotifications);
  console.log(`🌿%cNotificationsList.jsx:11 - notifications`, 'font-weight:bold; background:#38c700;color:#fff;'); //DELETEME
  console.log(notifications); // DELETEME
  const users = useSelector(selectAllUsers);

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unkown User'
    }
    return (
      <div key={notification.id} className="notificaton">
        <div>
          <b>{user.name}</b>{notification.message}
        </div>
        <div title={notification.data}>
          <i>{timeAgo}</i>
        </div>
      </div>
    )
  })
  return (
    <section className="NotidicationsList">
      <h2>notifications</h2>
      {renderedNotifications}
    </section>
  )
}
