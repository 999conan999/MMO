import React, { Component } from 'react';
import './setup.css'
import { toast } from 'react-toastify';
import { Container, Grid, Button, Table, Segment, Input, Image, Radio, Header, TextArea, Form } from 'semantic-ui-react';
import { moveElement } from '../lib/fs';
import Input_img from '../lib/input_img';
import {update_setup,get_setup} from '../lib/axios'
export default class Setup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data:{
        menu:[],
        mini_icon:"",
        logo_icon:"",
        chao_mung:"",
        lien_he_zalo:"",
        lien_he_sdt:"",
        lien_he_fb:"",
        lien_he_dc:"",
        thong_tin:[],
        chinh_sach:[],
        tuyen_dung:[],
        design_by:"",
        gg_header:"",
        gg_body:"",
        dat_hang_cd:0,
        zalo_cd:0,
        fb_cd:0,
        phone_cd:0,
        time_cache:0,

      },
      is_loading:true
    }
  }
  async componentDidMount(){
    let a= await get_setup({name:'shopseo_setup'})
    if(a.logo_icon!=undefined){
      this.setState({data:a,is_loading:false})
    }else{
      this.setState({is_loading:false})
    }
  }
  render() {
    let {data,is_loading}=this.state;
      return (
        <React.Fragment>
          <Container className='mgt-50'>
          <Segment className='clorg hg'
            loading={is_loading}
          >
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={8}>
                  <Header as='h4'>*Icon mini cho trang web:</Header>
                  <div className='re'>
                    <Input_img
                      is_muti={false}
                      fs_result={(rs) => {
                        let {data}=this.state;
                        data.mini_icon=rs[0].url;
                        this.setState({ data: data })
                      }}
                    />
                    <Image
                      floated='right'
                      size='tiny'
                      src={data.mini_icon}
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
                        let {data}=this.state;
                        data.logo_icon=rs[0].url;
                        this.setState({ data: data })
                      }}
                    />
                    <Image
                      floated='right'
                      size='tiny'
                      src={data.logo_icon}
                      className='abs hv'
                      style={{top:"-35px",left:"158px"}}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column width={16}>
                  <Header as='h4'>*Lời chào mừng:</Header>
                  <Form>
                    <Input label='Lời chào mừng đến với website:' placeholder='Chào bạn đến với nội thất An Bình' fluid type='text'
                      value={data.chao_mung}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.chao_mung=value;
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
                  <Header as='h4'>*Thông tin liên hệ:</Header>
                    <Input label='Liên hệ số điện thoại zalo:' placeholder='0938991602' fluid type='text'
                      value={data.lien_he_zalo}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.lien_he_zalo=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ số điện thoại Hotline:' placeholder='0938991602' fluid type='text'
                      value={data.lien_he_sdt}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.lien_he_sdt=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ facebook link:' placeholder='https://m.me/anbinhnewcom' fluid type='text'
                      value={data.lien_he_fb}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.lien_he_fb=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Liên hệ Địa chỉ:' placeholder='Số nhà 19, đường số 17,quốc lộ 13 cũ, Hiệp Bình Phước, Quận Thủ Đức,tpHCM' fluid type='text'
                      value={data.lien_he_dc}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.lien_he_dc=value;
                        this.setState({ data: data })
                      }}
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
                                  onClick={()=>{
                                    let {data}=this.state;
                                    data.menu=moveElement(data.menu,i,i-1);
                                    this.setState({data:data})
                                  }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  value={e.name}
                                  onChange={(e)=>{
                                    let {data}=this.state;
                                    data.menu[i].name=e.target.value;
                                    this.setState({data:data})
                                  }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    value={e.value}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.menu[i].value=e.target.value;
                                      this.setState({data:data})
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                    let {data}=this.state;
                                    data.menu.splice(i,1);
                                    this.setState({data:data})
                                  }
                                }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.menu.push({
                        name:'',
                        value:''
                      })
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
                          data.thong_tin.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  onClick={()=>{
                                    let {data}=this.state;
                                    data.thong_tin=moveElement(data.thong_tin,i,i-1);
                                    this.setState({data:data})
                                  }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  value={e.name}
                                  onChange={(e)=>{
                                    let {data}=this.state;
                                    data.thong_tin[i].name=e.target.value;
                                    this.setState({data:data})
                                  }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    value={e.value}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.thong_tin[i].value=e.target.value;
                                      this.setState({data:data})
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                    let {data}=this.state;
                                    data.thong_tin.splice(i,1);
                                    this.setState({data:data})
                                  }
                                }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.thong_tin.push({
                        name:'',
                        value:''
                      })
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
                          data.chinh_sach.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  onClick={()=>{
                                    let {data}=this.state;
                                    data.chinh_sach=moveElement(data.chinh_sach,i,i-1);
                                    this.setState({data:data})
                                  }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  value={e.name}
                                  onChange={(e)=>{
                                    let {data}=this.state;
                                    data.chinh_sach[i].name=e.target.value;
                                    this.setState({data:data})
                                  }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    value={e.value}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.chinh_sach[i].value=e.target.value;
                                      this.setState({data:data})
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                    let {data}=this.state;
                                    data.chinh_sach.splice(i,1);
                                    this.setState({data:data})
                                  }
                                }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.chinh_sach.push({
                        name:'',
                        value:''
                      })
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
                          data.tuyen_dung.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  onClick={()=>{
                                    let {data}=this.state;
                                    data.tuyen_dung=moveElement(data.tuyen_dung,i,i-1);
                                    this.setState({data:data})
                                  }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  value={e.name}
                                  onChange={(e)=>{
                                    let {data}=this.state;
                                    data.tuyen_dung[i].name=e.target.value;
                                    this.setState({data:data})
                                  }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    value={e.value}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.tuyen_dung[i].value=e.target.value;
                                      this.setState({data:data})
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                    let {data}=this.state;
                                    data.tuyen_dung.splice(i,1);
                                    this.setState({data:data})
                                  }
                                }}
                                ></i>
                            </Table.Cell>
                        </Table.Row>
                          })
                        }
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.tuyen_dung.push({
                        name:'',
                        value:''
                      })
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
                  <Header as='h4'>*Thiết kế website bởi ai:</Header>
                    <Input label='Cuối trang, thiết kế bởi:' placeholder='0938991602' fluid type='text'
                      value={data.design_by}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.design_by=value;
                        this.setState({ data: data })
                      }}
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
                      value={data.gg_header}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.gg_header=value;
                        this.setState({ data: data })
                      }}
                    />
                  </Form>
                  <Form>
                    <TextArea placeholder='Body' style={{ minHeight: 120,marginTop:"10px" }}
                      value={data.gg_body}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.gg_body=value;
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
                  <Header as='h4'>*Cài đặt giá trị chuyển đổi::</Header>
                  <span>Ví dụ: giá trị lợi nhuận cho đơn hàng là 200.000đ; vậy giá trị đặt hàng thành công thanh toán cho gg là 0.5 nghĩa là 1 chuyển đổi đó sẽ cho gg 0.5*200.000=100.000đ; tương tự cho zalo, fb. cuộc gọi.</span>
                    <Input label='Chuyển đổi đặt hàng thành công, sẽ chi trả cho gg bao nhiêu %:' className='mgt-50' placeholder='0.8' fluid type='number'
                      value={data.dat_hang_cd}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.dat_hang_cd=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin zalo, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.6' fluid type='number'
                      value={data.zalo_cd}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.zalo_cd=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin facebook, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.4' fluid type='number'
                      value={data.fb_cd}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.fb_cd=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Input label='Chuyển đổi nhắn tin cuộc gọi, sẽ chi trả cho gg bao nhiêu %:' placeholder='0.5' fluid type='number'
                      value={data.phone_cd}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.phone_cd=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
              </Grid>
            </div>
            <div className='wrap-s'>
              <Grid>
                <Grid.Column width={16}>
                  <Header as='h4'>*Thời gian cache (giây):</Header>
                    <Input label='Số giây cache:' className='mgt-50' placeholder='0.8' fluid type='number'
                      value={data.time_cache}
                      onChange={(e,{value}) => {
                        let {data}=this.state;
                        data.time_cache=value;
                        this.setState({ data: data })
                      }}
                    />
                </Grid.Column>
              </Grid>
            </div>
            {!is_loading&&<div style={{position:"fixed",right:"10px",bottom:"26px"}}>
              <Button primary className='createx'
                onClick={async()=>{
                  let {data}=this.state;
                  let a=await update_setup({
                    value:JSON.stringify(data),
                    name:'shopseo_setup'
                  })
                  console.log("🚀 ~ file: setup.js:581 ~ Setup ~ render ~  a:",  a)
                  if(a.status){
                    toast.success('Cập nhật thành công', { theme: "colored" });
                  }else{
                    toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                  }
                }}
              >Cập nhật</Button>
            </div>}
            </Segment>
          </Container>
        </React.Fragment>
      );
  }
}

