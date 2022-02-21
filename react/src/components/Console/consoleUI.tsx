/*
 * @author: Archy
 * @Date: 2022-02-21 16:59:33
 * @LastEditors: Archy
 * @LastEditTime: 2022-02-21 17:20:11
 * @FilePath: \arkgen\react\src\components\Console\consoleUI.tsx
 * @description: 
 */
import React, { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

const ConsoleUI: React.FC = () => {
  const messageHistory = useRef<any[]>([]);

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    'ws://localhost:4001',
  );

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(latestMessage),
    [latestMessage],
  );

  return (
    <div>
      {/* send message */}
      <button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ✉️ send
      </button>
      {/* disconnect */}
      <button
        onClick={() => disconnect && disconnect()}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ❌ disconnect
      </button>
      {/* connect */}
      <button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
        {readyState === ReadyState.Connecting ? 'connecting' : '📞 connect'}
      </button>
      <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index}>{message?.data}</p>
        ))}
      </div>
    </div>
  );
}

export default ConsoleUI