import React, { Component } from 'react';
import '../post/post.css'
// import { toast } from 'react-toastify';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react';
import Editer_attribute from './editer_attribute';
export default class Attribute extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
        data:[
          {
            id:1,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
            name:'Giường sắt ống tròn',
            tag:'Giường ngủ',
            price:1250000,
            price_ss:300000,
          },
          {
            id:2,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg',
            name:'Giường sắt hộp 4x8',
            tag:'Giường ngủ',
            price:2250000,
            price_ss:400000,
          },
          {
            id:3,
            thumnail:'https://anbinhnew.com/wp-content/uploads/2023/04/giuong-cho-ba-de.jpg',
            name:'Giường sắt hộp 5x10',
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
        text_check:""

    }
  }
  async componentDidMount(){
    let text_check= localStorage.getItem("attr_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    this.setState({text_check:text_check})
  }
  render() {
    let {data,control_edit,text_check}=this.state;
      return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={4}>
                  <div className='tao-moi-post pdt-50 mgb-8'>
                    <Button content='Tạo thuộc tính mới' icon='add' labelPosition='right' color="blue" size='large'
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
                        <Table.HeaderCell width={1} className='idzx'>id <Input transparent placeholder='Search...' size='tiny' type='number'/></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Thumnail</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Tên thuộc tính</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Tag <Input transparent placeholder='Search...' size='tiny' type='number'/></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Giá ban đầu</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Giá trị chuyển đổi</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Điều chỉnh</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Active</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          let is_active=text_check.search(","+e.id+",")!=-1?true:false;
                          return <Table.Row className={is_active?'todo active-da':'todo'} key={i}>
                            <Table.Cell>{e.id}</Table.Cell>
                            <Table.Cell textAlign='middle'>
                              <Image src={e.thumnail} className='imgthm'/>
                            </Table.Cell>
                            <Table.Cell>{e.name}</Table.Cell>
                            <Table.Cell>
                              <a className='tagx colrfs'>{e.tag}</a>
                            </Table.Cell>
                            <Table.Cell>
                            {(Number(e.price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}
                            </Table.Cell>
                            <Table.Cell>
                              <b style={{color:"blue"}}>{(Number(e.price_ss)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</b>
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
                              <Button circular icon='quidditch' size='big' color='gray'
                                  onClick={()=>{
                                    let {text_check}=this.state;
                                    if(is_active){
                                      text_check=text_check.replace(","+e.id+",","");
                                    }else{
                                      text_check+=(","+e.id+",");
                                    }
                                    localStorage.setItem("attr_text_index",text_check);
                                    this.setState({text_check:text_check})
                                  }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        })
                      }
                      
                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
              {control_edit.is_open&&<Editer_attribute
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

