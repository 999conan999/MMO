import React, { Component } from 'react';
import Editer from '../lib/editer/Editer';
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
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
      }
    }
  }
  render() {
    return (
      <div className='wrap-editer-post'>
        <Container>
          <Header as='h1'>*Tạo trang mới</Header>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={4} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <button className='buzz re'
                //   onClick={()=>{
                //     let keyLock=makeid(6);
                //     this.setState({
                //         selected_img:{
                //             type:keyLock,
                //         }
                //     });
                //     this.props.openAction({
                //         type:"OPEN",
                //         is_muti_selected:false,
                //         keyLock:keyLock
                //     })
                // }}
                >
                  <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                  <Image
                    floated='right'
                    size='tiny'
                    src={'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg'}
                    className='thuasda'
                  />
                </button>
              </Grid.Column>
            </Grid>
          </div>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={4}>
                <Header as='h4'>*Từ khóa Chính (cần SEO):</Header>
                <Input
                  className="input-1"
                // label={{ icon: 'asterisk' }}
                // labelPosition='left corner'
                // placeholder='...'
                // value={text}
                // onChange={(e,{value}) => {
                //   this.props.fs_result(value)
                // }}
                />
              </Grid.Column>
              <Grid.Column width={12}>
                <Form>
                  <Header as='h4'>*Tiêu đề trang</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                  // placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
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
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>

            </Grid>
          </div>
          <Header as='h1' textAlign="center">*Nội dung chính</Header>
          <div>
            <Segment>
              <Grid>
                <Grid.Column width={16}>
                  <div className='wrap-x'>
                    <div className='text-dt' style={{maxHeight:'122px'}}>
                      <div  dangerouslySetInnerHTML={{__html: test_html}}></div>
                    </div>
                  </div>
                </Grid.Column>
                 
              </Grid>
            </Segment>
            <div style={{textAlign:"center"}}>
              <Button content='Chỉnh sửa nội dung' primary />
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
        {this.state.editer_option.is_open&&<Editer
              close={()=>this.setState({editer_option:{is_open:false,text_html:'',index:-1}})}
              data={this.state.editer_option.text_html}
              rs_data={(rs) => {
                 console.log("🚀 ~ file: editer_post.js:240 ~ Editer_post ~ render ~ rs:", rs)
                // let {data}=this.props;
                // data[editer_option.index]=rs;
                // this.props.fs_return(data)
                // this.setState({editer_option:{is_open:false,text_html:'',index:-1}});
                
              }}
          />}
      </div>
    );
  }
}

