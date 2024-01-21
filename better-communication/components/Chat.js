import { useState, useEffect} from "react";
import {addDoc, collection, serverTimestamp,onSnapshot, query, where, orderBy} from 'firebase/firestore'
import {db, auth} from '../firebase'
const Chat = (prop) => {
  const {room} = prop;
  const [newMessage, setNewMessage] = useState();
  const messagesRef = collection(db, 'messages');
  const [messages, setMessage] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(newMessage === "") return;
    await addDoc(messagesRef,{
      user: auth.currentUser.displayName,
      text: newMessage,
      created: serverTimestamp(),
      room,
    })
    setNewMessage("");
  }

  useEffect(() => {
    const queryMessage = query(messagesRef, where("room", "==", room), orderBy("created"));
    const unsubscribe = onSnapshot(queryMessage,(snapshot)=>{
      let messages = [];
      snapshot.forEach((doc) => {
        //pulls data from document and sets obj of data to the doc + new id field
        messages.push({...doc.data(), id: doc.id})
      })
      setMessage(messages);
    })
    return () => unsubscribe();
  }, []);
  console.log(messages)
    return(
        <div className="chat">
          <div><h1>welcome to room {prop.room}</h1></div>
          <div className="chatDisplay">
            {(messages.length === 0)? 
            <div>
              <h2>Loading..</h2>
            </div>:
            messages.map((messages) => 
            (messages.user === auth.currentUser.displayName)?
            <h3 style={{textAlign:'left'}} key={messages.id}>{messages.user}: {messages.text}</h3>:
            <h3 style={{textAlign:'right'}}  key={messages.id}>{messages.user}: {messages.text}</h3>
            )}
          </div>
          <form className="sendMsg" onSubmit={handleSubmit}>
            <input style={{width:"800px", height:'25px', fontSize: '17px'}} onChange={(e) => setNewMessage(e.currentTarget.value)} placeholder="Type message" value={newMessage}/>
            <button style={{padding:'5px'}} type="submit">send</button>
          </form>
        </div>
    )
}

export default Chat;