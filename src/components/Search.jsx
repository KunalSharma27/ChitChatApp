import React, { useContext, useState } from 'react';
import { collection, query, where, getDoc, setDoc, doc, updateDoc, serverTimestamp, getDocs } from "firebase/firestore";
import {db} from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Search = () => {
  const [userName, setUsername]= useState('');
  const [user, setUser]= useState(null);
  const [err, setErr]= useState(false);
  const {currentUser}= useContext(AuthContext)
  const handleSearch = async() => {
    const q = query(collection(db , 'users') , where("displayName", "==", userName));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
  });
    } catch(err){
      console.log(err);
      setErr(true);
    }
   
  };
  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect= async() =>{
    // check whether the group(chats in firebase) exists, if not then creat new
    const combinedId= currentUser.uid > user.uid
     ? currentUser.uid + user.uid 
     : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db, 'chats', combinedId ));
      if(!res.exists()){
        // create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId),{messages:[]});
        //create user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid),{
          [combinedId+'.userInfo']:{
            displayName:user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        });
        await updateDoc(doc(db, 'userChats', user.uid),{
          [combinedId+'.userInfo']:{
            displayName:currentUser.displayName,
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp()
        });
      }
    } catch(err){
      
    }
    setUser(null);
    setUsername('');

    
  };
  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e=> setUsername (e.target.value)} value={userName} />
      </div>
      {err && <span>User Not Found!</span>}
      {user &&  <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="chatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  );
};

export default Search