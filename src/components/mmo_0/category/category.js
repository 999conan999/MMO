import React, { Component } from 'react';
import '../post/post.css'
import { toast } from 'react-toastify';
import {get_categorys,delete_category,action_clear_cache_term} from '../lib/axios'
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_category from './editer_category';
export default class Categorys extends Component {
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
      search_title:"",
      is_loading:true
    }
  }
  async componentDidMount(){
    let text_check= localStorage.getItem("cate_text_index");
    if(text_check==null||text_check==undefined) text_check="";
    let a=await get_categorys();
    if(a.length>0){
      this.setState({text_check:text_check,data:a,is_loading:false})
    }else{
      this.setState({text_check:text_check,is_loading:false})
    }

  }
  render() {
    let {data,control_edit,text_check,search_id,search_title,is_loading}=this.state;
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
                  loading={is_loading}
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
                            <Image src={e.thumnail.url300} className='imgthm'/>
                          </Table.Cell>
                          <Table.Cell><a href={e.url} target='_blank'>{e.title}</a>{e.defaultCategory?' (Danh mục mặc định)':""}</Table.Cell>
                          <Table.Cell>
                            {!e.defaultCategory&&<Button animated='vertical'
                              onClick={async()=>{
                                if(window.confirm(`Xác nhận Xóa:"${e.title}"`)){
                                  let {data}=this.state;
                                  let a=await delete_category({
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
                            </Button>}
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
                          <Table.Cell><span className='clear-cache'
                              onClick={async()=>{
                                let a= await action_clear_cache_term(e.id);
                                if(a.status){
                                  toast.success('Cập nhật thành công.', { theme: "colored" });
                                }else{
                                  toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                }
                              }}
                          >clear</span></Table.Cell>
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
                  fs_change_category={(id,rs) => {
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
}

