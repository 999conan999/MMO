import React, { Component } from 'react';
// import '../post/post.css';
import Editer from '../lib/editer/Editer';
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container, Grid, Button, Dropdown, Segment, Input, Image, Checkbox,Table, Header, TextArea, Form } from 'semantic-ui-react'
const test_html='<p>Giường được làm bằng sắt ống tròn phi 49, có thể tháo ráp dễ dàng.</p> <p>Giường được sơn bằng&nbsp;<span style="color: rgb(186, 55, 42);"><strong>sơn tĩnh điện</strong></span>&nbsp;chống rỉ sét.</p> <p>Hỗ trợ kích thước:&nbsp;<span style="color: rgb(186, 55, 42);"><strong>80cmx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1mx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m2x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m4x2m</strong></span>, <span style="color: rgb(186, 55, 42);"><strong>1m6x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m8x2m</strong></span>.</p> <p><strong>Giá rẻ nhất</strong>&nbsp;trong các dòng giường sắt, sử dụng cũng khá bền.&nbsp;<span style="color: rgb(186, 55, 42);"><strong>Nếu như các bạn đang cần một chiếc giường và không cần quá cầu kì, thì đây là sự lựa chọn giúp bạn tiết kiệm khá nhiều chi phí đấy nhé!</strong></span></p>'
export default class Editer_attribute extends Component {
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
      <div className='wrap-editer-post attr-wrap'>
        <Container>
          <Header as='h1'>*Tạo thuộc tính mới</Header>

          <div className='wrap-s'>
            <Grid>
              {/* <Grid.Column width={16}></Grid.Column> */}
              <Grid.Column width={6}>
                <Form>
                  <Header as='h4'>*Tên thuộc tính</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                    placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                 <Form>
                  <Header as='h4'>*Tag:</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                    placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={6} >
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
            <Header as='h1' textAlign="center">*Thuộc tính giá</Header>
            <Grid>
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Giá ban đầu (hoặc vốn):</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                    placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Giá trị chuyển đổi:</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                    placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Tên gọi của thuộc tính:</Header>
                  <Input
                    className="input-1"
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                    placeholder='Bộ, kích thước, màu sắc'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Bảng giá thuộc tính:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Tên</Table.HeaderCell>
                          <Table.HeaderCell>Giá gốc</Table.HeaderCell>
                          <Table.HeaderCell>Giá khuyến mãi</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                      <Table.Row>
                          <Table.Cell>
                              <input type="text" class="danh-input" placeholder="1m x 2m..." />
                          </Table.Cell>
                          <Table.Cell>
                              <input class="danh-input" placeholder="1200000" type="number" step={50000} />
                          </Table.Cell>
                          <Table.Cell>
                              <input class="danh-input" placeholder="1200000" type="number" step={50000}  />
                          </Table.Cell>
                          <Table.Cell>
                              <i class="fa-solid fa-trash edit-db"></i>
                          </Table.Cell>
                      </Table.Row>
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'/></div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h1' textAlign="center">*Thông số kĩ thuật</Header>
                </Form>
              </Grid.Column>
              <Grid.Column width={12}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Bảng thông số:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>Tên</Table.HeaderCell>
                          <Table.HeaderCell>Thông số</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                      <Table.Row>
                          <Table.Cell>
                              <input type="text" class="danh-input" placeholder="1m x 2m..." />
                          </Table.Cell>
                          <Table.Cell>
                              <input class="danh-input" placeholder="1200000" type="text" step={50000}  />
                          </Table.Cell>
                          <Table.Cell>
                              <i class="fa-solid fa-trash edit-db"></i>
                          </Table.Cell>
                      </Table.Row>
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'/></div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h1' textAlign="center">*Cam kết</Header>
                </Form>
              </Grid.Column>
              <Grid.Column width={12}>
 
                <div className='re'>
                  <Table singleLine>
                      <Table.Body>
                      <Table.Row>
                          <Table.Cell width={14}>
                            <p><Input fluid icon='shield alternate' placeholder='Search...' /></p>
                          </Table.Cell>
                          <Table.Cell width={2}>
                              <i class="fa-solid fa-trash edit-db"></i>
                          </Table.Cell>
                      </Table.Row>
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'/></div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
 
         
          
        </Container>

        <div className='footer-edit'>
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

