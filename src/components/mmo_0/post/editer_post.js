import React, { Component } from 'react';
// import './post.css';
import Editer from '../lib/editer/Editer';
import Input_img from '../lib/input_img';
import { moveElement } from '../lib/fs';
// import { toast } from 'react-toastify';
import {action_create_or_edit_post,get_infor_post,get_attribute_list_v2} from '../lib/axios'
import { Container, Grid, Button, Dropdown, Segment, Input, Image, Radio, Header, TextArea, Form } from 'semantic-ui-react'
import { toast } from 'react-toastify';
// const test_html = '<p>Giường được làm bằng sắt ống tròn phi 49, có thể tháo ráp dễ dàng.</p> <p>Giường được sơn bằng&nbsp;<span style="color: rgb(186, 55, 42);"><strong>sơn tĩnh điện</strong></span>&nbsp;chống rỉ sét.</p> <p>Hỗ trợ kích thước:&nbsp;<span style="color: rgb(186, 55, 42);"><strong>80cmx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1mx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m2x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m4x2m</strong></span>, <span style="color: rgb(186, 55, 42);"><strong>1m6x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m8x2m</strong></span>.</p> <p><strong>Giá rẻ nhất</strong>&nbsp;trong các dòng giường sắt, sử dụng cũng khá bền.&nbsp;<span style="color: rgb(186, 55, 42);"><strong>Nếu như các bạn đang cần một chiếc giường và không cần quá cầu kì, thì đây là sự lựa chọn giúp bạn tiết kiệm khá nhiều chi phí đấy nhé!</strong></span></p>'
export default class Editer_post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //main
      editer_option: {
        is_open: false,
        text_html: '',
        index: -1
      },
      // 
      data:{
        id:-1,
        type:'sp_main',//sp_main||bv||sp_clone||sp_seo;
        category_id:-1,
        thumnail:{
          id:0,
          url:"",
          url150:"",
          url300:"",
        },
        key_word:'',
        canonical:"",
        comments_id:-1,
        quantity_sold:0,
        attribute_id:-1,
        img_sp:{
          imgs_list:[],
          img_html:''
        },
        title:'',
        short_des:'',
        long_des:'',
        related_keyword:{
              rs_id:[],
              rs_obj:[]
            },
        is_best_seller:false,
        status:'private',
        is_best_seller:false,
        index_price:0,
        price:0
      },
      //
      category_list:[
        {
          text:"Chưa chọn danh mục",
          value:-1
        },
      ],
      //
      attribute_list:[
        // {
        //   value:1,
        //   text:'giường sắt ống tròn',
        //   data:'{"name":"Giường sắt ống tròn","tag":"Giường sắt","thumnail":"","price_ss":300000,"attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"850000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000"},{"name":"1m2x2m","price_v":"950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m4x2m","price_v":"1050000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m6x2m","price_v":"1150000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m8x2m","price_v":"1250000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, xanh dương"},{"name":"Chất liệu sắt","value":"sắt ống tròn phi 49; dày 8zem"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        // },
        // {
        //   value:2,
        //   text:'giường sắt hộp 4x8',
        //   data:'{"name":"giường sắt hộp 4x8","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"1100000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000"},{"name":"1m2x2m","price_v":"1250000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000"},{"name":"1m4x2m","price_v":"1400000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"},{"name":"1m6x2m","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"},{"name":"1m8x2m","price_v":"1600000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, xanh dương"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 4x8"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        // },
        // {
        //   value:3,
        //   text:'giường sắt hộp 5x10',
        //   data:'{"name":"giường sắt hộp 5x10","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"1300000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m2x2m","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m4x2m","price_v":"1650000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m6x2m","price_v":"1800000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m8x2m","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, hồng"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 5x10"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        // },
        // {
        //   value:4,
        //   text:'giường sắt tầng sắt',
        //   data:'{"name":"giường sắt tầng sắt","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"tầng trên 1m2 x dưới 1m2","price_v":"1400000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m4 x dưới 1m4","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m6 x dưới 1m6","price_v":"1650000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m8 x dưới 1m8","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 80cm x dưới 80cm","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, hồng"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 5x10"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        // },
      ],
      //
      list_sp_anh_xa:[],
      //ho tro
      table_attribute:{
        table_price:[],
        table_infor:[],
        img:'',
        attribute_name:''
      },
      is_hidden_1:true,
      is_loading:true
    }
  }
  async componentDidMount(){
    let {id,type,list_sp,category_list}=this.props;
    let {data}=this.state;
    // 1
   let list_sp_covert=list_sp.map((e)=>{
      return {
        text:e.title,
        value:e.id,
        image:{ avatar: true, src: e.thumnail.url300 }
      }
    })
    list_sp_covert.unshift({
      text:'Chọn chính trang này là trang comments',
      value:-1,
    })
    let attribute_list=[];
    if(type=="create"){
      if(category_list[1]!=undefined) data.category_id=category_list[1].value;
    }else if(type=="copy"){
      let da=await get_infor_post(id);
      if(da.id!=undefined){
        data=da;
        // this.reload_table_price();
        data.id=-1;
        // this.setState({data:data,is_loading:false})
      }else{
        toast.info("Lỗi rồi", { theme: "colored" })
      }
    }else if(type=="edit"){
      let da=await get_infor_post(id);
      if(da.id!=undefined){
        data=da;
        // this.reload_table_price()
        // this.setState({data:data,is_loading:false})
      }else{
        toast.info("Lỗi rồi", { theme: "colored" })
      }
    }
    // cover to table
    let table_attribute={
      table_price:[],
      table_infor:[],
      img:''
    }
    if(data.category_id!=-1){
      attribute_list=await get_attribute_list_v2(data.category_id);
      if(!attribute_list) attribute_list=[];
      //
      let value=data.attribute_id;
      let data_attribute=attribute_list.filter(e => e.value === value);
      if(data_attribute.length>0){
        data_attribute=JSON.parse(data_attribute[0].data);
        table_attribute.table_price=data_attribute.table_price;
        table_attribute.table_infor=data_attribute.table_infor;
        table_attribute.attribute_name=data_attribute.attribute_name;
        table_attribute.img=data_attribute.thumnail;
      } 
      //
    }
    // end cover to table
    this.setState({
      list_sp_anh_xa:list_sp_covert,
      category_list:category_list,
      attribute_list:attribute_list,
      is_loading:false,
      data:data,
      table_attribute:table_attribute
    })

  }
  render() {
    let {data,table_attribute,list_sp_anh_xa,is_loading}=this.state;
    let data_prompt_GPT=null;
    if((data.type=='sp_main'||data.type=='sp_seo')){
      if(table_attribute.attribute_name!=""&&table_attribute.attribute_name!=undefined&&data.key_word!=""){
        data_prompt_GPT={
          table_price:table_attribute.table_price,
          table_infor:table_attribute.table_infor,
          attribute_name:table_attribute.attribute_name,
          key_word:data.key_word
        }
      }
    }
    return (
      <div className='wrap-editer-post'>
        <Segment className='clearxa'
          loading={is_loading}
        >
          <Container>
            <Header as='h1'>*{this.props.type=="edit"?"Cập nhật bài viết":"Tạo bài viết mới"}</Header>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={4}>
                  <Header as='h4'>*<span style={data.type=="bv"?{ color: "#03A9F4" }:{}}>Bài viết</span> || <span style={data.type=="sp"?{ color: "#03A9F4" }:{}}>sản phẩm</span></Header>
                  <Dropdown selection
                    value={data.type}
                    options={[{text:'Sản phẩm(main)',value:'sp_main'},{text:'Bài viết',value:'bv'},{text:'Sản phẩm SEO',value:'sp_seo'},{text:'Sản phẩm(clone)',value:'sp_clone'}]}
                    onChange={(e, { value }) => {
                      let {data}=this.state;
                      data.type=value;
                      this.setState({ data: data })
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header as='h4'>*Chọn danh mục</Header>
                  <Dropdown selection search
                    value={data.category_id}
                    options={this.state.category_list}
                    onChange={async(e, { value }) => {
                      let {data}=this.state;
                      data.category_id=value;
                          // cover to table
                          let table_attribute={
                            table_price:[],
                            table_infor:[],
                            img:''
                          }
                          let attribute_list=[];
                          if(data.category_id!=-1){
                            attribute_list=await get_attribute_list_v2(data.category_id);
                            if(!attribute_list) attribute_list=[];
                            //
                            let value=data.attribute_id;
                            let data_attribute=attribute_list.filter(e => e.value === value);
                            if(data_attribute.length>0){
                              data_attribute=JSON.parse(data_attribute[0].data);
                              table_attribute.table_price=data_attribute.table_price;
                              table_attribute.table_infor=data_attribute.table_infor;
                              table_attribute.attribute_name=data_attribute.attribute_name;
                              table_attribute.img=data_attribute.thumnail;
                            } 
                            //
                          }
                          // end cover to table
                      this.setState({
                        data:data,
                        table_attribute:table_attribute,
                        attribute_list:attribute_list
                      })
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={4} >
                  <Header as='h4'>*Chọn hình đại diện</Header>
                  <div className='re'>
                    <Input_img
                      is_muti={false}
                      fs_result={(rs) => {
                        console.log('line 120+ ',rs)
                        let {data}=this.state;
                        data.thumnail={
                          id:rs[0].id,
                          url:rs[0].url,
                          url150:rs[0].url150,
                          url300:rs[0].url300,
                        };
                        this.setState({ data: data })
                      }}
                    />
                    <Image
                      floated='right'
                      size='tiny'
                      src={data.thumnail.url150}
                      className='thuasda'
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Header as='h4'>*Từ khóa Chính (cần SEO):</Header>
                  <Input
                    className="input-1"
                    label={{ icon: 'asterisk' }}
                    labelPosition='left corner'
                    placeholder='...'
                    value={data.key_word}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.key_word=value;
                      this.setState({ data: data })
                    }}
                  />
                </Grid.Column>
                {data.type=="sp_clone"&&<Grid.Column width={8}>
                  <Form>
                    <Input label='URL tham chiếu' placeholder='https://' fluid
                      value={data.canonical}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.canonical=value;
                        this.setState({ data: data })
                      }}
                    />
                  </Form>
                </Grid.Column>}
                {data.type!="bv"&&data.type!="sp_main"&&<Grid.Column width={8}>
                <span style={{marginRight:"32px"}}>Ánh xạ comments:</span>
                    <Dropdown
                      search
                      inline
                      options={list_sp_anh_xa}
                      value={data.comments_id}
                      onChange={(e,{value})=>{
                        let {data}=this.state;
                        data.comments_id=value;
                        this.setState({data:data})
                      }}
                    />
                </Grid.Column>}
              </Grid>
            </div>
            {data.type!="bv"&&<div className='wrap-s'>
              <Grid>
                <Grid.Column width={3}>
                  <Form>
                    <Input label='Đã bán' placeholder='131' fluid type='number'
                      value={data.quantity_sold}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.quantity_sold=value;
                        this.setState({ data: data })
                      }}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Dropdown
                    button
                    className='icon'
                    floating
                    labeled
                    search
                    icon='table'
                    placeholder='Chọn thuộc tính'
                    options={this.state.attribute_list}
                    value={data.attribute_id}
                    onChange={(e, { value }) => {
                      let {data,attribute_list}=this.state;
                      data.attribute_id=value;
                      let data_attribute=attribute_list.filter(e => e.value === value);
                      let table_attribute={
                        table_price:[],
                        table_infor:[],
                        img:''
                      }
                      if(data_attribute.length>0){
                        data_attribute=JSON.parse(data_attribute[0].data);
                        table_attribute.table_price=data_attribute.table_price;
                        table_attribute.table_infor=data_attribute.table_infor;
                        table_attribute.attribute_name=data_attribute.attribute_name;
                        table_attribute.img=data_attribute.thumnail;
                        if(data_attribute.table_price.length>0){
                          data.price=Number(data_attribute.table_price[0].price_v)+Number(data_attribute.table_price[0].price_profit);;
                        }
                      } 
                      this.setState({ data: data,table_attribute:table_attribute })
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={4}> Hình ảnh sản phẩm: &nbsp;
                  <Input_img
                    is_muti={true}
                    fs_result={(rs) => {
                      let {data}=this.state;
                      data.img_sp.imgs_list=[...rs,...data.img_sp.imgs_list];
                      data.img_sp.imgs_list=data.img_sp.imgs_list.filter((item, index, self) => {
                        return index === self.findIndex((t) => (
                            t.id === item.id
                        ));
                      });
                      this.setState({ data: data })
                    }}
                  />
                </Grid.Column>

                <Grid.Column width={7}>
                  <table className="table-dt" border="1">
                    <thead>
                      <tr>
                        <th scope="col">Loại sản phẩm</th>
                        <th scope="col">Giá vốn</th>
                        <th scope="col">Giá bán</th>
                        <th scope="col">Chọn làm giá hiển thị</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        table_attribute.table_price.map((e,i) => {
                          return <tr key={i}>
                            <td>{e.name}</td>
                            <td><span className="txt-price-alt">{Number(e.price_v).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span></td>
                            <td><strong>{(Number(e.price_v)+Number(e.price_profit)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</strong></td>
                            <td> <Radio toggle 
                              checked={data.index_price==i?true:false}
                              onChange={()=>{
                                if(data.index_price!=i){
                                  let {data}=this.state;
                                  data.index_price=i;
                                  data.price=Number(e.price_v)+Number(e.price_profit);
                                  this.setState({data:data})
                                }
                              }}
                            /></td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                  <div className="table-ct"  style={this.state.is_hidden_1?{}:{maxHeight:"inherit"}}>
                    <span>Thông số kĩ thuật :</span>
                    <table className="st-pd-table">
                        <tbody>
                          {
                            table_attribute.table_infor.map((e,i)=>{
                              return <tr key={i}>
                              <td>{e.name}</td>
                              <td>{e.value}</td>
                          </tr>
                            })
                          }
                        </tbody>
                    </table>
                </div>
                <div><span className='mdrx'
                  onClick={()=>this.setState({is_hidden_1:!this.state.is_hidden_1})}
                >{this.state.is_hidden_1?'mở rộng':'thu nhỏ'}</span></div>
                </Grid.Column>
                <Grid.Column width={9}>
                  <div>
                    {
                      data.img_sp.imgs_list.map((e,i)=>{
                        return <div className='img-muti' key={e.id}>
                        <Image
                          size='tiny'
                          src={e.url}
                        />
                        {i>0&&<i className="fa-solid fa-angles-left icon-img-muitxx"
                          onClick={()=>{
                              let {data}=this.state;
                              data.img_sp.imgs_list=moveElement(data.img_sp.imgs_list,i,i-1)
                              this.setState({ data: data })
                          }}
                        ></i>}
                        <i className="fa-solid fa-trash icon-x-imgxx"
                          onClick={()=>{
                            if(window.confirm("Xác nhận xóa!")){
                              let {data}=this.state;
                              data.img_sp.imgs_list=data.img_sp.imgs_list.filter(z =>z.id !== e.id)
                              this.setState({ data: data })
                            }
                          }}
                        ></i>
                      </div>
                      })
                    }
                  </div>
                </Grid.Column>

              </Grid>
            </div>}
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={12}>
                  <Form>
                    <Header as='h4'>*Tiêu đề bài viết</Header>
                    <Input
                      fluid
                      value={data.title}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.title=value;
                        this.setState({ data: data })
                      }}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Form>
                    <Header as='h4'>*Mô tả ngắn</Header>
                    <TextArea placeholder='...' style={{ minHeight: 80 }}
                      value={data.short_des}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.short_des=value;
                        this.setState({ data: data })
                      }}
                    />
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
            <Header as='h1' textAlign="center">*Nội dung bài viết</Header>
            <div className='re'>
              <Segment style={{minHeight:"100px"}}>
                <div className='text-dt'>
                  <div dangerouslySetInnerHTML={{ __html: data.long_des }}></div>
                </div>
              </Segment>
              <div className='editxx'>
                <Button content='Chỉnh sửa nội dung' primary
                  onClick={()=>{
                    this.setState({
                      editer_option:{
                        is_open:true,
                        text_html:data.long_des,
                        index:1
                      }
                    })
                  }}
                />
              </div>
            </div>
          </Container>
        </Segment>
        <div className='footer-edit'>
          <div style={{ display: "inline-block", paddingRight: "50px" }}>
            <Dropdown
              value={data.status}
              options={[
                {
                  text:'Công khai',
                  value:'publish'
                },
                {
                  text:'Riêng tư',
                  value:'private'
                },
              ]}
              onChange={(e, { value }) => {
                let {data}=this.state;
                data.status=value;
                this.setState({data:data})
              }}
            />
          </div>
          <Button size='medium' color='grey'
            onClick={()=>this.props.close_edit()}
          >Hủy</Button>
          <Button primary className='createx'  loading={this.state.loading_server}
            onClick={async()=>{
              let {data}=this.state;
              let thumnail=JSON.stringify(data.thumnail);
              let title=data.title;
              let price=data.price;
              let quantity_sold=data.quantity_sold;
              let key_word=data.key_word;
              let related_keyword=JSON.stringify(data.related_keyword);
              let status=data.status;
              let is_best_seller=data.is_best_seller;
              let type=data.type;
              let short_des=data.short_des;
              if(title.length>8&&data.category_id!=-1){
                if(!this.state.loading_server){
                  let rs={
                    id:data.id,
                    category_id:data.category_id,
                    json_data:JSON.stringify(data),
                    thumnail:thumnail,
                    title:title,
                    price:price,
                    quantity_sold:quantity_sold,
                    key_word:key_word,
                    related_keyword:related_keyword,
                    status:status,
                    is_best_seller:is_best_seller,
                    type:type,
                    short_des:short_des
                  }
                  this.setState({loading_server:true})
                  let a=await action_create_or_edit_post(rs);
                  if(a.status){
                    let rs_change={
                      id:a.id,
                      thumnail:data.thumnail,
                      title:title,
                      key_word:key_word,
                      price:price,
                      quantity_sold:quantity_sold,
                      type:type,
                      related_keyword:data.related_keyword,
                      status:status,
                      is_best_seller:is_best_seller,
                      url:a.url
                    }
                    if(data.id==-1){
                      toast.success('Tạo mới thành công.', { theme: "colored" });
                    }else{
                      toast.success('Cập nhật thành công', { theme: "colored" });
                    }
                    this.props.fs_change_posts(data.id,rs_change)
                  }else{
                    toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                    this.setState({loading_server:false})
                  }
                }else{
                  toast.info("Bình tĩnh, bấm gì mà nhiều vậy!", { theme: "colored" })
                }
              }else{
                toast.info("Tiêu đề quá ngắn hoặc chưa chọn danh mục", { theme: "colored" })
              }


            }}
          >{this.props.type=="edit"?"Cập nhật bài viết":"Tạo bài viết mới"}</Button>
        </div>
        {this.state.editer_option.is_open && <Editer
          data_prompt_GPT={data_prompt_GPT}
          close={() => this.setState({ editer_option: { is_open: false, text_html: '', index: -1 } })}
          data={this.state.editer_option.text_html}
          rs_data={(rs) => {
            let {data,editer_option}=this.state;
            if(editer_option.index==1){
              data.long_des=rs
              this.setState({data:data,editer_option: { is_open: false, text_html: '', index: -1 }});
            }
          }}
        />}
      </div>
    );
  }
  // reload_table_price=async()=>{
  //   setTimeout(()=>{
  //     let {data,attribute_list}=this.state;
  //     let value=data.attribute_id;
  //     let data_attribute=attribute_list.filter(e => e.value === value);
  //     let table_attribute={
  //       table_price:[],
  //       table_infor:[],
  //       img:''
  //     }
  //     if(data_attribute.length>0){
  //       data_attribute=JSON.parse(data_attribute[0].data);
  //       table_attribute.table_price=data_attribute.table_price;
  //       table_attribute.table_infor=data_attribute.table_infor;
  //       table_attribute.attribute_name=data_attribute.attribute_name;
  //       table_attribute.img=data_attribute.thumnail;
  //     } 
  //     this.setState({table_attribute:table_attribute })
  //   },1000)
  // }
}

