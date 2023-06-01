import React, { Component } from 'react';
import './index.css'
import Setup from './setup/setup.js';
import Posts from './post/posts';
import { Icon } from 'semantic-ui-react'
import Media from './lib/media/Media';
import Attributes from './attribute/attribute';
import Categorys from './category/category';
import Pages from './page/page';
const design_by={
    name:"Võ Danh",
    url:'#'
}
export default class Index_menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
        seleted:'bv',
        is_show_menu:true
    }
  }
  render() {
    let {seleted,is_show_menu}=this.state;
      return (
        <React.Fragment>
            <div style={{position:"relative"}}>
                {!is_show_menu&&<i className="fa-solid fa-bars menu-app"
                    onClick={()=>this.setState({is_show_menu:true})}
                ></i>}
                {is_show_menu&&<Icon name='x' size='small' className='menu-hide'
                    onClick={()=>this.setState({is_show_menu:false})}
                />}
                {is_show_menu&&<div className='navbarz'>
                    <ul className='menuz'>
                        <li style={{textAlign:"center",fontSize:"32px",paddingTop:"19px",marginTop:"26px"}} onClick={()=>{
                            if(window.lock==true){
                                window.location.href = window.url+"/wp-admin/"
                            }
                        }}> 
                            <a  className="homexz"><i className="fa-solid fa-house-user"></i></a>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'setup'})}  
                            className={seleted==='setup'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-gear"></i> <span className="hgfs"> Cài đặt</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'bv'})}  
                            className={seleted==='bv'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-file-word"></i> <span className="hgfs"> Bài viết || sản phẩm</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'Categorys'})}  
                            className={seleted==='Categorys'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-layer-group"></i> <span className="hgfs"> Danh mục</span>
                        </li>
                        {/*  */}
                         <li 
                            onClick={()=>this.setState({seleted:'Pages'})}  
                            className={seleted==='Pages'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-paper-plane"></i> <span className="hgfs"> Trang</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'Attributes'})}  
                            className={seleted==='Attributes'?'active iconz':' iconz'}
                        >
                            <i className="fa-brands fa-slack"></i> <span className="hgfs"> Thuộc tính sản phẩm</span>
                        </li>
                       
                    </ul>
                    {/* <div className='design-by'>
                        <a href={design_by.url} target='_blank'>Design by : <b>{design_by.name}</b></a>
                     </div> */}
                </div>}
                <div className={is_show_menu?'csdf fullz':'csdf'}>
                    <div className='wrap-conx'>
                        {seleted==='setup'&&<Setup />}
                        {seleted==='bv'&&<Posts />}
                        {seleted==='Categorys'&&<Categorys />}
                        {seleted==='Pages'&&<Pages />}
                        {seleted==='Attributes'&&<Attributes />}
                        {/*{seleted==='setups'&&<Setups />}
                        {seleted==='orders'&&<Orders />} */}
                     </div>
                </div>
            </div>
            <Media
                // fs_return={(data) => {
                //     console.log("🚀 ~ file: main.js:69 ~ Index_menu ~ render ~ text:", data.text)
                //     console.log("🚀 ~ file: main.js:75 ~ Index_menu ~ render ~ rs:", data.rs)
                // }}
            />
        </React.Fragment>
      );
  }
}

