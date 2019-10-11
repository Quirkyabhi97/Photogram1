import React from 'react';
import './App.css';
import { Form,Input,Button } from 'antd';

function Add(props){
  let title;
  let desc;
  let image;
  return(
  <div>
    <Form className="ant-advanced-search-form">
  <Form.Item label="Title">
     <Input placeholder="Title" id="title" onChange={(e)=>{title=e.target.value}}/>
   </Form.Item>
   <Form.Item label="Description"> 
     <Input placeholder="Description" id="desc"  onChange={(e)=>{desc=e.target.value}}/>
   </Form.Item>
   <Form.Item label="Image">
     <input type="file" onChange={(e)=>props.fu(e)}/>
   </Form.Item>

   <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
     <Button type="primary" onClick={(e)=>{props.ad({ image: "/uploads/" + props.db.path, desc: document.getElementById('desc').value, title: document.getElementById('title').value }) }}>
       Submit
     </Button>
   </Form.Item>
  </Form>
  </div>) 
}
//<Button type="primary" onClick={(e)=>props.ad({title,desc,image})}>
//<Input placeholder="Image" id="image"  onChange={(e)=>{image=e.target.value}}/>
export {Add}

//onChange={(e)=>{title=e.target.value}}
//onClick={()=>{props.savePhoto({image,desc,title})}}