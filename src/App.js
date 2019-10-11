import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';
import {Gallery} from './Gallery.js'
import {Add} from './Add.js'
import {Login} from './Login.js'
import 'antd/dist/antd.css';
import {Icon, Menu,PageHeader } from 'antd';

var firebaseConfig = {
  apiKey: "AIzaSyDrdhB_ISKqQn84qjpXMYJsRZWL_UcZepw",
  authDomain: "photogram-5160e.firebaseapp.com",
  databaseURL: "https://photogram-5160e.firebaseio.com",
  projectId: "photogram-5160e",
  storageBucket: "",
  messagingSenderId: "939083881997",
  appId: "1:939083881997:web:5e3e3a40ddbe03e1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={}
    //this.state.current='mail'
    this.state.db={
      photos:[]
     // photos:[{title:"image1",desc:"this is image 1",image:"https://picsum.photos/200"},
     // {title:"image2",desc:"this is image 2",image:"https://picsum.photos/200"},
     // {title:"image3",desc:"this is image 3",image:"https://picsum.photos/200"}]
    }
  }
  

   componentDidMount(){
    this.checkLogin()
  }


  checkLogin(){
    firebase.auth().onAuthStateChanged((user)=> {
   if (user) {
    this.setState(
      {user:user}  //adding user field in the state
    )
    this.getPhotos(user.uid)
    this.props.history.push("/add");
   } else {
     // No user is signed in.
   }
  });
  }


  

  googlelogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
   
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      this.setState(
        {user:user}
      )
      this.props.history.push("/add");
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  } 
  

  /* googlelogin(){
     console.log("logged in")
   } */
   
  /*logout(){
    console.log("logged out")
  }*/
  
    logout(){
    firebase.auth().signOut().then(() =>{
    
      this.setState({
      user:null
    })
    console.log(this.state.user)
    this.props.history.push("/");
    }).catch(function(error) {
    // An error happened.
    });
  } 


  
/*  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  */



 getPhotos(uid){
 axios.get("/add?uid="+uid).then(
    (res)=>{
      let db1=this.state.db;
      db1.photos=res.data;
      this.setState({
        db:db1
      })

  })
  console.log("getting photos from db")
}


  addphoto(photo){
  console.log("Added");
  
   let db1=this.state.db;
  photo.uid=this.state.user.uid;

  axios.post("/add",photo).then(
    (res)=>{
      db1.photos.push(res.data)
      console.log(res.data)
      this.setState({
       db:db1     
     })
    }) 
   console.log(db1)
   this.props.history.push("/gallery")  
   //console.log(photo);
  }

  deletephoto(photo){
    console.log("photo deleted")
    let db1=this.state.db;

    let i=db1.photos.indexOf(photo)
    axios.delete("/add/"+photo._id).then((res)=>{
    console.log(res.data)
     db1.photos.splice(i, 1);
     this.setState({
      db:db1
    })
    })
   
    //this.props.history.push("/gallery")
  }

  fileupload = (e) => {
    console.log(e.target.files[0])
    let fd = new FormData()
    let db1 = this.state.db;
    fd.append("avatar", e.target.files[0])

    axios.post("/profile",
      fd, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      }).then((res) => {
        console.log("hello", res.data);
        db1.path = res.data;
        this.setState({ 
          db:db1
         })
      })
  }

/*  savephoto = (img) => {

    console.log(img, this.state.user)
    axios.post("/photo", img).then((res) => {
      console.log(res.data)
    })
  }*/


//onClick={this.handleClick} selectedKeys={[this.state.current]}
render(){  
  return ( 
    <div> <PageHeader title="PhotoGram" subTitle="Make your personal gallery" />,
         {this.state.user? <Menu mode="horizontal" >   
<Menu.Item key="add">
  <Link to="/add"><Icon type="form" />Add</Link>
</Menu.Item>

<Menu.Item key="gallery" >
<Link to="/gallery"><Icon type="picture" /> Gallery</Link>
</Menu.Item>

<Menu.Item key="logout" onClick={this.logout.bind(this)}>
<Icon type="logout" />
Logout
</Menu.Item>

</Menu> :null  }
           <Route path="/" exact render={()=><Login gl={this.googlelogin.bind(this)}></Login>}></Route>
           <Route path="/gallery" render={(props)=><Gallery {...props} db={this.state.db} del={this.deletephoto.bind(this)}></Gallery>}></Route>
           <Route path="/add" render={(props)=><Add {...props} db={this.state.db} ad={this.addphoto.bind(this)} fu={this.fileupload.bind(this)}></Add>}></Route> 
         </div>   )
}
}

export default App;



