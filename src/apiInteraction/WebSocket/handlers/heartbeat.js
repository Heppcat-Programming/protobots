/**
 * Start the heartbeat
 * @param {WebSocket} socket The websocket
 * @param {Integer} heartbeatInterval The heartbeat interval
 *
 */
function start(socket, heartbeatInterval) {
  setTimeout(() => {
    socket.send(
      JSON.stringify({
        op: 1,
        d: socket.s,
      })
    );
    if (socket.heartbeat) start(socket, heartbeatInterval);
  }, heartbeatInterval);
}

/**
 * Stop the heartbeat
 * @param {WebSocket} socket
 */
function stop(socket) {
  socket.heartbeat = false;
}

module.exports = { start, stop };
