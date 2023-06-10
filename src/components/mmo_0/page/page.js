import React, { Component } from 'react';
import '../post/post.css'
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_page from './editer_page';
export default class Pages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        {
          id:1,
          thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
          title:'Giường sắt ống tròn',
          status:'publish',
          url:"#"
        },
        {
          id:2,
          thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
          title:'Giường sắt hộp 4x8',
          status:'publish',
          url:"#"
        },
        {
          id:3,
          thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
          title:'Giường sắt hộp 5x10',
          status:'private',
          url:"#"
        },
      ],
      //ho tro
      control_edit:{
        is_open:false,
        id:-1,
        type:""
      },
      //
      text_check:"",
      //
      search_id:"",
      search_title:"",
      search_status:"All",
    }
  }
  async componentDidMount(){
    let text_check= localStorage.getItem("page_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    this.setState({text_check:text_check})
  }
  render() {
    let {data,control_edit,text_check,search_id,search_title,search_status}=this.state;
    // search id
    if(search_id.length>0){
      data=data.filter((e)=>e.id==search_id)
    }
    // search id
    if(search_title.length>0){
      data=data.filter((e)=>{
        var normalizedTitle = e.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        var normalizedSearchTitle = search_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return normalizedTitle.search(normalizedSearchTitle)>-1 ;
      })
    } 
    // search id
    if(search_status!="All"){
      data=data.filter((e)=>e.status==search_status)
    }
    return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={4}>
                  <div className='tao-moi-post mgb-8'>
                    <Button content='Tạo trang mới' icon='add' labelPosition='right' color="blue" size='large'
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
                        <Table.HeaderCell width={4}>Tiêu đề:  <Input transparent placeholder='Search...' size='tiny'
                              value={search_title}
                              onChange={(e,{value})=>{
                                this.setState({search_title:value})
                              }}
                        /></Table.HeaderCell>
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
                        <Table.HeaderCell width={1}>Cache</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          let is_active=text_check.search(","+e.id+",")!=-1?true:false;
                          return <Table.Row className={is_active?'todo active-da':'todo'} key={i}>
                          <Table.Cell
                              onClick={()=>{
                                let {text_check}=this.state;
                                if(is_active){
                                  text_check=text_check.replace(","+e.id+",","");
                                }else{
                                  text_check+=(","+e.id+",");
                                }
                                localStorage.setItem("page_text_index",text_check);
                                this.setState({text_check:text_check})
                              }}
                          >{e.id}</Table.Cell>
                          <Table.Cell textAlign='middle'>
                            <Image src={e.thumnail} className='imgthm'/>
                          </Table.Cell>
                          <Table.Cell><a href={e.url} target='_blank'>{e.title}</a></Table.Cell>
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
                          <Table.Cell><span className='clear-cache'>clear</span></Table.Cell>
                        </Table.Row>
                        })
                      }
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
              {control_edit.is_open&&<Editer_page
                id={control_edit.id}
                type={control_edit.type}
                fs_close={()=>{
                  this.setState({
                    control_edit:{
                      is_open:false,
                      id:-1,
                      type:""
                    }
                  })
                }}
              />}
        </React.Fragment>
      );
  }
}

