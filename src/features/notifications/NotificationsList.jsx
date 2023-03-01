import React from "react";
import { useGetNotificationsQuery, allNotificationsRead, selectMetadataEntities } from "./notificationsSlice";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";
import classnames from "classnames";

import { selectAllUsers } from "../users/usersSlice";


export const NotidicationsList = () => {
  const dispatch = useDispatch();
  const { data: notifications = [] } = useGetNotificationsQuery();
  const notificationsMetadata = useSelector(selectMetadataEntities);
  const users = useSelector(selectAllUsers);

  const renderedNotifications = notifications.map(notification => {
    const date = parseISO(notification.date);
    const timeAgo = formatDistanceToNow(date);
    const user = users.find(user => user.id === notification.user) || {
      name: 'Unkown User'
    }
    const metadata = notificationsMetadata[notification.id];
    const notificationClassname = classnames('notificaton', {
      new: notification.isNew,
    })
    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {` ${notification.message}`}
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
