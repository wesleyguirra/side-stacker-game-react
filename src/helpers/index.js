/**
 *
 * @param socketId
 * @param room
 * @return {null|number}
 */
export const getPlayerNumber = (socketId, room) => {
  switch (socketId) {
    case room?.player1:
      return 1
    case room?.player2:
      return 2
    default:
      return null
  }
}