import io from 'socket.io-client'
import { useEffect, useState } from 'react';
//const socket = io.connect("http://localhost:3001");

const Chat = () => {

//     const [message, setMessage] = useState("");
//     const [messageReceived, setMessageReceived] = useState("");

//     const sendMessage = () => {
//      //   console.log("button pressed");
//         socket.emit("send_message", { message });

//     };

//     useEffect(() => {
//         socket.on("receive_message", (data) => {
//             setMessageReceived(data.message);
//         })
//     }, [socket])

    
//     return (<div className="chatpage">

//         <input placeholder="message" onChange={(event) => {
//             setMessage(event.target.value);
//         }} />
//         <button onClick={sendMessage}> send</button>
//         <h1>Message:</h1>
//         {messageReceived}
//     </div>);
// };
};





export default Chat;    