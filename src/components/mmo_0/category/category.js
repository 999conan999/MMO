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
                  <div className='tao-moi-post mgb-8'>
                    <Button content='Tạo trang mới' icon='add' labelPosition='right' color="blue" size='large'/>
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
                        <Table.HeaderCell width={4}>Tiêu đề: <Input transparent placeholder='Search...' size='tiny' /></Table.HeaderCell>
                        <Table.HeaderCell width={4}>Tổng số bài viết/ sản phẩm</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái <Button size='mini' basic >All</Button> </Table.HeaderCell>
                        <Table.HeaderCell width={4}>Điều chỉnh</Table.HeaderCell>
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
                        <Table.Cell><span className='colz'>165</span></Table.Cell>
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
              <Editer_category/>
              {false&&<div className='dimerz'></div>}
        </React.Fragment>
      );
  }
}

