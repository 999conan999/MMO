import React, { Component } from 'react';
import Editer from '../lib/editer/Editer';
import { toast } from 'react-toastify';
import Input_img from '../lib/input_img';
import { Container, Grid, Button, Segment, Input, Image, Dropdown, Header, TextArea, Form } from 'semantic-ui-react'
 import {action_create_or_edit_post,get_infor_post} from '../lib/axios'
export default class Editer_page extends Component {
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
        key_word:'',
        short_des:'',
        long_des:'',
        status:'private'
      }
    }
  }
  async componentDidMount(){
    let {id,type}=this.props;
    let {data}=this.state;
 
    if(type=="create"){
    }else if(type=="copy"){
      let data=await get_infor_post(id);
      if(data.id!=undefined){
        data.id=-1;
        this.setState({data:data})
      }else{
        toast.info("Lỗi rồi", { theme: "colored" })
      }
    }else if(type=="edit"){
      let data=await get_infor_post(id);
      if(data.id!=undefined){
        this.setState({data:data })
      }else{
        toast.info("Lỗi rồi", { theme: "colored" })
      }
    }

  }
  render() {
    let {data}=this.state
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
              <Grid.Column width={4}>
                <Header as='h4'>*Từ khóa Chính (cần SEO):</Header>
                <Input
                  fluid
                  value={data.key_word}
                  onChange={(e,{value}) => {
                    let {data}=this.state;
                    data.key_word=value;
                    this.setState({ data: data })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Form>
                  <Header as='h4'>*Tiêu đề trang</Header>
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
            
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
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
          <Header as='h1' textAlign="center">*Nội dung chính</Header>
          <div className='re'>
            <Segment>
              <Grid>
                <Grid.Column width={16}>
                  <div className='wrap-x'>
                    <div className='text-dt' style={{maxHeight:'122px'}}>
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
        </Container>

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
          <Button size='medium' color='grey' onClick={()=>this.props.fs_close()}>Hủy</Button>
          <Button primary className='createx'
            onClick={async()=>{
              let {data}=this.state;
              console.log("🚀 ~ file: editer_page.js:161 ~ Editer_page ~ render ~ data:", data)
              if(data.title.length>8){
                let rs={
                  id:data.id,
                  category_id:-1,
                  json_data:JSON.stringify(data),
                  thumnail:JSON.stringify(data.thumnail),
                  title:data.title,
                  price:0,
                  quantity_sold:0,
                  key_word:data.key_word,
                  related_keyword:JSON.stringify([]),
                  status:data.status,
                  is_best_seller:'false',
                  type:'page',
                  short_des:data.short_des
                }
                let a=await action_create_or_edit_post(rs);
                if(a.status){
                  let rs_change={
                    id:a.id,
                    thumnail:data.thumnail,
                    title:data.title,
                    key_word:data.key_word,
                    price:0,
                    quantity_sold:0,
                    type:'page',
                    related_keyword:[],
                    status:data.status,
                    is_best_seller:'false',
                    url:a.url
                  }
                  if(data.id==-1){
                    toast.success('Tạo mới thành công.', { theme: "colored" });
                  }else{
                    toast.success('Cập nhật thành công', { theme: "colored" });
                  }
                  this.props.fs_change_page(data.id,rs_change)
                }else{
                  toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
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
      </div>
    );
  }
}

