import React, { Component } from 'react';
// import { toast } from 'react-toastify';
import Input_img from '../lib/input_img/index'
import { Container, Grid, Button,Input,Checkbox, Image, Table, Header,Form } from 'semantic-ui-react'
export default class Editer_attribute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // main
      data:{
        name:'Giường sắt ống tròn',
        tag:'Giường sắt',
        thumnail:'',
        // price_v:1200000,
        price_ss:300000,
        attribute_name:'Kích thước',
        is_show_price_table:true,
        table_price:[],
        is_show_infor:true,
        table_infor:[],
        is_show_commit:true,
        table_commit:[]
      }
    }
  }
  render() {
    let {data}=this.state;
    return (
      <div className='wrap-editer-post attr-wrap'>
        <Container>
          <Header as='h1'>*Tạo thuộc tính mới</Header>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={6}>
                <Form>
                  <Header as='h4'>*Tên thuộc tính</Header>
                  <Input fluid
                    value={data.name}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.name=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                 <Form>
                  <Header as='h4'>*Tag:</Header>
                  <Input fluid
                    value={data.tag}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.tag=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={6} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <div className='re'>
                  <Input_img
                    is_muti={false}
                    fs_result={(rs) => {
                      let {data}=this.state;
                      data.thumnail=rs[0].url300;
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
            <Header as='h1' textAlign="center">*Thuộc tính giá </Header>
            <Grid>
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Giá trị chuyển đổi:</Header>
                  <Input fluid
                    value={data.price_ss}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.price_ss=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                <Form>
                  <Header as='h4'>*Tên gọi của thuộc tính:</Header>
                  <Input fluid
                    value={data.attribute_name}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.attribute_name=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={16}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Bảng giá thuộc tính:</Header>
                    <Checkbox toggle label={data.is_show_price_table?'Hiển thị bảng giá(đang Bật)':'Hiển thị bảng giá(đang Tắt)'} style={{margin:"26px"}}
                      checked={data.is_show_price_table}
                      onChange={() => {
                        let {data}=this.state;
                        data.is_show_price_table=!data.is_show_price_table
                        this.setState({data:data})
                      }}
                    />
                </Form>
                <div className='re input_table_price'>
                  {data.table_price.length>0&&<Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell>{data.attribute_name}</Table.HeaderCell>
                          <Table.HeaderCell>Giá Vốn (1.200.000đ)</Table.HeaderCell>
                          <Table.HeaderCell>Giá gốc hiển thị (+100.000đ)</Table.HeaderCell>
                          <Table.HeaderCell>Giá khuyến mãi hiển thị (+50.000đ)</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.table_price.map((e,i)=>{
                            return<Table.Row key={i}>
                              <Table.Cell>
                                  <input type="text" class="danh-input ktzx" placeholder="1m x 2m..." 
                                    value={e.name}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].name=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />
                              </Table.Cell>
                              <Table.Cell className='re'>
                                  <span className='abs' style={{top:"-6px",paddingLeft:'2px',color:"blue"}}>{Number(e.price_v).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>
                                  <input class="danh-input" placeholder="+1200000" type="number" step={50000}
                                    value={e.price_v}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_v=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />
                              </Table.Cell>
                              <Table.Cell className='re'>
                                 <del className='abs' style={{top:"-6px",paddingLeft:'2px',color:"red"}}>{(Number(e.price_v)+Number(e.price_og)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</del>
                                  <input class="danh-input" placeholder="+1200000" type="number" step={50000}
                                    value={e.price_og}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_og=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />
                              </Table.Cell>
                              <Table.Cell className='re'>
                                  <span className='abs' style={{top:"-6px",paddingLeft:'2px',color:"green"}}>{(Number(e.price_sale)+Number(e.price_v)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>
                                  <input class="danh-input" placeholder="+1200000" type="number" step={50000} 
                                    value={e.price_sale}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_sale=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />
                              </Table.Cell>
                              <Table.Cell>
                                  <i class="fa-solid fa-trash edit-db"
                                    onClick={()=>{
                                      if(window.confirm("Xác nhận xóa")){
                                        let {data}=this.state;
                                        data.table_price.splice(i,1)
                                        this.setState({data:data})
                                      }
                                    }}
                                  ></i>
                              </Table.Cell>
                          </Table.Row>
                          })
                        }
                        
              
                      </Table.Body>
                  </Table>}
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.table_price.push({
                        name:'',
                        price_v:0,
                        price_og:0,
                        price_sale:0
                      });
                      this.setState({data:data})
                    }}
                  /></div>
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
                    <Checkbox toggle label={data.is_show_infor?'Hiển thị bảng thông số(đang Bật)':'Hiển thị bảng thông số(đang Tắt)'} style={{margin:"26px"}}
                      checked={data.is_show_infor}
                      onChange={() => {
                        let {data}=this.state;
                        data.is_show_infor=!data.is_show_infor
                        this.setState({data:data})
                      }}
                    />
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
                  <Checkbox toggle label={data.is_show_commit?'Hiển thị Cam kết(đang Bật)':'Hiển thị Cam kết(đang Tắt)'} style={{margin:"26px"}}
                      checked={data.is_show_commit}
                      onChange={() => {
                        let {data}=this.state;
                        data.is_show_commit=!data.is_show_commit
                        this.setState({data:data})
                      }}
                    />
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
      </div>
    );
  }
}

