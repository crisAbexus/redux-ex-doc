import { createSlice, createAsyncThunk, createEntityAdapter, } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { apiSlice } from "../api/apiSlice";
import { forceGenerateNotifications } from "../../api/server";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a?.date),
})

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    try {
      const response = await client.get(
        `/fakeApi/notifications?since=${latestTimestamp}`
      )
      return response.data;

    } catch (error) {
    }
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    allNotificationsRead: (state, action) => {
      Object.values(state.entities).forEach(notification => {
        notification.read = true
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read;
      })
    });
  },
});

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return ({
      getNotifications: builder.query({
        query: () => '/notifications',
        async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
          // create a WebSocket connection when the cache subscription starts
          const ws = new WebSocket('ws://localhost');
          try {
            // wait for the initial query to resolve before proceeding
            await cacheDataLoaded
            // when data is received from the socket connection to the server, update our query result with the received message
            const listener = (event) => {
              const message = JSON.parse(event.data);
              switch (message.type) {
                case 'notifications': {
                  updateCachedData(draft => {
                    // Insert all received notifications from the websocket into the existing RTKQ cache array
                    draft.push(...message.payload);
                    draft.sort((a, b) => {
                      return b.date.localeCompare(a.date);
                    })
                  })
                  break
                }
                default:
                  break
              }
              ws.addEventListener('message', listener);
            }
          } catch {

          }
          await cacheEntryRemoved;
          ws.close();
        }
      })
    })
  }
})

export const { useGetNotificationsQuery } = extendedApi;
const emptyNotifications = [];
export const selectNotificationsResult = extendedApi.endpoints.getNotifications.select();

const selectNotificationsData = createSelector(
  selectNotificationsResult,
  (notificationsResult) => {
    return (notificationsResult.data ?? emptyNotifications);
  }
)

export const fetchNotificationsWebsocket = () => {
  return (dispatch, getState) => {
    const allNotifications = selectNotificationsData(getState());
    const [latestNotification] = allNotifications
    const latestTimestamp = latesNotification?.date ?? "";
    // Hardcode a call to the mock server to simulate a server push scenario over websockets
    forceGenerateNotifications(latestTimestamp);
  }
}

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors((state) => {
  return state.notifications;
})
