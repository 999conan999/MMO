import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Table,Grid,Segment,Input,Image,Button} from 'semantic-ui-react';
import {get_orders,action_delete_order_by_id,update_status_order,search_sdt,get_setup,update_setup} from '../lib/axios';
import { debounce } from 'lodash';
export default class Orders extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        // {
        //   id:1,
        //   name_buyer:'Danh',
        //   phone:'0326397884',
        //   address_1:'37 Ngô Đức Kế, Phường 12, Bình Thạnh, Hồ Chí Minh',
        //   note:'Nhanh lên',
        //   time:'132542141',
        //   order_status:'checked',
        //   data_carts:[]
        // },
      ],
      token_telegram:{
        token:'',
        id:''
      },
      //ho tro
      sdt:'',
      is_loading:true,
      //
      is_edit_token:false,
      data_edit_token:{
        token:'',
        id:''
      }
    }
    this.debouncedFetchData = debounce(async(value)=>{
      console.log(value);
        let data=await search_sdt({phone:value})
        if(!data) data=[];
        this.setState({data:data})
    }, 800);
  }
  async componentDidMount(){
 
    let data=await get_orders();
    let token_telegram=await get_setup({name:"telegram_data"})
    if(!token_telegram) token_telegram={token:"",id:""};
    if(!data) data=[];
    this.setState({data:data,is_loading:false,token_telegram:token_telegram})
    //
  }
  //
  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }
  render() {
    let {data,sdt,is_loading,token_telegram,is_edit_token,data_edit_token}=this.state;
    return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={6} className='mgt-50'><Input placeholder='Số điện thoại...' type='number'
                  value={sdt}
                  onChange={(e,{value})=>{
                    this.setState({sdt:value})
                    this.debouncedFetchData(value);
                  }}
                /></Grid.Column>
                <Grid.Column width={10} className='mgt-50 re'>
                  <div className='re wqq'>
                    <div>Token API Telegram: <b>{token_telegram.token}</b>...</div>
                    <div>ID: <b>{token_telegram.id}</b></div>
                    {!is_edit_token&&<span
                      onClick={()=>{
                        let {token_telegram}=this.state;
                        this.setState({
                              data_edit_token:{
                                token:token_telegram.token,
                                id:token_telegram.id
                                },
                              is_edit_token:true
                            });
                      }}
                    ><i className="fa-solid fa-pen-to-square edit-db abs" style={{marginLeft:"10px",fontSize:"18px",top:"0px",right:"0px"}}></i></span>}
                  </div>
                  {is_edit_token&&<div className='keyworsx xasd'>
                        <Input  placeholder='Token API' className="input-1" type='text' fluid
                          value={data_edit_token.token}
                          onChange={(e,{value}) => {
                            let {data_edit_token}=this.state;
                            data_edit_token.token=value
                            this.setState({data_edit_token:data_edit_token})
                          }}
                        />
                        <Input  placeholder='ID' className="input-1" type='text' fluid
                          value={data_edit_token.id}
                          onChange={(e,{value}) => {
                            let {data_edit_token}=this.state;
                            data_edit_token.id=value
                            this.setState({data_edit_token:data_edit_token})
                          }}
                        />
                        <div className='huhvx'>
                            <Button content='Hủy' secondary  
                                onClick={()=>{
                                    this.setState({
                                          data_edit_token:{
                                            token:'',
                                            id:''
                                            },
                                          is_edit_token:false
                                        });
                                }}
                            />
                            <Button content='OK' primary
                              onClick={async()=>{
                                let {data_edit_token}=this.state;
                                let rs={
                                  name:'telegram_data',
                                  value:JSON.stringify(data_edit_token)
                                }
                                let a=await update_setup(rs);
                                if(a.status){
                                  this.setState({
                                    token_telegram:{
                                      token:data_edit_token.token,
                                      id:data_edit_token.id,
                                    },
                                    is_edit_token:false
                                  })
                                  toast.success('Cập nhật thành công.', { theme: "colored" });
                                }else{
                                  toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                }
                              }}

                            />
                        </div>  
                  </div>}
                </Grid.Column>
              </Grid>
              <Grid.Column width={12}>
                <Segment className='clorg hg'
                  loading={is_loading}
                >
                  <Table celled structured basic  size="small" striped className='table-da'>
                    <Table.Header className='head-tbaks'>
                      <Table.Row>
                        <Table.HeaderCell width={3}>Thời gian  </Table.HeaderCell>
                        <Table.HeaderCell width={2}>Hình sản phẩm  </Table.HeaderCell>
                        <Table.HeaderCell width={8}>Thông tin đơn hàng  </Table.HeaderCell>
                        <Table.HeaderCell width={1}>Trạng thái  </Table.HeaderCell>
                        <Table.HeaderCell width={1}>Xóa</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        data.map((e,i)=>{
                          let time=this.convert_time(Number(e.date_create));
                          let sum_price=0;
                          return (
                            <Table.Row key={e.id} >
                                  <Table.Cell className='re'> 
                                    <span className='timekiper' style={time.d>0?{color:"gray"}:{}}>{time.d>0&&<span><b>{time.d}</b> ngày</span>} {time.h>0&&<span> <b>{time.h}</b> giờ </span>}{time.m>0&&<span><b>{time.m}</b> phút trước</span>}</span>
                                  </Table.Cell>
                                  <Table.Cell></Table.Cell>
                                  <Table.Cell>
                                    <div className='xxa'>
                                      {
                                        e.data_carts.map((item,x)=>{
                                          sum_price+=Number(item.price_sale)*Number(item.sl);
                                          return (<p key={x} className='re'>+ <a href={item.url} target='_blank'>{item.title}</a><br/>{'=>'}<b>{item.kt}</b> - <b>{(Number(item.price_sale)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</b> - số lượng: <b>{item.sl}</b><Image src={item.img} size='tiny' className='abs' style={{left:"-100px",top:"0px"}}/></p>)
                                        })
                                      }
                                    </div>
                                    <div className='ssx'>
                                      <p>
                                        + Tên:&nbsp;&nbsp; <b>{e.name_buyer}</b><br/>
                                        + Số điện thoại:&nbsp;&nbsp; <b>{e.phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3")}</b><br/>
                                        + Địa chỉ:&nbsp;&nbsp; <b>{e.address_1}</b><br/>
                                        + Ghi Chú:&nbsp;&nbsp; <b>{e.note}</b><br/>
                                      </p>
                                      <p>
                                        Tổng thu:&nbsp;&nbsp;<b style={{fontSize:'20px',color:'blue'}}>{(Number(sum_price)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</b>
                                      </p>
                                    </div>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {e.order_status=="checked"&&<i className="fa-solid fa-minus edit-db" style={{fontSize:"40px",color:"gray"}}
                                        onClick={async()=>{
                                          if(window.confirm('Chuyển sang "Đã xử lý" ')){
                                            let a=await update_status_order({
                                              id:e.id,
                                              value:"check"
                                            });
                                            if(a.status){
                                              let {data}=this.state;
                                              data[i].order_status="check"
                                              this.setState({data:data});
                                              this.props.change_count_order("cong");
                                              toast.success('Cập nhật thành công', { theme: "colored" });
                                            }else{
                                              toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                            }
                                          }
                                        }}
                                      ></i>}
                                    {e.order_status=="check"&&<i className="fa-brands fa-xbox edit-db" style={{fontSize:"35px",color:"red"}}
                                          onClick={async()=>{
                                            if(window.confirm('Chuyển sang "Chưa xử lý" ')){
                                              let a=await update_status_order({
                                                id:e.id,
                                                value:"checked"
                                              });
                                              if(a.status){
                                                let {data}=this.state;
                                                data[i].order_status="checked"
                                                this.setState({data:data});
                                                this.props.change_count_order("true");
                                                toast.success('Cập nhật thành công', { theme: "colored" });
                                              }else{
                                                toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
                                              }
                                            }
                                          }}
                                      ></i>}
                                  </Table.Cell>
                                  <Table.Cell>
                                    <i className="fa-solid fa-trash edit-db"
                                        onClick={async()=>{
                                          if(window.confirm("Xác nhận xóa")){
                                            let a=await action_delete_order_by_id(e.id);
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
        </React.Fragment>
      );
  }
  convert_time=(time)=>{
    let time_his = new Date(time * 1000);
    let time_now= new Date().getTime();
    let time_long=Math.floor((time_now-time_his)/60000);//all phut
    let count_day=Math.floor(time_long/1440);//
    let count_hour=Math.floor(time_long/60)-count_day*24;//
    let count_Minutes=time_long-count_day*24*60-count_hour*60;
    return {
      h:count_hour,
      d:count_day,
      m:count_Minutes,
    }

  }
}

