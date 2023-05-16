import React, { Component } from 'react';
import './index.css'
import Setup from './setup/setup.js';
import { Icon } from 'semantic-ui-react'
import Media from './lib/media/Media'
const design_by={
    name:"Võ Danh",
    url:'#'
}
export default class Index_menu extends Component {
  constructor (props) {
    super(props)
    this.state = {seleted:'setup',
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
                            <i className="fa-solid fa-file-word"></i> <span className="hgfs"> Bài viết</span>
                        </li>
                    </ul>
                    <div className='design-by'>
                        <a href={design_by.url} target='_blank'>Design by : <b>{design_by.name}</b></a>
                     </div>
                </div>}
                <div className={is_show_menu?'csdf fullz':'csdf'}>
                    <div className='wrap-conx'>
                        {seleted==='setup'&&<Setup />}
                        {/* {seleted==='pages'&&<Pages />}
                        {seleted==='Google_shoping_sheet'&&<Google_shoping_sheet />}
                        {seleted==='setups'&&<Setups />}
                        {seleted==='orders'&&<Orders />} */}
                     </div>
                </div>
            </div>
            <Media/>
        </React.Fragment>
      );
  }
}

