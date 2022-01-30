import React, { useEffect, useState } from 'react';
import axios from 'axios';
import retry from 'async-retry';

const ChatForm = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');

  const subscribe = async () => {
    try {
        const { data } = await axios.get('http://localhost:8080/get-messages')
        setMessages(prev => [data, ...prev])
        await subscribe()
    } catch (e) {
      await retry(
        setTimeout(() => {
          subscribe()
      }, 500),
      { retries: 5 }
      );       
    }
  };


  useEffect(() => {
    subscribe();
  }, []);

  const sendMessage = async () => {
      await axios.post('http://localhost:8080/new-messages', {
          message: value,
      })
  }

  return (
    <React.Fragment>
      <div className='chat-form'>
        <input type='text' value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={sendMessage}>Send message</button>
      </div>
      <ul>
        {messages.map((message, id) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
    </React.Fragment>    
  );
};

export default ChatForm;
