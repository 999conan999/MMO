import React, { Component } from 'react';
import './post.css'
import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_post from './editer_post';
import {get_cate_v1,get_posts,action_edit_quatity_sold,action_edit_related_keyword,edit_status,edit_is_best_seller,delete_post} from '../lib/axios'
export default class Posts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        // {
        //   id:1,
        //   thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
        //   title:'Giường sắt giá rẻ miễn phí vận chuyển Hồ Chí Minh',
        //   key_word:'Giường sắt ống tròn',
        //   price:1290000,
        //   quantity_sold:122223,
        //   type:'sp_main',
        //   related_keyword:{
        //     rs_id:[],
        //     rs_obj:[]
        //   },
        //   status:'private',
        //   is_best_seller:true,
        //   url:"#1"
        // },
        // {
        //   id:2,
        //   thumnail:'https://anbinhnew.com/wp-content/uploads/2022/06/giuong-sat-my-thuat-hg01.jpg',
        //   title:'Giường sắt xếp giao miễn phí Việt Nam',
        //   key_word:'Giường sắt hộp vuông',
        //   price:2250000,
        //   quantity_sold:12,
        //   type:'sp_seo',
        //   related_keyword:{
        //     rs_id:[],
        //     rs_obj:[]
        //   },
        //   status:'publish',
        //   is_best_seller:true,
        //   url:"#2"
        // },
      ],
      //ho tro
      control_edit:{
        is_open:false,
        id:-1,
        type:""
      },
      //
      select_quantity_sold:{
        index:-1,
        value:""
      },
      select_related_keyword:{
        index:-1,
        rs_id:[],
        rs_obj:[]
      },
      //
      category_list:[
        {
          text:"Chọn danh mục",
          value:-1
        }
      ],
      selected_category:-1,
      //
      text_check:"",
      //
      search_id:"",
      search_title:"",
      search_type:"All",
      search_status:"All",
    }
  }
 async componentDidMount(){
    let text_check= localStorage.getItem("post_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    let cate_v1=await get_cate_v1();
    cate_v1.unshift({text:"Chọn danh mục",value:-1})
    this.setState({text_check:text_check,category_list:cate_v1})
  }
  render() {
    let {control_edit,data,select_quantity_sold,select_related_keyword,text_check,search_id,search_title,search_type,search_status,category_list}=this.state;
    let option_related_keyword=data.map((e)=> {
      return {
        value:e.id,
        text:e.key_word,
        url:e.url
      }
    })
    // search id
    if(search_id.length>0){
      data=data.filter((e)=>e.id==search_id)
    }
    // search id
    if(search_type!="All"){
      data=data.filter((e)=>e.type==search_type)
    }
    // search id
    if(search_status!="All"){
      data=data.filter((e)=>e.status==search_status)
    }
    // search id
    if(search_title.length>0){
      data=data.filter((e)=>{
        var normalizedTitle = e.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        var normalizedSearchTitle = search_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return normalizedTitle.search(normalizedSearchTitle)>-1 ;
      })
    }
      return (
        <React.Fragment>
              <Grid style={{padding:"10px"}}>
                <Grid.Column width={6}>
                  <Button content='Tạo mới' icon='add' labelPosition='right' color="blue" 
                    onClick={()=>
                      this.setState({
                        control_edit:{
                          is_open:true,
                          id:-1,
                          type:"create"
                        }
                      })
                    }
                  />
                </Grid.Column>
                <Grid.Column width={7}>
                  <Dropdown  selection search
                    value={this.state.selected_category}
                    options={this.state.category_list}
                    onChange={async(e,{value}) => {
                      // get all post_by_id_cate
                      let a=[]
                      if(value!=-1){
                        a=await get_posts(value)
                      } 
                      this.setState({selected_category:value,data:a})
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
              </Grid>
              <Grid.Column width={12}>
                <Segment className='clorg hg'
                  // loading
                >
                  <Table celled structured basic  size="small" striped className='table-da'>
                    <Table.Header className='head-tbaks'>
                      <Table.Row>
                        <Table.HeaderCell width={1} className='idzx'>id <Input transparent placeholder='Search...' size='tiny' type='number'
                          value={search_id}
                          onChange={(e,{value})=>{
                            this.setState({search_id:value})
                          }}
                        /></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Thumnail</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Tiêu đề: <Input transparent placeholder='Search...' size='tiny'
                              value={search_title}
                              onChange={(e,{value})=>{
                                this.setState({search_title:value})
                              }}
                        /></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Đã bán</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Type  <Button size='mini' basic 
                          onClick={()=>{
                            let {search_type}=this.state;
                            if(search_type=="All"){
                              search_type="bv"
                            }else if(search_type=="bv"){
                              search_type="sp_main"
                            }else if(search_type=="sp_main"){
                              search_type="sp_seo"
                            }else if(search_type=="sp_seo"){
                              search_type="sp_clone"
                            }else if(search_type=="sp_clone"){
                              search_type="All"
                            }
                            this.setState({search_type:search_type})
                          }}
                        >{search_type}</Button></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Related keywork</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái <Button size='mini' basic 
                          onClick={()=>{
                            let {search_status}=this.state;
                            if(search_status=="All"){
                              search_status="publish"
                            }else if(search_status=="publish"){
                              search_status="private"
                            }else if(search_status=="private"){
                              search_status="All"
                            }
                            this.setState({search_status:search_status})
                          }}
                        >{search_status}</Button> </Table.HeaderCell>
                        <Table.HeaderCell width={4}>Điều chỉnh</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Best Seller</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Cache</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          let is_active=text_check.search(","+e.id+",")!=-1?true:false;
                          return<Table.Row className={is_active?'todo active-da':'todo'} key={i}>
                                    <Table.Cell 
                                      onClick={()=>{
                                        let {text_check}=this.state;
                                        if(is_active){
                                          text_check=text_check.replace(","+e.id+",","");
                                        }else{
                                          text_check+=(","+e.id+",");
                                        }
                                        localStorage.setItem("post_text_index",text_check);
                                        this.setState({text_check:text_check})
                                      }}
                                    >{e.id}</Table.Cell>
                                    <Table.Cell >
                                      <Image src={e.thumnail.url300} className='imgthm'/>
                                    </Table.Cell>
                                    <Table.Cell>
                                      <a href={e.url} target='_blank'>{e.title}</a>
                                      - {e.key_word!=""&&<b>{e.key_word}</b>}{e.key_word==""&&<b style={{color:"red"}}>___no_key_word__</b>}  {e.type!="bv"&&<b className='color-gre'>- {(Number(e.price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</b>}
                                    </Table.Cell>
                                    <Table.Cell >
                                      {e.type!="bv"&&<div className='re'>
                                        <span className='colz'>{e.quantity_sold}</span>
                                        <i className="fa-solid fa-pen-to-square edit-db" onClick={()=>this.setState({select_quantity_sold:{index:i,value:e.quantity_sold}})}></i>
                                        {select_quantity_sold.index==i&&<div className='keyworsx xasd'>
                                          <Input  placeholder='165' className="input-1" type='number'
                                            value={select_quantity_sold.value}
                                            onChange={(e,{value}) => {
                                              let {select_quantity_sold}=this.state;
                                              select_quantity_sold.value=value
                                              this.setState({select_quantity_sold:select_quantity_sold})
                                            }}
                                          />
                                          <div className='huhvx'>
                                              <Button content='Hủy' secondary  onClick={()=>this.setState({select_quantity_sold:{index:-1,value:''}})}/>
                                              <Button content='OK' primary
                                                onClick={async()=>{
                                                  let {select_quantity_sold,data}=this.state;
                                                  let rs={
                                                    id:e.id,
                                                    value:select_quantity_sold.value
                                                  }
                                                  let a=await action_edit_quatity_sold(rs);
                                                  if(a.status){
                                                    data[select_quantity_sold.index].quantity_sold=select_quantity_sold.value;
                                                    this.setState({
                                                      select_quantity_sold:{index:-1,value:''},
                                                      data:data
                                                    })
                                                    toast.success('Cập nhật thành công.', { theme: "colored" });
                                                  }else{
                                                    toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                                  }
                                                }}

                                              />
                                          </div>
                                        </div>}
                                      </div>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {e.type=="sp_main"&&<a className='tagx'>S.P_main</a>}
                                      {e.type=="sp_clone"&&<a className='tagx clonxe'>S.P_clone</a>}
                                      {e.type=="sp_seo"&&<a className='tagx clonxes'>S.P_seo</a>}
                                      {e.type=="bv"&&<a className='tagx colrfs'>B.V</a>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <div>({e.related_keyword.rs_id.length}) 
                                        <Button  icon='edit' basic className='border-non'   onClick={()=>{
                                          let {select_related_keyword}=this.state;
                                          select_related_keyword={
                                            index:i,
                                            rs_id:e.related_keyword.rs_id,
                                            rs_obj:e.related_keyword.rs_obj,
                                          }
                                          this.setState({select_related_keyword:select_related_keyword})
                                        }}/>
                                      </div>
                                      {select_related_keyword.index==i&&<div className='re'>
                                        <div className='keyworsx'>
                                        <p><b>*Chọn từ khóa cần link tới (Lưu ý: chỉ chọn được <span style={{color:"blue"}}>3 từ</span>)</b></p>
                                        <p><b>*Từ khóa chính hiện tại (<span style={{color:"blue"}}>{e.key_word}</span>)</b></p>
                                          <Dropdown
                                            search
                                            options={option_related_keyword}
                                            placeholder='...'
                                            multiple
                                            selection
                                            fluid
                                            value={select_related_keyword.rs_id}
                                            onChange={(e, { value }) => {
                                              let {select_related_keyword}=this.state;
                                              select_related_keyword.rs_id=value;
                                              select_related_keyword.rs_obj= option_related_keyword.filter(e => value.findIndex((index)=>index==e.value)!=-1);
                                              this.setState({select_related_keyword:select_related_keyword})
                                            }}
                                          />
                                          <div className='huhvx'>
                                              <Button content='Hủy' secondary  onClick={()=>this.setState({select_related_keyword:{index:-1,rs_id:[],rs_obj:[]}})}/>
                                              <Button content='OK' primary 
                                                onClick={async()=>{
                                                  let {select_related_keyword,data}=this.state;
                                                  let related_keyword={
                                                    rs_id:select_related_keyword.rs_id,
                                                    rs_obj:select_related_keyword.rs_obj,
                                                  }
                                                  let rs={
                                                    id:e.id,
                                                    value:JSON.stringify(related_keyword)
                                                  }
                                                  let a=await action_edit_related_keyword(rs);
                                                  if(a.status){
                                                    data[i].related_keyword=related_keyword;
                                                    console.log("🚀 ~ file: posts.js:323 ~ Posts ~ onClick={async ~ data.related_keyword:", data.related_keyword)
                                                    this.setState({
                                                      data:data,
                                                      select_related_keyword:{
                                                        index:-1,
                                                        rs_id:[],
                                                        rs_obj:[]
                                                      },})
                                                    toast.success('Cập nhật thành công.', { theme: "colored" });
                                                  }else{
                                                    toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                                  }
                                                }}
                                              />
                                          </div>
                                        </div>
                                      </div>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {e.status=="private"&&<Button content='Riêng tư' basic size="mini"
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận đổi sang 'công khai'")){
                                            let {data}=this.state;
                                            let a=await edit_status({
                                              id:e.id,
                                              value:'publish'
                                            })
                                            if(a.status){
                                              data[i].status="publish"
                                              toast.success('Cập nhật thành công.', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                            this.setState({data:data})
                                          }
                                        }}
                                      />}
                                      {e.status=="publish"&&<Button positive  size="mini"
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận đổi sang 'Riêng tư'")){
                                            let {data}=this.state;
                                            let a=await edit_status({
                                              id:e.id,
                                              value:'private'
                                            })
                                            if(a.status){
                                              data[i].status="private"
                                              toast.success('Cập nhật thành công.', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                            this.setState({data:data})
                                          }
                                        }}
                                      >Công khai</Button>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <Button animated='vertical'
                                        onClick={async()=>{
                                          if(window.confirm(`Xác nhận Xóa:"${e.title}"`)){
                                            let {data}=this.state;
                                            let a=await delete_post({
                                              id:e.id
                                            })
                                            if(a.status){
                                              data.splice(i,1)
                                              toast.success('Cập nhật thành công.', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                            this.setState({data:data})
                                          }
                                        }}
                                      >
                                        <Button.Content hidden >Xóa</Button.Content>
                                        <Button.Content visible>
                                          <Icon name='trash alternate' />
                                        </Button.Content>
                                      </Button>
                                      <Button animated='vertical'
                                            onClick={()=>
                                              this.setState({
                                                control_edit:{
                                                  is_open:true,
                                                  id:e.id,
                                                  type:"copy"
                                                }
                                              })
                                            }
                                        >
                                        <Button.Content hidden>Copy</Button.Content>
                                        <Button.Content visible>
                                          <Icon name='copy' />
                                        </Button.Content>
                                      </Button>
                                      <Button animated='vertical'
                                            onClick={()=>
                                              this.setState({
                                                control_edit:{
                                                  is_open:true,
                                                  id:e.id,
                                                  type:"edit"
                                                }
                                              })
                                            }
                                        >
                                        <Button.Content hidden>Edit</Button.Content>
                                        <Button.Content visible>
                                          <Icon name='edit' />
                                        </Button.Content>
                                      </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                      {e.is_best_seller=='true'&&e.type!="bv"&&<Icon name='star' size='big' className='star-clo-1'
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận: 'ẩn khỏi trang chủ'")){
                                            let {data}=this.state;
                                            let a=await edit_is_best_seller({
                                              id:e.id,
                                              value:'false'
                                            })
                                            if(a.status){
                                              data[i].is_best_seller="false"
                                              toast.success('Cập nhật thành công.', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                            this.setState({data:data})
                                          }
                                        }}
                                      />}
                                      {e.is_best_seller=='false'&&e.type!="bv"&&<Button circular icon='star' size='big' color='gray'
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận: 'hiển thị lên trang chủ'")){
                                            let {data}=this.state;
                                            let a=await edit_is_best_seller({
                                              id:e.id,
                                              value:'true'
                                            })
                                            if(a.status){
                                              data[i].is_best_seller="true"
                                              toast.success('Cập nhật thành công.', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                            this.setState({data:data})
                                          }
                                        }}
                                      />}
                                    </Table.Cell>
                                    <Table.Cell><span className='clear-cache'>clear</span></Table.Cell>
                                  </Table.Row>
                        })
                      }
                      
                    </Table.Body>
    
                  </Table>
                </Segment>
              </Grid.Column>
              {control_edit.is_open&&<Editer_post 

                category_list={category_list}
                list_sp={data}
                id={control_edit.id}
                type={control_edit.type}
                close_edit={()=>{
                  this.setState({
                    control_edit:{
                      is_open:false,
                      id:-1,
                      type:""
                    }
                })}}
                fs_change_posts={(id,rs) => {
                  console.log("🚀 ~ file: posts.js:376 ~ Posts ~ render ~ rs:", rs)
                  console.log("🚀 ~ file: posts.js:398 ~ Posts ~ render ~ id:", id)
                  let {data}=this.state;
                  if(id==-1){// tao moi
                    data.unshift(rs)
                  }else{
                    let index=-1;
                    for (let i = 0; i < data.length; i++) {
                      if(data[i].id==id) index=i;
                    }
                    if(index>-1){
                      data[index]=rs;
                    }
                   }
                   this.setState({
                      data:data,
                      control_edit:{
                        is_open:false,
                        id:-1,
                        type:""
                      }
                    })
                }}
              />}
              {false&&<div className='dimerz'></div>}
        </React.Fragment>
      );
  }
  searchID=(arr, id)=>{
    const hashTable = {};
  
    for (let i = 0; i < arr.length; i++) {
      hashTable[arr[i].id] = i;
    }
  
    return hashTable[id] !== undefined ? hashTable[id] : -1;
  }
}

