import React, { Component } from 'react';
import './index.css'
import Setup from './setup/setup.js';
const design_by={
    name:"Võ Danh",
    url:'#'
}
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {seleted:'setup'}
  }
  render() {
    let {seleted}=this.state;
      return (
        <React.Fragment>
            <div>
                <div className=' navbarz'>
                    <ul className='menuz'>
                        <li style={{textAlign:"center",fontSize:"32px",paddingTop:"19px"}} onClick={()=>{
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
                </div>
                <div className=' csdf'>
                    <div className='wrap-conx'>
                        {seleted==='setup'&&<Setup />}
                        {/* {seleted==='pages'&&<Pages />}
                        {seleted==='Google_shoping_sheet'&&<Google_shoping_sheet />}
                        {seleted==='setups'&&<Setups />}
                        {seleted==='orders'&&<Orders />} */}
                     </div>
                </div>
            </div>
        </React.Fragment>
      );
  }
}

