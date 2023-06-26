import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Table,Grid,Segment,Input,Image} from 'semantic-ui-react';
import {get_orders,action_delete_order_by_id,update_status_order,search_sdt} from '../lib/axios';
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
      //ho tro
      sdt:'',
      is_loading:true
    }
    this.debouncedFetchData = debounce(async(value)=>{
      console.log(value);
        let data=await search_sdt({phone:value})
        if(!data) data=[];
        this.setState({data:data})
    }, 800);
  }
  async componentDidMount(){
 
    let data=await get_orders()
    if(!data) data=[];
    this.setState({data:data,is_loading:false})
 
  }
  //
  componentWillUnmount() {
    this.debouncedFetchData.cancel();
  }
  render() {
    let {data,sdt,is_loading}=this.state;
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
                <Grid.Column width={6} className='mgt-50'>
                  sss
                </Grid.Column>
                <Grid.Column width={4} className='mgt-50'>
                  sss
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
                                        + Số điện thoại:&nbsp;&nbsp; <b>{e.phone}</b><br/>
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
                                              this.setState({data:data})
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
                                                this.setState({data:data})
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

