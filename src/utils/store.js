/* Generic action creator */

export const createAction = (type) => {
  return (objsToSend = {}) => ({
    type,
    ...objsToSend
  })
}
