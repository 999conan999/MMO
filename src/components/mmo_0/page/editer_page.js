import React, { Component } from 'react';
import Editer from '../lib/editer/Editer';
// import { toast } from 'react-toastify';
import Input_img from '../lib/input_img';
import { Container, Grid, Button, Dropdown, Segment, Input, Image, Checkbox, Header, TextArea, Form } from 'semantic-ui-react'
const test_html='<p>Giường được làm bằng sắt ống tròn phi 49, có thể tháo ráp dễ dàng.</p> <p>Giường được sơn bằng&nbsp;<span style="color: rgb(186, 55, 42);"><strong>sơn tĩnh điện</strong></span>&nbsp;chống rỉ sét.</p> <p>Hỗ trợ kích thước:&nbsp;<span style="color: rgb(186, 55, 42);"><strong>80cmx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1mx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m2x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m4x2m</strong></span>, <span style="color: rgb(186, 55, 42);"><strong>1m6x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m8x2m</strong></span>.</p> <p><strong>Giá rẻ nhất</strong>&nbsp;trong các dòng giường sắt, sử dụng cũng khá bền.&nbsp;<span style="color: rgb(186, 55, 42);"><strong>Nếu như các bạn đang cần một chiếc giường và không cần quá cầu kì, thì đây là sự lựa chọn giúp bạn tiết kiệm khá nhiều chi phí đấy nhé!</strong></span></p>'
export default class Editer_page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // data:[],
      test: [
        { text: 'Hiển thị tất cả danh mục', value: 'English' },
        { text: 'French', value: 'French' },
        { text: 'Spanish', value: 'Spanish' },
        { text: 'German', value: 'German' },
        { text: 'Chinese', value: 'Chinese' },
      ],
      selected_test: 'English',
      selected_test_arr: [],
      //
      editer_option:{
        is_open:false,
        text_html:'',
        index:-1
      },
      // main
      data:{
        thumnail:'',
        title:'',
        key_word:'',
        short_des:'',
        long_des:test_html
      }
    }
  }
  render() {
    let {data}=this.state
    return (
      <div className='wrap-editer-post'>
        <Container>
          <Header as='h1'>*Tạo trang mới</Header>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={4} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <div className='re'>
                  <Input_img
                    is_muti={false}
                    fs_result={(rs) => {
                      let {data}=this.state;
                      data.thumnail=rs[0].url;
                      this.setState({ data: data })
                    }}
                  />
                  <Image
                    floated='right'
                    size='tiny'
                    src={data.thumnail}
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
        <div style={{display:"inline-block",paddingRight:"50px"}}>
            <Dropdown 
              value={this.state.selected_test}
              options={this.state.test}
              onChange={(e, { value }) => {
                this.setState({ selected_test: value })
              }}
            />
          </div>
          <Button size='medium' color='grey'>Hủy</Button>
          <Button primary className='createx'>Tạo bài viết mới</Button>
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

