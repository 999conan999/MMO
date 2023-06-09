import React, { Component } from 'react';
import './post.css'
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_post from './editer_post';
export default class Posts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // data:[],
        test:[
          { text: 'Hiển thị tất cả danh mục', value: 'English' },
          {text: 'Giường sắt', value: 'French' },
          { text: 'GIường ngủ', value: 'Spanish' },
          {text: 'giường gỗ', value: 'German' },
          { text: 'Chinese', value: 'Chinese' },
        ],
        selected_test:'English',
        selected_test_arr:[],
      // main
      data:[
        {
          id:1,
          thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
          title:'Giường sắt giá rẻ miễn phí vận chuyển Hồ Chí Minh',
          key_word:'Giường sắt ống tròn',
          price:1290000,
          quantity_sold:122223,
          type:'sp_main',
          related_keyword:{
            rs_id:[],
            rs_obj:[]
          },
          status:'private',
          is_best_seller:true,
          url:"#1"
        },
        {
          id:2,
          thumnail:'https://anbinhnew.com/wp-content/uploads/2022/06/giuong-sat-my-thuat-hg01.jpg',
          title:'Giường sắt xếp giao miễn phí Việt Nam',
          key_word:'Giường sắt hộp vuông',
          price:2250000,
          quantity_sold:12,
          type:'sp_main',
          related_keyword:{
            rs_id:[],
            rs_obj:[]
          },
          status:'publish',
          is_best_seller:true,
          url:"#2"
        },
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
      text_check:""
    }
  }
 async componentDidMount(){
    let text_check= localStorage.getItem("post_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    this.setState({text_check:text_check})
  }
  render() {
    let {control_edit,data,select_quantity_sold,select_related_keyword,text_check}=this.state;
    let option_related_keyword=data.map((e)=> {
      return {
        value:e.id,
        text:e.title,
        url:e.url
      }
    })
      return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={4}>
                  <div className='tao-moi-post '>
                    <Button content='Tạo mới' icon='add' labelPosition='right' color="blue" size='large'
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
                  </div>
                </Grid.Column>
                <Grid.Column width={12}></Grid.Column>
                <Grid.Column width={6}>
                <Button.Group size='mini' >
                    <Button>Chỉ hiển thị bài viết</Button>
                    <Button.Or />
                    <Button>Chỉ hiển thị sản phẩm</Button>
                  </Button.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Dropdown  
                    value={this.state.selected_test}
                    options={this.state.test}
                    onChange={(e,{value}) => {
                      this.setState({selected_test:value})
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Dropdown  
                    value={this.state.selected_test}
                    options={this.state.test}
                    onChange={(e,{value}) => {
                      this.setState({selected_test:value})
                    }}
                  />
                </Grid.Column>
              </Grid>
              <Grid.Column width={12}>
                <Segment className='clorg hg'
                  // loading
                >
                  <Table celled structured basic  size="small" striped className='table-da'>
                    <Table.Header className='head-tbaks'>
                      <Table.Row>
                        <Table.HeaderCell width={1} className='idzx'>id <Input transparent placeholder='Search...' size='tiny' type='number'/></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Thumnail</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Tiêu đề: <Input transparent placeholder='Search...' size='tiny' /></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Đã bán</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Type  <Button size='mini' basic icon="sort amount down"/></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Related keywork</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái <Button size='mini' basic >All</Button> </Table.HeaderCell>
                        <Table.HeaderCell width={4}>Điều chỉnh</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Best Seller</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Cache</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          let is_active=text_check.search(","+e.id+",")!=-1?true:false;
                          return<Table.Row className={is_active?'todo active-da':'todo'}>
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
                                    <Table.Cell textAlign='middle'>
                                      <Image src={e.thumnail} className='imgthm'/>
                                    </Table.Cell>
                                    <Table.Cell>
                                      <a href={e.url} target='_blank'>{e.title}</a>
                                      - <b>{e.key_word}</b> - <b className='color-gre'>{(Number(e.price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</b>
                                    </Table.Cell>
                                    <Table.Cell >
                                      <div className='re'>
                                        <span className='colz'>{e.quantity_sold}</span>
                                        <i className="fa-solid fa-pen-to-square edit-db" onClick={()=>this.setState({select_quantity_sold:{index:e.id,value:e.quantity_sold}})}></i>
                                        {select_quantity_sold.index==e.id&&<div className='keyworsx xasd'>
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
                                              <Button content='OK' primary />
                                          </div>
                                        </div>}
                                      </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                      {e.type=="sp_main"&&<a className='tagx'>S.P</a>}
                                      {e.type=="sp_clone"&&<a className='tagx clonxe'>S.P_clone</a>}
                                      {e.type=="sp_seo"&&<a className='tagx clonxes'>S.P_seo</a>}
                                      {e.type=="bv"&&<a className='tagx colrfs'>B.V</a>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <div>({e.related_keyword.rs_id.length}) 
                                        <Button  icon='edit' basic className='border-non'   onClick={()=>{
                                          let {select_related_keyword}=this.state;
                                          select_related_keyword={
                                            index:e.id,
                                            rs_id:e.related_keyword.rs_id,
                                            rs_obj:e.related_keyword.rs_obj,
                                          }
                                          this.setState({select_related_keyword:select_related_keyword})
                                        }}/>
                                      </div>
                                      {select_related_keyword.index==e.id&&<div className='re'>
                                        <div className='keyworsx'>
                                        <p><b>*Chọn từ khóa cần link tới (Lưu ý: chỉ chọn được <span style={{color:"blue"}}>3 từ</span>)</b></p>
                                        <p><b>*Từ khóa chính hiện tại <span style={{color:"blue"}}>Giường sắt ống tròn</span>)</b></p>
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
                                                onClick={()=>{
                                                  let {select_related_keyword}=this.state;
                                                  console.log("🚀 ~ file: posts.js:241 ~ Posts ~ data.map ~ select_related_keyword:", select_related_keyword)
                                                }}
                                              />
                                          </div>
                                        </div>
                                      </div>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      {e.status=="private"&&<Button content='Riêng tư' basic size="mini" />}
                                      {e.status=="publish"&&<Button positive  size="mini">Công khai</Button>}
                                    </Table.Cell>
                                    <Table.Cell>
                                      <Button animated='vertical'>
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
                                      <Icon name='star' size='big' className='star-clo-1'/>
                                      {/* <Button circular icon='star' size='big' color='gray'/> */}
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
              />}
              {false&&<div className='dimerz'></div>}
        </React.Fragment>
      );
  }
}

