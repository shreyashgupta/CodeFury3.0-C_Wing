import React, { useRef, useState } from 'react';
import './chat.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// firebase.initializeApp({
//     apiKey: "AIzaSyC3xqRquN6dAaL_JuvfkwoAQ51KUTvZRkE",
//     authDomain: "chattt-c696f.firebaseapp.com",
//     databaseURL: "https://chattt-c696f.firebaseio.com",
//     projectId: "chattt-c696f",
//     storageBucket: "chattt-c696f.appspot.com",
//     messagingSenderId: "1014679269658",
//     appId: "1:1014679269658:web:1812de7743536f76e4bca3",
//     measurementId: "G-1ZTMYVCLGF"
// })

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function Chat() {

  const [user] = useAuthState(auth);

  return (
    <div className="App1">
      <header>
        <h1>OP CHAT</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in button1" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out button1" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form className="form1" onSubmit={sendMessage}>

      <input className="input1" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button className="button1" type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img className="imgC" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className="pi">{text}</p>
    </div>
  </>)
}


export default Chat;