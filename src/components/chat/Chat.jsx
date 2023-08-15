import React, { useEffect, useState } from "react";
import { user } from "../join/Join";
import socketIO, { Socket } from "socket.io-client";
import "./chat.css";
import sendlogo from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png";
import Message from "../message/Message";
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = "https://ichat-six.vercel.app/";
let socket;

const Chat = () => {

  const [messages, setMessages] = useState([]);
  const [id, setid] = useState('');

  const send = () =>{
    const message = document.getElementById('chatInput').value;
    socket.emit('message', {message,id});
    document.getElementById('chatInput').value = "";
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connected");
      setid(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("Welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("user Joined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);

    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);

    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
        setMessages([...messages, data]);
        console.log(data.user, data.message, data.id);
    })
    return () => {
        socket.off();
    }
}, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>i Chat</h2>
          <a href="/">
          <img src={closeIcon} alt="closeIcon" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
        {
          messages.map((item, i)=>(
            <Message message={item.message} user={item.id===id?'':item.user} classs={item.id===id?'right':'left'}/>
          ))
        }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input type="text" onKeyPress={(event) => event.key === 'Enter' ? send() : null} id="chatInput" placeholder="type message here..." autoFocus />
          <button className="sendBtn" onClick={send}>
            <img src={sendlogo} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
