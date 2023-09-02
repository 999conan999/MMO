
import React, { Component } from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Icon } from 'semantic-ui-react'
import Danh_sach_tinh from './danh_sach_tinh/danh_sach_tinh';
import Tools from './tools/tools';
export default class Generate_contents extends Component {
  constructor (props) {
    super(props)
    this.state = {
        seleted:'tools',
        is_show_menu:true,
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
                                window.location.href = window.url+"/wp-admin/"
                        }}> 
                            <a  className="homexz"><i className="fa-solid fa-house-user"></i></a>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>{
                                    this.setState({seleted:'tinh'})
                            }}  
                            className={seleted==='tinh'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-gear"></i> <span className="hgfs"> Danh sách tỉnh</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>{
                                    this.setState({seleted:'tools'})
                            }}  
                            className={seleted==='tools'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-file-word"></i> <span className="hgfs"> Tools</span>
                        </li>
                         
                       
                    </ul>
 
                </div>}
                <div className={is_show_menu?'csdf fullz':'csdf'}>
                    <div className='wrap-conx'>
                        {seleted==='tools'&&<Tools />}
                        {seleted==='tinh'&&<Danh_sach_tinh />}
                     </div>
                </div>
            </div>
        </React.Fragment>
      );
  }
}


