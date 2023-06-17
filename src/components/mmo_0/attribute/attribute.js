import React, { Component } from 'react';
import '../post/post.css'
import { toast } from 'react-toastify';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react';
import Editer_attribute from './editer_attribute';
import {get_attributes,delete_attribute} from '../lib/axios'
export default class Attribute extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
        data:[
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
        search_tag:"",

    }
  }
  async componentDidMount(){
    let text_check= localStorage.getItem("attr_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    let data=await get_attributes();
    if(data.length>0){
      this.setState({text_check:text_check,data:data})
    }else{
      this.setState({text_check:text_check})
    }
    
  }
  render() {
    let {data,control_edit,text_check,search_id,search_tag}=this.state;
    // search id
    if(search_id.length>0){
      data=data.filter((e)=>e.id==search_id)
    }
    // search id
    if(search_tag.length>0){
      data=data.filter((e)=>{
        var normalizedTitle = e.tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        var normalizedSearchTitle = search_tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return normalizedTitle.search(normalizedSearchTitle)>-1 ;
      })
    }
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
                        <Table.HeaderCell width={1} className='idzx'>id <Input transparent placeholder='Search...' size='tiny' type='number'
                          value={search_id}
                          onChange={(e,{value})=>{
                            this.setState({search_id:value})
                          }}
                        /></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Thumnail</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Tên thuộc tính</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Tag <Input transparent placeholder='Search...' size='tiny'
                          value={search_tag}
                          onChange={(e,{value})=>{
                            this.setState({search_tag:value})
                          }}
                        /></Table.HeaderCell>
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
                            <Table.Cell>{e.title}</Table.Cell>
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
                              <Button animated='vertical'
                                onClick={async()=>{
                                if(window.confirm(`Xác nhận Xóa:"${e.title}"`)){
                                  let {data}=this.state;
                                  let a=await delete_attribute({
                                    id:e.id
                                  })
                                  if(a.status){
                                    data.splice(i,1)
                                    toast.success('Xóa thành công.', { theme: "colored" });
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
                fs_change_attribute={(id,rs)=>{
                  let {data}=this.state;
                  if(id==-1){
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
        </React.Fragment>
      );
  }
}

