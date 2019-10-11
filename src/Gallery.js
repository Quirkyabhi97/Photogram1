import React from 'react';
//import {Card,CardGroup,Row,Col,Container} from 'react-bootstrap'
import 'antd/dist/antd.css';

import { Card,Row,Col,Button } from 'antd';
const { Meta } = Card;



let Gallery = (props) => {

    return(
    <div>            
        <Row gutter={16}>
{props.db.photos.map( (photo)=><Col span={6}><Card
hoverable
style={{ width: 240 }}
cover={<img alt="example" src={photo.image} />}
>
<Meta title={photo.title} description={photo.desc} />
</Card>
<Button type="danger" onClick={()=>props.del(photo)} >
       Delete
     </Button>
</Col>)}   
    </Row>
    </div>  
  )
}

export {Gallery}

