import React, { Component } from 'react';
import './post.css'
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Table,Grid,Button,Dropdown,Segment,Input,Image,Icon } from 'semantic-ui-react'
import Editer_post from './editer_post';
export default class Posts extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // data:[],
        test:[
          { text: 'Hiển thị tất cả danh mục', value: 'English' },
          {text: 'Giường sắt', value: 'French' },
          { text: 'GIường ngủ', value: 'Spanish' },
          {text: 'giường gỗ', value: 'German' },
          { text: 'Chinese', value: 'Chinese' },
        ],
        selected_test:'English',
        selected_test_arr:[]
      
    }
  }
  render() {
      return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={4}>
                  <div className='tao-moi-post '>
                    <Button content='Tạo mới' icon='add' labelPosition='right' color="blue" size='large'/>
                  </div>
                </Grid.Column>
                <Grid.Column width={12}></Grid.Column>
                <Grid.Column width={6}>
                <Button.Group size='mini' >
                    <Button color='blue'>Hiển thị tất cả</Button>
                    <Button.Or />
                    <Button>Chỉ hiển thị bài viết</Button>
                    <Button.Or />
                    <Button>Chỉ hiển thị sản phẩm</Button>
                  </Button.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Dropdown  
                    value={this.state.selected_test}
                    options={this.state.test}
                    onChange={(e,{value}) => {
                      this.setState({selected_test:value})
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Dropdown  
                    value={this.state.selected_test}
                    options={this.state.test}
                    onChange={(e,{value}) => {
                      this.setState({selected_test:value})
                    }}
                  />
                </Grid.Column>
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
                        <Table.HeaderCell width={4}>Tiêu đề: <Input transparent placeholder='Search...' size='tiny' /></Table.HeaderCell>
                        <Table.HeaderCell width={1}>Đã bán</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Type  <Button size='mini' basic icon="sort amount down"/></Table.HeaderCell>
                        <Table.HeaderCell width={3}>Link to KeyWord</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái <Button size='mini' basic >All</Button> </Table.HeaderCell>
                        <Table.HeaderCell width={4}>Điều chỉnh</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Best Seller</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      <Table.Row className='todo'>
                      {/* <Table.Row className='active-da'> */}
                        <Table.Cell>176</Table.Cell>
                        <Table.Cell textAlign='middle'>
                          <Image src='https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg' className='imgthm'/>
                        </Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell >
                          <div className='re'>
                            <span className='colz'>165</span>
                            <i className="fa-solid fa-pen-to-square edit-db"></i>
                            {false&&<div className='keyworsx xasd'>
                              <Input  placeholder='165' className="input-1" type='number' />
                              <div className='huhvx'>
                                  <Button content='Primary' primary />
                                  <Button content='Secondary' secondary />
                              </div>
                            </div>}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <a className='tagx'>S.P</a>
                          <a className='tagx colrfs'>B.V</a>
                        </Table.Cell>
                        <Table.Cell>
                          <div><b>Giường sắt ống tròn </b> (3) 
                            <Button  icon='edit' basic className='border-non' />
                          </div>
                          {false&&<div className='re'>
                            <div className='keyworsx'>
                             <p><b>*Chọn từ khóa cần link tới (Lưu ý: chỉ chọn được <span style={{color:"blue"}}>3 từ</span>)</b></p>
                             <p><b>*Từ khóa chính hiện tại <span style={{color:"blue"}}>Giường sắt ống tròn</span>)</b></p>
                              <Dropdown
                                search
                                options={this.state.test}
                                placeholder='...'
                                multiple
                                selection
                                fluid
                                value={this.state.selected_test_arr}
                                onChange={(e, { value }) => {
                                  this.setState({selected_test_arr:value})
                                }}
                              />
                              <div className='huhvx'>
                                  <Button content='Primary' primary />
                                  <Button content='Secondary' secondary />
                              </div>
                            </div>
                          </div>}
                        </Table.Cell>
                        <Table.Cell>
                          <Button content='Riêng tư' basic size="mini" />
                          {/* <Button positive  size="mini">Công khai</Button> */}
                        </Table.Cell>
                        <Table.Cell>
                          <Button animated='vertical'>
                            <Button.Content hidden >Xóa</Button.Content>
                            <Button.Content visible>
                              <Icon name='trash alternate' />
                            </Button.Content>
                          </Button>
                          <Button animated='vertical'>
                            <Button.Content hidden>Copy</Button.Content>
                            <Button.Content visible>
                              <Icon name='copy' />
                            </Button.Content>
                          </Button>
                          <Button animated='vertical'>
                            <Button.Content hidden>Edit</Button.Content>
                            <Button.Content visible>
                              <Icon name='edit' />
                            </Button.Content>
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Icon name='star' size='big' className='star-clo-1'/>
                          {/* <Button circular icon='star' size='big' color='gray'/> */}
                        </Table.Cell>
                      </Table.Row>
                      
                       
                    
                    </Table.Body>

                    <Table.Footer  className='foot-tbaks'>
                      <Table.Row>
                        <Table.HeaderCell colSpan='8'>
                          <div style={{textAlign:"center"}}>
                            <span className="op">Xem thêm</span>
                          </div>
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Footer>
                  </Table>
                </Segment>
              </Grid.Column>
              {/* <Editer_post/> */}
              {false&&<div className='dimerz'></div>}
        </React.Fragment>
      );
  }
}

