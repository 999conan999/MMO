import React, { Component } from 'react';
import Editer from '../lib/editer/Editer';
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container, Grid, Button, Dropdown, Segment, Input,Icon, Image, Table, Header, TextArea, Form,Card } from 'semantic-ui-react'
const test_html='<p>Giường được làm bằng sắt ống tròn phi 49, có thể tháo ráp dễ dàng.</p> <p>Giường được sơn bằng&nbsp;<span style="color: rgb(186, 55, 42);"><strong>sơn tĩnh điện</strong></span>&nbsp;chống rỉ sét.</p> <p>Hỗ trợ kích thước:&nbsp;<span style="color: rgb(186, 55, 42);"><strong>80cmx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1mx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m2x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m4x2m</strong></span>, <span style="color: rgb(186, 55, 42);"><strong>1m6x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m8x2m</strong></span>.</p> <p><strong>Giá rẻ nhất</strong>&nbsp;trong các dòng giường sắt, sử dụng cũng khá bền.&nbsp;<span style="color: rgb(186, 55, 42);"><strong>Nếu như các bạn đang cần một chiếc giường và không cần quá cầu kì, thì đây là sự lựa chọn giúp bạn tiết kiệm khá nhiều chi phí đấy nhé!</strong></span></p>'
export default class Editer_category extends Component {
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
                        <Table.Row>
                            <Table.Cell>
                                <input type="text" className="danh-input" placeholder="1m x 2m..." />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input" placeholder="https://" type="text" />
                            </Table.Cell>
                            <Table.Cell>
                                <div className='re'>
                                  <Button icon>
                                    <Icon name='medrt' />
                                  </Button>
                                  <img src='https://gotrangtri.vn/wp-content/uploads/2020/11/ban-hoc-sinh.png' className='thuim'/>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"></i>
                            </Table.Cell>
                        </Table.Row>
                
                        </Table.Body>
                    </Table>
                    <div className='add-tbatx'><Button primary icon='add square'/></div>
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
                      <div  dangerouslySetInnerHTML={{__html: test_html}}></div>
                    </div>
                  </div>
                </Grid.Column>
                 
              </Grid>
            </Segment>
            <div className='editxx'>
              <Button content='Chỉnh sửa nội dung' primary />
            </div>
          </div>
          {/*  */}
          <div>
            <Header as='h1' textAlign="center">*Phân loại sản phẩm </Header>
            <Button content='Thêm phân loại' icon='add' labelPosition='right' color="blue" size='large'/>
          </div>
            <Segment>
              <Grid>
                <Grid.Column width={16} className='headerx re'>
                    <Form>
                      <Input
                      // label={{ icon: 'asterisk' }}
                      // labelPosition='left corner'
                      placeholder='Nhập nội dung ở đây...'
                      // value={text}
                      // onChange={(e,{value}) => {
                      //   this.props.fs_result(value)
                      // }}
                      />
                    </Form>
                    <i className="fa-solid fa-hand-point-up up1 hv"></i>
                    <i className="fa-solid fa-trash abs hv" style={{left:"16px",top:"16px"}}></i>
                </Grid.Column>
                <Grid.Column width={4} >
                  <Card className='re'>
                    <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                    <i className="fa-solid fa-x abs hv" style={{right:"16px",top:"16px",fontSize:"20px"}}></i>
                    <i className="fa-solid fa-left-long abs hv" style={{left:"16px",top:"16px",fontSize:"26px"}}></i>
                   
                    <Card.Content>
                    <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                      <Card.Meta>
                        <span className='clr'>1.250.000đ</span>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={4} >
                  <Card className='re'>
                    <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                    <i className="fa-solid fa-x abs hv" style={{right:"16px",top:"16px",fontSize:"20px"}}></i>
                    <i className="fa-solid fa-left-long abs hv" style={{left:"16px",top:"16px",fontSize:"26px"}}></i>
                    <Card.Content>
                    <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                      <Card.Meta>
                        <span className='clr'>1.250.000đ</span>
                      </Card.Meta>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid>
              <Button icon className='add-nxas' color='blue'>
                <Icon name='add' />
              </Button>
            </Segment>
          {/*  */}
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
          {false&&<div><div className='card-sp'>
            <Container>
              <Segment>
                <Grid className='re'>
                  <Grid.Column width={4} >
                    <Card className='re cs active1'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column width={4} >
                    <Card className='re'>
                      <Image src='https://anbinhnew.com/wp-content/uploads/2023/04/giuong-ngu-giuong-sat-don-gian-mau-den-gia-re.jpg' wrapped ui={false} />
                      <Card.Content>
                      <Header as='h5'>Giường sắt giá rẻ bán tại Hồ Chí Minh, Vũng Tàu, Cà Mau</Header>
                        <Card.Meta>
                          <span className='clr'>1.250.000đ</span>
                        </Card.Meta>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </Grid>
              </Segment>
            </Container>
            </div>
            <div className='btn-okx'>
                <Button color='violet' >OK</Button>
            </div>
          </div>}
      </div>
    );
  }
}

