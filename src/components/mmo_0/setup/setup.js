import React, { Component } from 'react';
import './setup.css'
// import { toast } from 'react-toastify';
import { Container, Grid, Button, Table, Segment, Input, Image, Radio, Header, TextArea, Form } from 'semantic-ui-react';
import Input_img from '../lib/input_img';
export default class Setup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:{
        menu:[
          {
            name:'Giường sắt',
            url:'#1'
          },
          // {
          //   name:'Giường ngủ',
          //   url:'#2'
          // },
          // {
          //   name:'Giường ống tròn',
          //   url:'#3'
          // },
        ]
      }
    }
  }
  render() {
    let {data}=this.state;
      return (
        <React.Fragment>
          <Container className='mgt-50'>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={8}>
                  <Header as='h4'>*Icon mini cho trang web:</Header>
                  <div className='re'>
                    <Input_img
                      is_muti={false}
                      fs_result={(rs) => {
                        // console.log('line 120+ ',rs)
                        // let {data}=this.state;
                        // data.thumnail=rs[0].url;
                        // this.setState({ data: data })
                      }}
                    />
                    <Image
                      floated='right'
                      size='tiny'
                      src={'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02.jpg'}
                      className='abs hv'
                      style={{top:"-35px",left:"158px"}}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as='h4'>*Logo trang web:</Header>
                  <div className='re'>
                    <Input_img
                      is_muti={false}
                      fs_result={(rs) => {
                        // console.log('line 120+ ',rs)
                        // let {data}=this.state;
                        // data.thumnail=rs[0].url;
                        // this.setState({ data: data })
                      }}
                    />
                    <Image
                      floated='right'
                      size='tiny'
                      src={'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02.jpg'}
                      className='abs hv'
                      style={{top:"-35px",left:"158px"}}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Header as='h4'>*Lời chào mừng:</Header>
                  <Form>
                    <Input label='Lời chào mừng đến với website:' placeholder='Chào bạn đến với nội thất An Bình' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                  </Form>
                </Grid.Column>
              </Grid>
            </div>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={16}>
                  <Header as='h4'>*Thông tin liên hệ:</Header>
                    <Input label='Liên hệ số điện thoại zalo:' placeholder='0938991602' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ số điện thoại Hotline:' placeholder='0938991602' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ facebook link:' placeholder='https://m.me/anbinhnewcom' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ Địa chỉ:' placeholder='Số nhà 19, đường số 17,quốc lộ 13 cũ, Hiệp Bình Phước, Quận Thủ Đức,tpHCM' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
              </Grid>
            </div>
            <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Thanh menu:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell width={6}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={10}>Url</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.menu.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  // onClick={()=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor=moveElement(data.table_infor,i,i-1);
                                  //   this.setState({data:data})
                                  // }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  // value={e.name}
                                  // onChange={(e)=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor[i].name=e.target.value;
                                  //   this.setState({data:data})
                                  // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    // value={e.value}
                                    // onChange={(e)=>{
                                    //   let {data}=this.state;
                                    //   data.table_infor[i].value=e.target.value;
                                    //   this.setState({data:data})
                                    // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                // onClick={()=>{
                                //   if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                //     let {data}=this.state;
                                //     data.table_infor.splice(i,1);
                                //     this.setState({data:data})
                                //   }
                                // }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    // onClick={()=>{
                    //   let {data}=this.state;
                    //   data.table_infor.push({
                    //     name:'',
                    //     value:''
                    //   })
                    //   this.setState({data:data})
                    // }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
            </div>
            <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Thông tin:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell width={6}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={10}>Url</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.menu.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  // onClick={()=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor=moveElement(data.table_infor,i,i-1);
                                  //   this.setState({data:data})
                                  // }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  // value={e.name}
                                  // onChange={(e)=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor[i].name=e.target.value;
                                  //   this.setState({data:data})
                                  // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    // value={e.value}
                                    // onChange={(e)=>{
                                    //   let {data}=this.state;
                                    //   data.table_infor[i].value=e.target.value;
                                    //   this.setState({data:data})
                                    // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                // onClick={()=>{
                                //   if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                //     let {data}=this.state;
                                //     data.table_infor.splice(i,1);
                                //     this.setState({data:data})
                                //   }
                                // }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    // onClick={()=>{
                    //   let {data}=this.state;
                    //   data.table_infor.push({
                    //     name:'',
                    //     value:''
                    //   })
                    //   this.setState({data:data})
                    // }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
            </div>
            <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Chính sách:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell width={6}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={10}>Url</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.menu.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  // onClick={()=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor=moveElement(data.table_infor,i,i-1);
                                  //   this.setState({data:data})
                                  // }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  // value={e.name}
                                  // onChange={(e)=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor[i].name=e.target.value;
                                  //   this.setState({data:data})
                                  // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    // value={e.value}
                                    // onChange={(e)=>{
                                    //   let {data}=this.state;
                                    //   data.table_infor[i].value=e.target.value;
                                    //   this.setState({data:data})
                                    // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                // onClick={()=>{
                                //   if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                //     let {data}=this.state;
                                //     data.table_infor.splice(i,1);
                                //     this.setState({data:data})
                                //   }
                                // }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    // onClick={()=>{
                    //   let {data}=this.state;
                    //   data.table_infor.push({
                    //     name:'',
                    //     value:''
                    //   })
                    //   this.setState({data:data})
                    // }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
            </div>
            <div className='wrap-s'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                    <Header as='h4' className='mgb-8'>*Tuyển dụng:</Header>
                </Form>
                <div className='re'>
                  <Table singleLine>
                      <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell width={6}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={10}>Url</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.menu.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  // onClick={()=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor=moveElement(data.table_infor,i,i-1);
                                  //   this.setState({data:data})
                                  // }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  // value={e.name}
                                  // onChange={(e)=>{
                                  //   let {data}=this.state;
                                  //   data.table_infor[i].name=e.target.value;
                                  //   this.setState({data:data})
                                  // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    // value={e.value}
                                    // onChange={(e)=>{
                                    //   let {data}=this.state;
                                    //   data.table_infor[i].value=e.target.value;
                                    //   this.setState({data:data})
                                    // }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                // onClick={()=>{
                                //   if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                //     let {data}=this.state;
                                //     data.table_infor.splice(i,1);
                                //     this.setState({data:data})
                                //   }
                                // }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    // onClick={()=>{
                    //   let {data}=this.state;
                    //   data.table_infor.push({
                    //     name:'',
                    //     value:''
                    //   })
                    //   this.setState({data:data})
                    // }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
            </div>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={16}>
                  <Header as='h4'>*Thiết kế website bởi ai:</Header>
                    <Input label='Cuối trang, thiết kế bởi:' placeholder='0938991602' fluid type='text'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
              </Grid>
            </div>
            <div className='wrap-s'>
              <Header as='h4'>*Chèn code google ở đây :</Header>
              <Grid>
                <Grid.Column width={16}>
                  <Form>
                    <TextArea placeholder='Header' style={{ minHeight: 120 }}
                      // value={data.short_des}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.short_des=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                  </Form>
                  <Form>
                    <TextArea placeholder='Body' style={{ minHeight: 120,marginTop:"10px" }}
                      // value={data.short_des}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.short_des=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                  </Form>
                  
                </Grid.Column>

              </Grid>
            </div>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={16}>
                  <Header as='h4'>*Cài đặt giá trị chuyển đổi::</Header>
                  <span>Ví dụ: giá trị lợi nhuận cho đơn hàng là 200.000đ; vậy giá trị đặt hàng thành công thanh toán cho gg là 0.5 nghĩa là 1 chuyển đổi đó sẽ cho gg 0.5*200.000=100.000đ; tương tự cho zalo, fb. cuộc gọi.</span>
                    <Input label='Chuyển đổi đặt hàng thành công, sẽ chi trả cho gg bao nhiêu %:' className='mgt-50' placeholder='0.8' fluid type='number'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin zalo, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.6' fluid type='number'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin facebook, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.4' fluid type='number'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin cuộc gọi, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.5' fluid type='number'
                      // value={data.quantity_sold}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.quantity_sold=value;
                      //   this.setState({ data: data })
                      // }}
                    />
                </Grid.Column>
              </Grid>
            </div>
          </Container>
        </React.Fragment>
      );
  }
}

