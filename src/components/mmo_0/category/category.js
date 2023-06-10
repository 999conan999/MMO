import React, { Component } from 'react';
import '../post/post.css'
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_category from './editer_category';
export default class Categorys extends Component {
  constructor (props) {
    super(props)
    this.state = {
        // main
        data:[
          {
            id:1,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
            title:'Giường sắt ống tròn',
            tag:'Giường ngủ',
            price:1250000,
            price_ss:300000,
          },
          {
            id:2,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
            title:'Giường sắt hộp 4x8',
            tag:'Giường ngủ',
            price:2250000,
            price_ss:400000,
          },
          {
            id:3,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
            title:'Giường sắt hộp 5x10',
            tag:'Giường ngủ',
            price:3250000,
            price_ss:500000,
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
    }
  }
  async componentDidMount(){
    let text_check= localStorage.getItem("cate_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    this.setState({text_check:text_check})
  }
  render() {
    let {data,control_edit,text_check,search_id,search_title}=this.state;
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
                        <Table.HeaderCell width={4}>Tiêu đề: <Input transparent placeholder='Search...' size='tiny'
                              value={search_title}
                              onChange={(e,{value})=>{
                                this.setState({search_title:value})
                              }}
                        /></Table.HeaderCell>
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
                              localStorage.setItem("cate_text_index",text_check);
                              this.setState({text_check:text_check})
                            }}
                          >{e.id}</Table.Cell>
                          <Table.Cell textAlign='middle'>
                            <Image src={e.thumnail} className='imgthm'/>
                          </Table.Cell>
                          <Table.Cell>{e.title}</Table.Cell>
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
             {control_edit.is_open&&<Editer_category
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
              {false&&<div className='dimerz'></div>}
        </React.Fragment>
      );
  }
}

