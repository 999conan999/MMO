import React, { Component } from 'react';
import Editer from '../lib/editer/Editer';
import { toast } from 'react-toastify';
import Input_img from '../lib/input_img';
import { moveElement } from '../lib/fs';
import {action_create_edit_category,get_category_detail,get_list_sp} from '../lib/axios'
import { Container, Grid, Button, Dropdown, Segment, Input,Icon, Image, Table, Header, TextArea, Form,Card,Checkbox } from 'semantic-ui-react'
export default class Editer_category extends Component {
  constructor(props) {
    super(props)
    this.state = {
 
      //
      editer_option:{
        is_open:false,
        text_html:'',
        index:-1
      },
      // main
      data:{
        id:-1,
        thumnail:'',
        title:'',
        short_des:'',
        long_des:'',
        related_list:[],
        price_ss:0,
        dm:[
          // {
          //   name:"Giường sắt hộp vuông",
          //   sp_list_id:[1,2,3]
          // },
          // {
          //   name:"Giường sắt ống tròn",
          //   sp_list_id:[6,7]
          // },
        ],
      },
      //
      list_sp:{
        // 1:{
        //   id:1,
        //   img:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 1',
        //   price:1350000
        // },
        // 2:{
        //   id:2,
        //   img:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-don-gian-s6.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 2',
        //   price:1250000
        // },
        // 3:{
        //   id:3,
        //   img:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 3',
        //   price:1550000
        // },
        // 4:{
        //   id:4,
        //   img:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-sat-mau-trang-gia-re-binh-duong.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 4',
        //   price:1650000
        // },
        // 5:{
        //   id:5,
        //   img:'http://localhost/cofanew/wp-content/uploads/2023/05/giuong-tang-tre-em-2.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 5',
        //   price:1250000
        // },
        // 6:{
        //   id:6,
        //   img:'http://localhost/cofanew/wp-content/uploads/2023/05/giuong-tang-tre-em-3.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 6',
        //   price:1850000
        // },
        // 7:{
        //   id:7,
        //   img:'http://localhost/cofanew/wp-content/uploads/2023/05/giuong-tang-tre-em-4.jpg',
        //   title:'Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau 7',
        //   price:1950000
        // },
      },
      // ho tro
      selected_sp:{
        name:'',
        is_show_pp_sp:false,
        index:-1,
        rs:[],
        text:'',
      },
      omg:'false'
    }
  }
  async componentDidMount(){
    let {id,type}=this.props;
    let {data}=this.state;
    let list_sp=await get_list_sp(id)
    if(type=="create"){
      this.setState({list_sp})
    }else if(type=="copy"){
      let a=await get_category_detail(id);
      if(a.id!=undefined){
        a.id=-1;
        this.setState({data:a,list_sp})
      }else{
        data.id=-1;
        data.title=a.title;
        this.setState({data:data})
      }
    }else if(type=="edit"){
      let a=await get_category_detail(id);
      if(a.id!=undefined){
        this.setState({data:a,list_sp})
      }else{
        data.id=id;
        data.title=a.title;
        this.setState({data:data,omg:'true',list_sp})
      }
    };
    
  }

