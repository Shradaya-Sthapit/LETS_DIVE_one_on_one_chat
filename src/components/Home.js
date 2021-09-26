import React,{useState} from 'react';
import  NavBar  from './NavBar'
import { useEffect } from 'react';
import { db } from '../firebaseAPI';
import { useStateValue } from './StateProvider';
import '../styles/homeStyle.css';
const User=(props) =>{
    const {user,onClick}=props;
    return(
        <div onClick={()=>onClick(user)} className="displayName">
        <div className="displayPic">
            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
        </div>
        <div style={{display:'flex', flex: 1,justifyContent:'space-between',margin: '0 10px'}}>
            <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            <span class={user.isOnline ? 'onlineStatus': 'onlineStatus off'}></span>
        </div>
    </div>
    )
}
const Home = () => {
const[state,dispatch]=useStateValue();
const[chatStarted,setChatStarted]=useState(false);
const[chatUser,setChatUser]=useState('');
const[chatingUser,setChatingUser]=useState('');
const[message,setMessage]=useState('');
const[userUid,setUserUid]=useState(null);
const userLocal= JSON.parse(localStorage.getItem('props'))
 useEffect(()=> {
    dispatch({
            type:'SET_USER',
            user:userLocal
        })
        db.collection('users')
        .get()
        .then((res) => {
            res.forEach((doc) => {
                
            if (doc.data().uid === userLocal.user.uid) { 
                db.collection('users')
                .doc(doc.id)
                .update({
                    isOnline: true
                })
            }
            });
        })     
},[])
useEffect(()=> {
    db.collection("users")
    .onSnapshot((querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
        if(doc.data().uid != userLocal?.user.uid)
        users.push(doc.data());
    });
    dispatch({
        type:'GET_REALTIME_USERS',
        users: users
    })
});
    
},[])

const initChat=(user)=>{

    setChatStarted(true)
    setChatingUser(user)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid);
    getRealtimeConversations({uid_1:userLocal?.user.uid,uid_2:user.uid})
    setView(user);
}
const setView=(user)=>{
    db.collection('conversations')
    .get()
    .then((res) => {
        res.forEach((doc) => {
            
        if (doc.data().user_uid_1 === user.uid) { 
            db.collection('conversations')
            .doc(doc.id)
            .update({
                isView: true
            })
        }
        });
    }) 

};

const submitMessage=(e)=>{
    const msgObj={
        user_uid_1: userLocal?.user.uid,
        user_uid_2:userUid,
        message:message
    }
    if(message!==""){
        updateMessage(msgObj);
        setMessage('')
    } 
}

const updateMessage=(msgObj)=>{
    db.collection('conversations')
    .add({
        ...msgObj,
        isView: false,
        createdAT:new Date()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch(error=>{
        console.log(error)
    });
}
const getRealtimeConversations=(user)=>{
    db.collection('conversations')
    .where('user_uid_1','in',[user.uid_1,user.uid_2])
    .orderBy('createdAT','asc')
    .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
            if(
                (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                ||
                (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                )
            conversations.push(doc.data());
        });
        if(conversations.length>0){
            dispatch({
                type:'GET_REALTIME_MESSAGES',
                conversations: conversations
            })
        }  
       else{
            dispatch({
                type:'GET_REALTIME_MESSAGES',
                conversations: []
            })
        }  
})
}


    return (
        <div>
            <NavBar />
    <div className="contain">
    <div className="listOfUsers">
        {
        
            state.users.length>0 ?
            state.users.map(user =>{
                return(
                <User onClick={initChat} key={user.uid} user={user}/>
            );
            }) : null
        }           
    </div>
    <div className="chatArea">
        <div className="chatHeader"> 
        {
            chatStarted?chatUser:''
            
        } 
        </div>
        <div className="messageSections">
            {
                chatStarted?
                state.conversations.map((con)=>
                    
                    <div style={{ textAlign: con.user_uid_1 == userLocal?.user.uid ? 'right' : 'left' }}>
                    <p className="messageStyle" >{con.message}</p>
                   
                    <p style={{color: con.isView? 'blue':'black'}}>
                    {con.user_uid_1 == userLocal?.user.uid?
                    con.isView?'✔✔'
                    :chatingUser.isOnline?
                    '✔✔':'✔'
                    :''}
                    </p>
                    </div>
                )
                :null
            }
        </div>
        
            {
                chatStarted?
                <div className="chatControls">
                <textarea
                value={message}
                onChange={(e)=>setMessage(e.target.value)} />
                <button onClick={submitMessage}>Send</button>
                </div>
                : null
                
            }
        
    </div>
</div>
</div>
    )
}

export default Home

