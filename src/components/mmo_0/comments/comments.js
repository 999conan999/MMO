import React, { Component } from 'react';
import '../post/post.css'
import { toast } from 'react-toastify';
import { Table,Grid,Button,Segment,Input,Image,Dropdown,Form,Header,TextArea } from 'semantic-ui-react';
import Input_img from '../lib/input_img';
// import {get_pages,delete_post,edit_status} from '../lib/axios'
export default class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        {
          id:357,
          rs_comment:'Bàn học đôi dành cho 2 bé ngồi học, bàn có liền kệ sách. Được làm bằng nhựa cao cấp, giá thành rẻ đang được ưa chuộng trên thị trường. Bàn học có màu xanh dương, màu hồng và màu trắng dành cho bé gái. Được sử dụng để học tập và làm việc. Kích thước ngang 1m4. Phù hợp với mọi lứa tuổi, học sinh tiểu học, mẫu giáo. Bộ bàn ghế học sinh có kệ sách bằng nhựa rất đẹp. Hiện tại, chúng tôi hỗ trợ sản phẩm bàn học đôi cho bé tra và gái tại HCM, Bình Dương, Thủ Đức, Gò Vấp, Tân Phú, Tân bình, Bình Thành, Dĩ An, Các Quận HCM.',
          rs_user_name:'Thành Danh',
          rs_phone:'0963226771',
          rs_rep:'Shop cảm ơn bạn rất nhiều',
          rs_status:"private",
          json_img:[
            {
              id:1,
              url:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
              url300:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
            },
            {
              id:2,
              url:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
              url300:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
            },
          ]
        }
      ],
      //ho tro
    
    }
  }
  async componentDidMount(){
    // let text_check= localStorage.getItem("page_text_index");
    // if(text_check==null||text_check==undefined) text_check="";
    // // 
    // let data=await get_pages()
    // if(!data) data=[];
    // this.setState({text_check:text_check,data:data,is_loading:false})
    this.setState({is_loading:false})
  }
  render() {
    let {data,search_id,is_loading}=this.state;
    // search id
  
    return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={12}></Grid.Column>
              </Grid>
              <Grid.Column width={12}>
                <Segment className='clorg hg'
                  loading={is_loading}
                >
                  <Table celled structured basic  size="small" striped className='table-da'>
                    <Table.Header className='head-tbaks'>
                      <Table.Row>
                        <Table.HeaderCell width={1} className='idzx'>id post <Input transparent placeholder='Search...' size='tiny' type='number'
                          value={search_id}
                          onChange={(e,{value})=>{
                            this.setState({search_id:value})
                          }}
                        /></Table.HeaderCell>
                        <Table.HeaderCell width={9}>Nội dung:  </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái  </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Chỉnh sửa</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          return (
                            <Table.Row key={e.id}>
                                  <Table.Cell>{e.id}</Table.Cell>
                                  <Table.Cell className='re'>
                                    <div><b>{e.rs_user_name}</b>: <span>{e.rs_phone}</span>
                                      <span><i className="fa-solid fa-pen-to-square edit-db" style={{marginLeft:"10px",fontSize:"18px"}}></i></span>
                                    </div>
                                    <div className='re'>
                                      <p style={{marginBottom:'0px'}}><b>Bình luận</b>: {e.rs_comment}</p>
                                      <div style={{padding:"8px"}}>
                                        {
                                          e.json_img.map((a,x)=>{
                                            return <Image key={x}
                                            size='tiny'
                                            src={a.url300}
                                            style={{display:'inline-block'}}
                                          />
                                          })
                                        }
                                      </div>
                                      <p><b>Rep</b>: {e.rs_rep}</p>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                  {e.rs_status=="private"&&<Button content='Riêng tư' basic size="mini"
                                                  // onClick={async()=>{
                                                  //   if(window.confirm("Xác nhận đổi sang 'công khai'")){
                                                  //     let {data}=this.state;
                                                  //     let a=await edit_status({
                                                  //       id:e.id,
                                                  //       value:'publish'
                                                  //     })
                                                  //     if(a.status){
                                                  //       data[i].status="publish"
                                                  //       toast.success('Cập nhật thành công.', { theme: "colored" });
                                                  //     }else{
                                                  //       toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                                  //     }
                                                  //     this.setState({data:data})
                                                  //   }
                                                  // }}
                                                />}
                                  {e.rs_status=="publish"&&<Button positive  size="mini"
                                    // onClick={async()=>{
                                    //   if(window.confirm("Xác nhận đổi sang 'Riêng tư'")){
                                    //     let {data}=this.state;
                                    //     let a=await edit_status({
                                    //       id:e.id,
                                    //       value:'private'
                                    //     })
                                    //     if(a.status){
                                    //       data[i].status="private"
                                    //       toast.success('Cập nhật thành công.', { theme: "colored" });
                                    //     }else{
                                    //       toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                    //     }
                                    //     this.setState({data:data})
                                    //   }
                                    // }}
                                  >Công khai</Button>}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <i className="fa-solid fa-trash edit-db"
                                        // onClick={()=>{
                                        //   if(window.confirm("Xác nhận xóa")){
                                        //     let {data}=this.state;
                                        //     data.table_price.splice(i,1)
                                        //     this.setState({data:data})
                                        //   }
                                        // }}
                                      ></i>
                                  </Table.Cell>
                                </Table.Row>
                          )
                        })
                      }
                      

                    </Table.Body>
                  </Table>
                </Segment>
              </Grid.Column>
          {false&&<div className='wrap-editer-post' style={{backgroundColor:"#b3b8bde8"}}>
            <div className='re'>
              <div className='wrap-s psi'  >
                <Grid> 
                  <Grid.Column width={4}>
                    <Form>
                      <Input
                      // placeholder='Nhập nội dung ở đây...'
                      // value={e.name}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.dm[i].name=value;
                      //   this.setState({data:data})
                      // }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Form>
                      <Input
                      // placeholder='Nhập nội dung ở đây...'
                      // value={e.name}
                      // onChange={(e,{value}) => {
                      //   let {data}=this.state;
                      //   data.dm[i].name=value;
                      //   this.setState({data:data})
                      // }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Input_img
                      is_muti={true}
                      fs_result={(rs) => {
                        // let {data}=this.state;
                        // data.thumnail=rs[0];
                        // this.setState({ data: data })
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form>
                      <Header as='h4'>*Bình luận</Header>
                      <TextArea placeholder='...' style={{ minHeight: 80 }}
                        fluid
                        // value={data.short_des}
                        // onChange={(e,{value}) => {
                        //   let {data}=this.state;
                        //   data.short_des=value;
                        //   this.setState({ data: data })
                        // }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form>
                      <Header as='h4'>*Rep:</Header>
                      <TextArea placeholder='...' style={{ minHeight:30 }}
                        fluid
                        // value={data.short_des}
                        // onChange={(e,{value}) => {
                        //   let {data}=this.state;
                        //   data.short_des=value;
                        //   this.setState({ data: data })
                        // }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={16}>
                  <div className='img-muti' key={1}>
                    <Image
                      size='tiny'
                      src={'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg'}
                    />
                    {1>0&&<i className="fa-solid fa-angles-left icon-img-muitxx"
                      // onClick={()=>{
                      //     let {data}=this.state;
                      //     data.img_sp.imgs_list=moveElement(data.img_sp.imgs_list,i,i-1)
                      //     this.setState({ data: data })
                      // }}
                    ></i>}
                    <i className="fa-solid fa-trash icon-x-imgxx"
                      // onClick={()=>{
                      //   if(window.confirm("Xác nhận xóa!")){
                      //     let {data}=this.state;
                      //     data.img_sp.imgs_list=data.img_sp.imgs_list.filter(z =>z.id !== e.id)
                      //     this.setState({ data: data })
                      //   }
                      // }}
                    ></i>
                  </div>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <div style={{textAlign:"right"}}>
                    <div style={{ display: "inline-block", paddingRight: "50px",width:"200px" }}>
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
                      <Button primary>Lưu</Button>{' '}
                      <Button secondary>Hủy</Button>
                    </div>
                  </Grid.Column>
                </Grid>
              </div>
            </div>
          </div>}
        </React.Fragment>
      );
  }
}

