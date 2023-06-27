import React, { Component } from 'react';
import './index.css'
import Setup from './setup/setup.js';
import Posts from './post/posts';
import { Icon } from 'semantic-ui-react'
import Media from './lib/media/Media';
import Attributes from './attribute/attribute';
import Categorys from './category/category';
import Pages from './page/page';
import Notify from './notify/notify';
import Input_img from './lib/input_img';
import Comments from './comments/comments';
import Orders from './orders/order';
import { count_order } from './lib/axios';
export default class Index_menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
        seleted:'bv',
        is_show_menu:true,
        orders_quality:0
    }
  }
  async componentDidMount(){
    let data_count=await count_order();
    let orders_quality=(data_count.count==undefined||data_count.count==null)?0:Number(data_count.count);
    this.setState({orders_quality:orders_quality})
  }
  render() {
    let {seleted,is_show_menu,orders_quality}=this.state;
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
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'Notify'})}  
                            className={seleted==='Notify'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-volume-high"></i> <span className="hgfs"> Thông báo</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'Comments'})}  
                            className={seleted==='Comments'?'active iconz':' iconz'}
                        >
                            <i className="fa-solid fa-comment-dots"></i> <span className="hgfs"> Bình luận</span>
                        </li>
                        {/*  */}
                        <li 
                            onClick={()=>this.setState({seleted:'Orders'})}  
                            className={seleted==='Orders'?'active iconz re':' iconz re'}
                        >
                            <i className="fa-solid fa-cart-shopping"></i> <span className="hgfs"> Đơn hàng</span>
                            {orders_quality>0&&<b class="notify" id="cart-1">({orders_quality})</b>}
                        </li>
                       
                    </ul>
                    <div className='design-by'>
                        <Input_img
                            is_muti={false}
                            fs_result={(rs) => {}}
                            />
                     </div>
                </div>}
                <div className={is_show_menu?'csdf fullz':'csdf'}>
                    <div className='wrap-conx'>
                        {seleted==='setup'&&<Setup />}
                        {seleted==='bv'&&<Posts />}
                        {seleted==='Categorys'&&<Categorys />}
                        {seleted==='Pages'&&<Pages />}
                        {seleted==='Attributes'&&<Attributes />}
                        {seleted==='Notify'&&<Notify />}
                        {seleted==='Comments'&&<Comments />}
                        {seleted==='Orders'&&<Orders
                            change_count_order={(type)=>{
                                let {orders_quality}=this.state;
                                if(type=="cong"){
                                    orders_quality++
                                }else{
                                    if(orders_quality>0) orders_quality--
                                }
                                this.setState({orders_quality:orders_quality})
                            }}
                        />}
                     </div>
                </div>
            </div>
            <Media />
        </React.Fragment>
      );
  }
}

