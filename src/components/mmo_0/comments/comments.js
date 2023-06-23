import React, { Component } from 'react';
import '../post/post.css'
import { toast } from 'react-toastify';
import { Table,Grid,Button,Segment,Input,Image,Dropdown,Form,Header,TextArea } from 'semantic-ui-react';
import Input_img from '../lib/input_img';
import { moveElement } from '../lib/fs';
import {get_comments, update_comment_by_id_post,update_status_com,action_delete_by_id} from '../lib/axios';
import { debounce } from 'lodash';
export default class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        // {
        //   id:357,
        //   rs_comment:'Bàn học đôi dành cho 2 bé ngồi học, bàn có liền kệ sách. Được làm bằng nhựa cao cấp, giá thành rẻ đang được ưa chuộng trên thị trường. Bàn học có màu xanh dương, màu hồng và màu trắng dành cho bé gái. Được sử dụng để học tập và làm việc. Kích thước ngang 1m4. Phù hợp với mọi lứa tuổi, học sinh tiểu học, mẫu giáo. Bộ bàn ghế học sinh có kệ sách bằng nhựa rất đẹp. Hiện tại, chúng tôi hỗ trợ sản phẩm bàn học đôi cho bé tra và gái tại HCM, Bình Dương, Thủ Đức, Gò Vấp, Tân Phú, Tân bình, Bình Thành, Dĩ An, Các Quận HCM.',
        //   rs_user_name:'Thành Danh',
        //   rs_phone:'0963226771',
        //   rs_rep:'Shop cảm ơn bạn rất nhiều',
        //   rs_status:"private",
        //   json_img:[
        //     // {
        //     //   id:1,
        //     //   url:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
        //     //   url300:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
        //     // },
        //     // {
        //     //   id:2,
        //     //   url:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
        //     //   url300:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg',
        //     // },
        //   ]
        // }
      ],
      // data_search:[],
      //ho tro
      text_id_search:'',
      is_show_edit:false,
      selected_index:-1,
      selected_com:{
        id:-1,
        rs_comment:'',
        rs_user_name:'',
        rs_phone:'',
        rs_rep:'',
        rs_status:"",
        json_img:[]
      }
    }
    this.debouncedFetchData = debounce(async(value)=>{
      if(value!=""){
        let data=await get_comments(value)
        if(!data) data=[];
        this.setState({data:data})
      }else{
        let data=await get_comments(-1)
        if(!data) data=[];
        this.setState({data:data})
      }
    }, 800);
  }
  async componentDidMount(){
 
    let data=await get_comments(-1)
    if(!data) data=[];
    this.setState({data:data,is_loading:false})
 
  }
  //
  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }
  render() {
    let {data,text_id_search,is_loading,is_show_edit,selected_com,selected_index}=this.state;
    // search id
    // if(text_id_search!=""){
    //     data=data_search;
    // }
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
                          value={text_id_search}
                          onChange={(e,{value})=>{
                            value=value.replace(" ","")
                            this.setState({text_id_search:value})
                            this.debouncedFetchData(value);
                          }}
                        /></Table.HeaderCell>
                        <Table.HeaderCell width={9}>Nội dung:  </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Trạng thái  </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Xóa</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          return (
                            <Table.Row key={e.id}>
                                  <Table.Cell>{e.id_post}</Table.Cell>
                                  <Table.Cell className='re'>
                                    <div><b>{e.rs_user_name}</b>: <span>{e.rs_phone}</span>
                                      <span
                                        onClick={()=>{
                                          let v=JSON.stringify(e);
                                          let selected_com= JSON.parse(v);
                                          let selected_index=e.id;
                                          this.setState({selected_com:selected_com,is_show_edit:true,selected_index:selected_index});
                                        }}
                                      ><i className="fa-solid fa-pen-to-square edit-db" style={{marginLeft:"10px",fontSize:"18px"}}></i></span>
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
                                                  onClick={async()=>{
                                                    if(window.confirm("Xác nhận đổi sang 'công khai'")){
                                                      let {data}=this.state;
                                                      let a=await update_status_com({
                                                        id:e.id,
                                                        value:'publish'
                                                      })
                                                      if(a.status){
                                                            data[i].rs_status="publish"
                                                        toast.success('Cập nhật thành công.', { theme: "colored" });
                                                      }else{
                                                        toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                                      }
                                                      this.setState({data:data})
                                                    }
                                                  }}
                                                />}
                                  {e.rs_status=="publish"&&<Button positive  size="mini"
                                    onClick={async()=>{
                                      if(window.confirm("Xác nhận đổi sang 'Riêng tư'")){
                                        let {data}=this.state;
                                        let a=await update_status_com({
                                          id:e.id,
                                          value:'private'
                                        })
                                        if(a.status){
                                              data[i].rs_status="private"
                                          toast.success('Cập nhật thành công.', { theme: "colored" });
                                        }else{
                                          toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                        }
                                        this.setState({data:data})
                                      }
                                    }}
                                  >Công khai</Button>}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <i className="fa-solid fa-trash edit-db"
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận xóa")){
                                            let a=await action_delete_by_id(e.id);
                                            if(a.status){
                                              let {data}=this.state;
                                              data.splice(i,1)
                                              this.setState({data:data})
                                              toast.success('Cập nhật thành công', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                          }
                                        }}
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
          {is_show_edit&&<div className='wrap-editer-post' style={{backgroundColor:"#b3b8bde8"}}
            onClick={(e)=>{
              if (e.target.classList.contains('wrap-editer-post')) {
                this.setState({
                  is_show_edit:false,
                  selected_com:{
                    id:-1,
                    rs_comment:'',
                    rs_user_name:'',
                    rs_phone:'',
                    rs_rep:'',
                    rs_status:"",
                    json_img:[]
                  }
                })
              }
            }}
          >
            <div className='re'>
              <div className='wrap-s psi re'  >
                <Grid> 
                  <Grid.Column width={4}>
                    <Form>
                      <Input
                      placeholder='Tên...'
                      value={selected_com.rs_user_name}
                      onChange={(e,{value}) => {
                        let {selected_com}=this.state;
                        selected_com.rs_user_name=value;
                        this.setState({selected_com:selected_com})
                      }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Form>
                      <Input
                      placeholder='Số điện thoại'
                      value={selected_com.rs_phone}
                      onChange={(e,{value}) => {
                        let {selected_com}=this.state;
                        selected_com.rs_phone=value;
                        this.setState({selected_com:selected_com})
                      }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Input_img
                      is_muti={true}
                      fs_result={(rs) => {
                        if(rs.length>0){
                          let {selected_com}=this.state;
                          selected_com.json_img=[...selected_com.json_img,...rs]
                          this.setState({ selected_com: selected_com })
                        }
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form>
                      <Header as='h4'>*Bình luận</Header>
                      <TextArea placeholder='...' style={{ minHeight: 80 }}
                        fluid
                        value={selected_com.rs_comment}
                        onChange={(e,{value}) => {
                          let {selected_com}=this.state;
                          selected_com.rs_comment=value;
                          this.setState({selected_com:selected_com})
                        }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form>
                      <Header as='h4'>*Rep:</Header>
                      <TextArea placeholder='...' style={{ minHeight:30 }}
                        fluid
                        value={selected_com.rs_rep}
                        onChange={(e,{value}) => {
                          let {selected_com}=this.state;
                          selected_com.rs_rep=value;
                          this.setState({selected_com:selected_com})
                        }}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={16} style={{height:"168px"}}>
                    <div>
                    {
                      selected_com.json_img.map((e,i)=>{
                        return <div className='img-muti' key={i}>
                        <Image
                          size='tiny'
                          src={e.url300}
                        />
                        {i>0&&<i className="fa-solid fa-angles-left icon-img-muitxx"
                          onClick={()=>{
                              let {selected_com}=this.state;
                              selected_com.json_img=moveElement(selected_com.json_img,i,i-1)
                              this.setState({ data: data })
                          }}
                        ></i>}
                        <i className="fa-solid fa-trash icon-x-imgxx"
                          onClick={()=>{
                            if(window.confirm("Xác nhận xóa!")){
                              let {selected_com}=this.state;
                              selected_com.json_img.splice(i,1)
                              this.setState({ selected_com: selected_com })
                            }
                          }}
                        ></i>
                      </div>
                      })
                    }
                  </div>
                  </Grid.Column>
                  <Grid.Column width={16}>
                    <div  className='sdhs'>
                    <div style={{ display: "inline-block", paddingRight: "50px",width:"200px" }}>
                      <Dropdown
                        value={selected_com.rs_status}
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
                          let {selected_com}=this.state;
                          selected_com.rs_status=value;
                          this.setState({selected_com:selected_com})
                        }}
                      />
                    </div>
                    <Button secondary
                        onClick={()=>{
                          this.setState({
                            is_show_edit:false,
                            selected_com:{
                              id:-1,
                              rs_comment:'',
                              rs_user_name:'',
                              rs_phone:'',
                              rs_rep:'',
                              rs_status:"",
                              json_img:[]
                            }
                          })
                        }}
                      >Hủy</Button>{' '}
                      <Button primary 
                        onClick={async()=>{
                          let {selected_com}=this.state;
                          console.log("🚀 ~ file: comments.js:350 ~ Comments ~ render ~ selected_com:", selected_com)
                          let data_send={
                            id:selected_com.id,
                            json_img:JSON.stringify(selected_com.json_img),
                            rs_comment:selected_com.rs_comment,
                            rs_phone:selected_com.rs_phone,
                            rs_rep:selected_com.rs_rep,
                            rs_status:selected_com.rs_status,
                            rs_user_name:selected_com.rs_user_name,
                          }
                          let a=await update_comment_by_id_post(data_send)
                          if(a.status){

                            let {data,selected_index}=this.state;
                            let index=-1;
                            data.forEach((e,i) => {
                                if(e.id==selected_index) index=i;
                            });
                            if(index>-1) data[index]=selected_com;
                            this.setState({
                              data:data,
                              // data_search:data_search,
                              is_show_edit:false,
                              selected_com:{
                                id:-1,
                                rs_comment:'',
                                rs_user_name:'',
                                rs_phone:'',
                                rs_rep:'',
                                rs_status:"",
                                json_img:[]
                              },
                              selected_index:-1
                            })

                            toast.success('Cập nhật thành công', { theme: "colored" });
                          }else{
                            toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                          }
                        }}
                      >Lưu</Button>

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

