import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Input_img from '../lib/input_img/index';
import { moveElement } from '../lib/fs';
import {create_edit_attributes,get_attributes_infor} from '../lib/axios'
import { Container, Grid, Button,Input,Checkbox, Image, Table, Header,Form,Dropdown } from 'semantic-ui-react'
export default class Editer_attribute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // main
      data:{
        id:-1,
        title:'',
        tag:'',
        thumnail:'',
        price_ss:0,
        attribute_name:'',
        is_show_price_table:true,
        table_price:[],
        is_show_infor:true,
        table_infor:[
          {
            name:'Xuất xứ',
            value:''
          },
          {
            name:'Thương hiệu',
            value:''
          },
          {
            name:'Kích thước',
            value:''
          },
          {
            name:'Màu sắc',
            value:''
          },
          {
            name:'Chất liệu 1',
            value:''
          },
          {
            name:'Chất liệu 2',
            value:''
          },
          {
            name:'Đối tượng sử dụng',
            value:''
          },
          {
            name:'Bảo hành',
            value:''
          },

        ],
        is_show_commit:true,
        table_commit:[]
      },
      category_list:[],
      //phu tro
      index_show_input_table_price:-1
    }
  }
  async componentDidMount(){
      let {id,type,category_list}=this.props;
      let {data}=this.state;
      // 1
  
      if(type=="create"){
        this.setState({data:data,category_list:category_list})
      }else if(type=="copy"){
        let data=await get_attributes_infor(id);
        if(data.id!=undefined){
          data.id=-1;
          this.setState({data:data,category_list:category_list})
        }else{
          toast.info("Lỗi rồi", { theme: "colored" })
        }
      }else if(type=="edit"){
        let data=await get_attributes_infor(id);
        if(data.id!=undefined){
          this.setState({data:data,category_list:category_list})
        }else{
          toast.info("Lỗi rồi", { theme: "colored" })
        }
      }


      // this.setState({
      //   list_sp_anh_xa:list_sp_covert,
      //   category_list:category_list
      // })

  }
  render() {
    let {data,index_show_input_table_price,category_list}=this.state;
    return (
      <div className='wrap-editer-post attr-wrap'>
        <Container>
          <Header as='h1'>*{this.props.type=="edit"?"Cập nhật":"Tạo mới"}</Header>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={6}>
                <Form>
                  <Header as='h4'>*Tên thuộc tính</Header>
                  <Input fluid
                    value={data.title}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.title=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                 <Form>
                  <Header as='h4'>*Tag:</Header>
                   <Dropdown  selection search
                    value={data.tag}
                    options={category_list}
                    onChange={async(e,{value}) => {
                      let {data}=this.state;
                      data.tag=value;
                      this.setState({data:data})
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
                      data.thumnail=rs[0].url150;
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
                          <Table.HeaderCell>Lời*(+600.000đ)</Table.HeaderCell>
                          <Table.HeaderCell>Giá sẽ bán hiển thị</Table.HeaderCell>
                          <Table.HeaderCell>Giá gốc ảo hiển thị (+100.000đ)</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.table_price.map((e,i)=>{
                            return<Table.Row key={i}>
                              <Table.Cell className='re'>
                                  {index_show_input_table_price!==i&&<i className="fa-solid fa-pen-to-square abs hv" style={{left:'-10px',top:'12px'}}
                                   onClick={()=>this.setState({index_show_input_table_price:i})}
                                  ></i>}
                                  {index_show_input_table_price===i&&<i className="fa-solid fa-square-check abs hv" style={{left:'-10px',top:'12px'}}
                                    onClick={()=>this.setState({index_show_input_table_price:-1})}
                                  ></i>}
                                  {index_show_input_table_price===i&&<input type="text" className="danh-input ktzx" placeholder="1m x 2m..." 
                                    value={e.name}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].name=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />}
                                  {index_show_input_table_price!==i&&<span>{e.name}</span>}
                              </Table.Cell>
                              <Table.Cell className='re'>
                                  {index_show_input_table_price!==i&&<span style={{color:"blue"}}>{Number(e.price_v).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>}
                                  {index_show_input_table_price===i&&<input className="danh-input" placeholder="1200000" type="number" step={50000}
                                    value={e.price_v}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_v=e.target.value;
                                      this.setState({data:data})
                                    }}
                                  />}
                              </Table.Cell>
                              <Table.Cell className='re'>
                                  {index_show_input_table_price!==i&&<span style={{color:"red"}}>+{Number(e.price_profit).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>}
                                  {index_show_input_table_price===i&&<input className="danh-input" placeholder="+600000" type="number" step={50000}
                                    value={e.price_profit}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_profit=e.target.value;
                                      this.setState({data:data})
                                    }}
                                  />}
                              </Table.Cell>
                              <Table.Cell className='re'>
                                  {index_show_input_table_price!==i&&<span  style={{color:"green"}}>{(Number(e.price_profit)+Number(e.price_v)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span>}
                              </Table.Cell>
                              <Table.Cell className='re'>
                                 {index_show_input_table_price!==i&&<del  style={{color:"#9d9696"}}>{(Number(e.price_v)+Number(e.price_og)+Number(e.price_profit)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</del>}
                                 {index_show_input_table_price===i&& <input className="danh-input" placeholder="+1200000" type="number" step={50000}
                                    value={e.price_og}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_price[i].price_og=e.target.value
                                      this.setState({data:data})
                                    }}
                                  />}
                              </Table.Cell>
                              <Table.Cell>
                                  <i className="fa-solid fa-trash edit-db"
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
                      let l=data.table_price.length;
                      if(data.table_price.length===0){
                          data.table_price.push({
                            name:'',
                            price_v:0,
                            price_og:150000,
                            price_profit:0,
                          });
                      }else{
                        data.table_price.push({
                          name:data.table_price[l-1].name,
                          price_v:data.table_price[l-1].price_v,
                          price_og:data.table_price[l-1].price_og,
                          price_profit:data.table_price[l-1].price_profit,
                        });
                      }
                      this.setState({data:data,index_show_input_table_price:data.table_price.length-1})
                    }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s input_table_infor'>
            <Grid>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h1' textAlign="center">*Thông số kĩ thuật</Header>
                </Form>
              </Grid.Column>
              <Grid.Column width={16}>
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
                          <Table.HeaderCell width={6}>Tên</Table.HeaderCell>
                          <Table.HeaderCell width={10}>Thông số</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {
                          data.table_infor.map((e,i)=>{
                            return <Table.Row key={i}>
                            <Table.Cell className='re'>
                                {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                  onClick={()=>{
                                    let {data}=this.state;
                                    data.table_infor=moveElement(data.table_infor,i,i-1);
                                    this.setState({data:data})
                                  }}
                                ></i>}
                                <input type="text" className="danh-input iput-1" placeholder="..." 
                                  value={e.name}
                                  onChange={(e)=>{
                                    let {data}=this.state;
                                    data.table_infor[i].name=e.target.value;
                                    this.setState({data:data})
                                  }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <input className="danh-input iput-2" placeholder="..." type="text"  
                                    value={e.value}
                                    onChange={(e)=>{
                                      let {data}=this.state;
                                      data.table_infor[i].value=e.target.value;
                                      this.setState({data:data})
                                    }}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e.name}"`)){
                                    let {data}=this.state;
                                    data.table_infor.splice(i,1);
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
                      data.table_infor.push({
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
                        {data.table_commit.map((e,i)=>{
                          return <Table.Row key={i}>
                          <Table.Cell width={14} className='re'>
                              {i>0&&<i className="fa-solid fa-up-long abs hv" style={{left:'-10px',top:'12px'}}
                                onClick={()=>{
                                  let {data}=this.state;
                                  data.table_commit=moveElement(data.table_commit,i,i-1);
                                  this.setState({data:data})
                                }}
                              ></i>}
                            <p><Input fluid icon='shield alternate' placeholder='...'
                                value={e}
                                onChange={(e)=>{
                                  let {data}=this.state;
                                  data.table_commit[i]=e.target.value;
                                  this.setState({data:data})
                                }}
                            /></p>
                          </Table.Cell>
                          <Table.Cell width={2}>
                              <i className="fa-solid fa-trash edit-db"
                                onClick={()=>{
                                  if(window.confirm(`Xác nhận xóa: "${e}"`)){
                                    let {data}=this.state;
                                    data.table_commit.splice(i,1);
                                    this.setState({data:data})
                                  }
                                }}
                              ></i>
                          </Table.Cell>
                      </Table.Row>
                        })}
                      
              
                      </Table.Body>
                  </Table>
                  <div className='add-tbatx'><Button primary icon='add square'
                    onClick={()=>{
                      let {data}=this.state;
                      data.table_commit.push('')
                      this.setState({data:data})
                    }}
                  /></div>
                </div>
              </Grid.Column>
            </Grid>
          </div>
        </Container>

        <div className='footer-edit'>
          <Button size='medium' color='grey'
            onClick={()=>this.props.fs_close()}
          >Hủy</Button>
          <Button primary className='createx'
            onClick={async()=>{
              let {data}=this.state;
              let price=0;
              if(data.table_price[0]!=undefined){
                price=Number(data.table_price[0].price_v)+Number(data.table_price[0].price_profit);
              }
              let rs={
                id:data.id,
                thumnail:data.thumnail,
                title:data.title,
                tag:data.tag,
                price_ss:data.price_ss,
                price:price,
                json_data:JSON.stringify(data)
              }
              let rs_change={
                id:data.id,
                thumnail:data.thumnail,
                title:data.title,
                tag:data.tag,
                price_ss:data.price_ss,
                price:price,
              }
              let a=await create_edit_attributes(rs);
              if(a.status){
                if(data.id==-1){
                  toast.success('Tạo mới thành công.', { theme: "colored" });
                }else{
                  toast.success('Cập nhật thành công', { theme: "colored" });
                }
                this.props.fs_change_attribute(data.id,rs_change)
              }else{
                toast.info('Lỗi rồi bạn ơi', { theme: "colored" });
              }
            }}
          >{this.props.type=="edit"?"Cập nhật":"Tạo mới"}</Button>
        </div>
      </div>
    );
  }
}

