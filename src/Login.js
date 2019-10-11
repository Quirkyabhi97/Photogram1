import React from 'react';
import { Carousel,Button } from 'antd';
import first from './first.jpg'
import second from './second.jpg'
import third from './third.jpg'

let Login = (props) => {
    return(<div>
          <Carousel autoplay>
          <div>
                <img width="100%"                     
                    //src="https://wallpaperplay.com/walls/full/f/b/5/216822.jpg"
                    src={first}
                    alt="First slide"
                />
          </div>
          <div>
                <img width="100%"               
                   // src="https://static.bhphotovideo.com/explora/sites/default/files/TS-Night-Photography.jpg"
                   src={second}
                   alt="Second slide"
                />
          </div>
          <div>
                <img width="100%"               
                   //src="https://4.bp.blogspot.com/-u-EH_DD0Vzg/WTQgeeZ2sQI/AAAAAAAAAzs/tbVQKAt6Ft4h4h4NP4VXL0JgNRxUoEx-ACLcB/s1600/Bokeh-HD-Wallpapers-4.jpg"
                   src={third}
                   alt="Third slide"
                />
          </div>
        
    
  </Carousel>,
        <Button type="primary" onClick={props.gl}>Login with Google</Button>
    </div>);
//
}

export {Login}