  render() {
    let {data,list_sp,selected_sp}=this.state;
    let text_selected_sp_id='';
    return (
      <div className='wrap-editer-post'>
        <Container>
          <Header as='h1'>*{this.props.type=="edit"?"Cập nhật":"Tạo mới"}</Header>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={4} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <div className='re'>
                  <Input_img
                    is_muti={false}
                    fs_result={(rs) => {
                      let {data}=this.state;
                      data.thumnail=rs[0];
                      this.setState({ data: data })
                    }}
                  />
                  <Image
                    floated='right'
                    size='tiny'
                    src={data.thumnail.url300}
                    className='thuasda'
                  />
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={12}>
                <Form>
                  <Header as='h4'>*Tiêu đề Danh mục</Header>
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
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Giá trị chuyển đổi trung bình</Header>
                  <Input
                    fluid
                    type='number'
                    value={data.price_ss}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.price_ss=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
            
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h4'>*Mô tả ngắn</Header>
                  <TextArea placeholder='...' style={{ minHeight: 80 }}
                    fluid
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
          <Header as='h1' textAlign="center">*Xu hướng mua sắm</Header>
          <div className='re'>
              <Grid>
                <Grid.Column width={16}>
                  <Segment className='re'>
                    <Table singleLine>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={5}>Tên</Table.HeaderCell>
                            <Table.HeaderCell width={8}>URL</Table.HeaderCell>
                            <Table.HeaderCell width={3}>thumnail</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                          {
                            data.related_list.map((e,i)=>{
                              return <Table.Row key={i}>
                                        <Table.Cell className='re'>
                                            {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                              onClick={()=>{
                                                let {data}=this.state;
                                                data.related_list=moveElement(data.related_list,i,i-1);
                                                this.setState({data:data})
                                              }}
                                            ></i>}
                                            <input type="text" className="danh-input" placeholder="Giường sắt..." 
                                              value={e.name}
                                              onChange={(e)=>{
                                                let {data}=this.state;
                                                data.related_list[i].name=e.target.value;
                                                this.setState({data:data})
                                              }}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <input className="danh-input" placeholder="https://" type="text"
                                                value={e.url}
                                                onChange={(e)=>{
                                                  let {data}=this.state;
                                                  data.related_list[i].url=e.target.value;
                                                  this.setState({data:data})
                                                }}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                          <div className='re'>
                                            <Input_img
                                              size={"mini"}
                                              is_muti={false}
                                              fs_result={(rs) => {
                                                let {data}=this.state;
                                                data.related_list[i].thumnail=rs[0].url150;
                                                this.setState({ data: data })
                                              }}
                                            />
                                            <img src={e.thumnail} className='thuim'/>
                                          </div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <i className="fa-solid fa-trash edit-db"
                                              onClick={()=>{
                                                if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                                  let {data}=this.state;
                                                  data.related_list.splice(i,1);
                                                  this.setState({data:data})
                                                }
                                              }}
                                            ></i>
                                        </Table.Cell>
                                    </Table.Row>
                            })
                          }
                          
                        </Table.Body>
                    </Table>
                    <div className='add-tbatx'><Button primary icon='add square'
                      onClick={()=>{
                        let {data}=this.state;
                        data.related_list.push({
                          name:'',
                          url:'',
                          thumnail:''
                        })
                        this.setState({data:data})
                      }}
                    /></div>
                  </Segment>
                </Grid.Column>
              </Grid>
          </div>
          <Header as='h1' textAlign="center">*Nội dung chính</Header>
          <div className='re'>
            <Segment>
              <Grid>
                <Grid.Column width={16}>
                  <div className='wrap-x'>
                    <div className='text-dt' style={{maxHeight:'168px'}}>
                      <div  dangerouslySetInnerHTML={{__html: data.long_des}}></div>
                    </div>
                  </div>
                </Grid.Column>
                 
              </Grid>
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
          {/*  */}
          <div>
            <Header as='h1' textAlign="center">*Phân loại sản phẩm </Header>
            <Button content='Thêm phân loại' icon='add' labelPosition='right' color="blue" size='large'
              onClick={()=>{
                let {data}=this.state;
                data.dm.push({
                  name:"",
                  sp_list_id:[],
                  is_template_large:false
                })
                this.setState({data:data})
              }}
            />
          </div>
          {
            data.dm.map((e,i)=>{
              return <Segment key={i}>
              <Grid>
                <Grid.Column width={16} className='headerx re'>
                    <Form>
                      <Input
                      placeholder='Nhập nội dung ở đây...'
                      value={e.name}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.dm[i].name=value;
                        this.setState({data:data})
                      }}
                      />
                    </Form>
                    {i>0&&<i className="fa-solid fa-hand-point-up up1 hv"
                        onClick={()=>{
                          let {data}=this.state;
                          data.dm=moveElement(data.dm,i,i-1);
                          this.setState({data:data})
                        }}
                    ></i>}
                    <i className="fa-solid fa-trash abs hv" style={{left:"16px",top:"16px"}}
                        onClick={()=>{
                          if(window.confirm(`Xác nhận xóa : "${e.name}"`)){
                            let {data}=this.state;
                            data.dm.splice(i,1);
                            this.setState({data:data})
                          }
                        }}
                    ></i>
                    <div className='abs' style={{top:"0px",left:"-188px"}}>
                      <Form>
                          <Checkbox toggle label={e.is_template_large?'Giao diện lớn':'Giao diện nhỏ'} style={{margin:"26px"}}
                            checked={e.is_template_large==true?true:false}
                            onChange={() => {
                              let {data}=this.state;
                              data.dm[i].is_template_large=!data.dm[i].is_template_large;
                              this.setState({data:data})
                            }}
                          />
                      </Form>
                    </div>
                </Grid.Column>
                {
                  e.sp_list_id.map((a,j)=>{
                    if(i>0) text_selected_sp_id+=','+a+',';
                          if(list_sp[a]!=undefined){
                              return <Grid.Column width={4} key={i+''+j}>
                                <Card className='re'>
                                  <Image src={list_sp[a].img.url300} wrapped ui={false} />
                                  <i className="fa-solid fa-x abs hv" style={{right:"16px",top:"16px",fontSize:"20px"}}
                                    onClick={()=>{
                                      if(window.confirm(`Xác nhận xóa : "${list_sp[a].title}"`)){
                                        let {data}=this.state;
                                        data.dm[i].sp_list_id.splice(j,1);
                                        this.setState({data:data})
                                      }
                                    }}
                                  ></i>
                                  {j>0&&<i className="fa-solid fa-left-long abs hv" style={{left:"16px",top:"16px",fontSize:"26px"}}
                                    onClick={()=>{
                                      let {data}=this.state;
                                      data.dm[i].sp_list_id=moveElement(data.dm[i].sp_list_id,j,j-1);
                                      this.setState({data:data})
                                    }}
                                  ></i>}
                                  <Card.Content>
                                  <Header as='h5'>{list_sp[a].title}</Header>
                                    <Card.Meta>
                                      <span className='clr'>{(Number(list_sp[a].price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>
                                    </Card.Meta>
                                  </Card.Content>
                                </Card>
                              </Grid.Column>
                          }
                      })
                    }
              </Grid>
              <Button icon className='add-nxas' color='blue'
                  onClick={()=>{
                    this.setState({
                      selected_sp:{
                        name:e.name,
                        is_show_pp_sp:true,
                        index:i,
                        rs:[],
                        text:''
                      }
                    })
                  }}
              >
                <Icon name='add' />
              </Button>
            </Segment>
            })
          }
     
          {/*  */}
        </Container>

        <div className='footer-edit'>
          <Button size='medium' color='grey' onClick={()=>this.props.fs_close()}>Hủy</Button>
          <Button primary className='createx' loading={this.state.loading_server}
            onClick={async()=>{
              let {data,omg,list_sp}=this.state;
              // xu ly xoa bo id
              for (const item of data.dm) {
                for (let i = item.sp_list_id.length - 1; i >= 0; i--) {
                  const spId = item.sp_list_id[i];
                  if (!list_sp[spId]) {
                    item.sp_list_id.splice(i, 1);
                  }
                }
              }
              //
              if(data.title.length>4){
                if(!this.state.loading_server){
                  let rs={
                    omg:omg,
                    id:data.id,
                    title:data.title,
                    thumnail:JSON.stringify(data.thumnail),
                    short_des:data.short_des,
                    price_ss:data.price_ss,
                    related_links:JSON.stringify(data.related_list),
                    json_data:JSON.stringify(data)
                  }
                  this.setState({loading_server:true})
                  let a=await action_create_edit_category(rs)
                  if(a.status){
                    let rs_change= {
                      id:a.id,
                      thumnail:data.thumnail,
                      title:a.title,
                      url:a.url,
                      defaultCategory:a.defaultCategory,
                    }
                    if(data.id==-1){
                      toast.success('Tạo mới thành công.', { theme: "colored" });
                    }else{
                      toast.success('Cập nhật thành công', { theme: "colored" });
                    }
                    this.props.fs_change_category(data.id,rs_change)
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
          >{this.props.type=="edit"?"Cập nhật":"Tạo mới"}</Button>
        </div>
        {this.state.editer_option.is_open && <Editer
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
          {selected_sp.is_show_pp_sp&&<div>
            <div className='card-sp'
                onClick={(e)=>{
                  if (e.target.classList.contains('card-sp')) {
                    this.setState({
                      selected_sp:{
                        is_show_pp_sp:false,
                        index:-1,
                        rs:[],
                        text:''
                      }
                    })
                  }
                }}
            >
            <Container>
              <Segment>
                <Grid className='re'>
                  {
                    Object.keys(list_sp).map((key, i)=> {
                      if(text_selected_sp_id.search(","+key+",")===-1||selected_sp.index===0){
                        let {selected_sp}=this.state;
                        let active1=selected_sp.text.search(","+key+",")==-1?false:true;
                        return <Grid.Column width={4} key={key} >
                        <Card as={'div'} className={active1?'re cs active1':'re'} onClick={()=>{
                          if(active1){// co
                            selected_sp.rs.splice(i,1);
                            selected_sp.text=selected_sp.text.replace(","+key+",","");
                          }else{// chua active
                            selected_sp.rs.push(key);
                            selected_sp.text+=","+key+",";
                          }
                          this.setState({selected_sp:selected_sp})
                        }}>
                          <Image src={list_sp[key].img.url300} wrapped ui={false} />
                          <Card.Content>
                          <Header as='h5'>{list_sp[key].title}</Header>
                            <Card.Meta>
                              <span className='clr'>{(Number(list_sp[key].price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      </Grid.Column>;
                      }
                    })
                  }
 
                </Grid>
              </Segment>
            </Container>
            <section className='ttxs'><Container><b>{selected_sp.name}</b></Container></section>
            </div>
            <div className='btn-okx'>
                <Button color='brown'
                    onClick={()=>{
                    this.setState({
                      selected_sp:{
                        is_show_pp_sp:false,
                        index:-1,
                        rs:[],
                        text:''
                      }
                    })
                  }}
                >Hủy</Button>
                <Button className='mgl-50' color='violet' 
                  onClick={()=>{
                    let {data,selected_sp}=this.state;
                    if(selected_sp.rs.length>0){
                      data.dm[selected_sp.index].sp_list_id=[...data.dm[selected_sp.index].sp_list_id,...selected_sp.rs]
                    }
                    selected_sp={
                      is_show_pp_sp:false,
                      index:-1,
                      rs:[],
                      text:''
                    }
                    this.setState({data:data,selected_sp:selected_sp})

                  }}
                >OK</Button>
            </div>
          </div>}
      </div>
    );
  }
}

