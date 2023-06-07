import React, { Component } from 'react';
// import './post.css';
import Editer from '../lib/editer/Editer';
import Input_img from '../lib/input_img';
import { moveElement } from '../lib/fs';
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container, Grid, Button, Dropdown, Segment, Input, Image, Radio, Header, TextArea, Form } from 'semantic-ui-react'
const test_html = '<p>Giường được làm bằng sắt ống tròn phi 49, có thể tháo ráp dễ dàng.</p> <p>Giường được sơn bằng&nbsp;<span style="color: rgb(186, 55, 42);"><strong>sơn tĩnh điện</strong></span>&nbsp;chống rỉ sét.</p> <p>Hỗ trợ kích thước:&nbsp;<span style="color: rgb(186, 55, 42);"><strong>80cmx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1mx2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m2x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m4x2m</strong></span>, <span style="color: rgb(186, 55, 42);"><strong>1m6x2m</strong></span>,&nbsp;<span style="color: rgb(186, 55, 42);"><strong>1m8x2m</strong></span>.</p> <p><strong>Giá rẻ nhất</strong>&nbsp;trong các dòng giường sắt, sử dụng cũng khá bền.&nbsp;<span style="color: rgb(186, 55, 42);"><strong>Nếu như các bạn đang cần một chiếc giường và không cần quá cầu kì, thì đây là sự lựa chọn giúp bạn tiết kiệm khá nhiều chi phí đấy nhé!</strong></span></p>'
export default class Editer_post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // data:[],
      test: [
        { text: 'Hiển thị tất cả danh mục', value: 'English' },
        { text: 'French', value: 'French' },
        { text: 'Spanish', value: 'Spanish' },
        { text: 'German', value: 'German' },
        { text: 'Chinese', value: 'Chinese' },
      ],
      selected_test: 'English',
      selected_test_arr: [],
      //main
      editer_option: {
        is_open: false,
        text_html: '',
        index: -1
      },
      // 
      data:{
        id:1,
        type:'sp',//sp||bv
        category_id:-1,
        thumnail:'',
        key_word:'Giường săt giá rẻ',
        canonical:"#",
        comments_id:-1,
        quantity_sold:131,
        attribute_id:-1,
        img_sp:{
          imgs_list:[],
          img_html:''
        },
        title:'Giường sắt giá rẻ miễn phí vận chuyển',
        short_des:'xxxxxxx',
        long_des:test_html,
        price:1250000,
        related_keyword:[],
        status:'private',
        is_best_seller:false,
        index_price:0,
        show_price:0
      },
      //
      category_list:[
        {
          text:"Chưa chọn danh mục",
          value:-1
        },
        {
          text:"Giường sắt",
          value:1
        },
        {
          text:"Giường gỗ",
          value:2
        },
        {
          text:"Giường tre",
          value:3
        },
        {
          text:"Giường xếp",
          value:4
        },
        {
          text:"Giường ngủ giá rẻ",
          value:5
        },
      ],
      //
      attribute_list:[
        {
          value:1,
          text:'giường sắt ống tròn',
          data:'{"name":"Giường sắt ống tròn","tag":"Giường sắt","thumnail":"","price_ss":300000,"attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"850000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000"},{"name":"1m2x2m","price_v":"950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m4x2m","price_v":"1050000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m6x2m","price_v":"1150000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"},{"name":"1m8x2m","price_v":"1250000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, xanh dương"},{"name":"Chất liệu sắt","value":"sắt ống tròn phi 49; dày 8zem"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        },
        {
          value:2,
          text:'giường sắt hộp 4x8',
          data:'{"name":"giường sắt hộp 4x8","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"1100000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000"},{"name":"1m2x2m","price_v":"1250000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000"},{"name":"1m4x2m","price_v":"1400000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"},{"name":"1m6x2m","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"},{"name":"1m8x2m","price_v":"1600000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, xanh dương"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 4x8"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        },
        {
          value:3,
          text:'giường sắt hộp 5x10',
          data:'{"name":"giường sắt hộp 5x10","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"1mx2m","price_v":"1300000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m2x2m","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m4x2m","price_v":"1650000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m6x2m","price_v":"1800000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"1m8x2m","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, hồng"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 5x10"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        },
        {
          value:4,
          text:'giường sắt tầng sắt',
          data:'{"name":"giường sắt tầng sắt","tag":"Giường sắt","thumnail":"","price_ss":"400000","attribute_name":"Kích thước","is_show_price_table":true,"table_price":[{"name":"tầng trên 1m2 x dưới 1m2","price_v":"1400000","price_og":"150000","price_profit":"400000","price_sale":"NaN440400400040000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m4 x dưới 1m4","price_v":"1500000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m6 x dưới 1m6","price_v":"1650000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 1m8 x dưới 1m8","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"},{"name":"tầng trên 80cm x dưới 80cm","price_v":"1950000","price_og":"150000","price_profit":"400000","price_sale":"undefined400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000400000"}],"is_show_infor":true,"table_infor":[{"name":"Xuất xứ","value":"Việt Nam"},{"name":"Thương hiệu","value":"An Bình"},{"name":"Kích thước","value":"1mx2m, 1m2x2m, 1m4x2m, 1m6x2m, 1m8x2m - cao 30cm từ mặt đất lên vạt giường"},{"name":"Màu sắc","value":"trắng, kem, hồng"},{"name":"Chất liệu sắt","value":"sắt hộp vuông 5x10"},{"name":"Chất liệu sơn","value":"Sơn tĩnh điện"},{"name":"Đối tượng sử dụng","value":"Học sinh, mọi người"},{"name":"Bảo hành","value":"3 tháng"}],"is_show_commit":true,"table_commit":["Sản phẩm chính hãng","Đổi một trong vòng 3 tháng","Miễn Phí giao hàng tại tp Hồ Chí Minh","Bảo hành 2 năm"]}'
        },
      ],
      //ho tro
      table_attribute:{
        table_price:[],
        table_infor:[],
        img:''
      },
      is_hidden_1:true
    }
  }
  render() {
    let {data,table_attribute}=this.state;
    return (
      <div className='wrap-editer-post'>
        <Container>
          <Header as='h1'>*Tạo bài viết mới</Header>

          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={4}>
                <Header as='h4'>*<span style={{ color: "#03A9F4" }}>Bài viết</span> hay <span style={{ color: "#03A9F4" }}>sản phẩm</span></Header>
                <Dropdown selection
                  value={data.type}
                  options={[{text:'Sản phẩm',value:'sp'},{text:'Bài viết',value:'bv'}]}
                  onChange={(e, { value }) => {
                    let {data}=this.state;
                    data.type=value;
                    this.setState({ data: data })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as='h4'>*Chọn danh mục</Header>
                <Dropdown selection search
                  value={data.category_id}
                  options={this.state.category_list}
                  onChange={(e, { value }) => {
                    let {data}=this.state;
                    data.category_id=value;
                    this.setState({ data: data })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <div className='re'>
                  <Input_img
                    is_muti={false}
                    fs_result={(rs) => {
                      console.log('line 120+ ',rs)
                      let {data}=this.state;
                      data.thumnail=rs[0].url;
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
              <Grid.Column width={4}>
                <Header as='h4'>*Từ khóa Chính (cần SEO):</Header>
                <Input
                  className="input-1"
                  label={{ icon: 'asterisk' }}
                  labelPosition='left corner'
                  placeholder='...'
                  value={data.key_word}
                  onChange={(e,{value}) => {
                    let {data}=this.state;
                    data.key_word=value;
                    this.setState({ data: data })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Form>
                  <Input label='URL tham chiếu' placeholder='https://' fluid
                    value={data.canonical}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.canonical=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
              Ánh xạ comments:{' '}
                <span className='anh-xa'>{data.comments_id==-1?'Chính bài viết này':'Comments tại : '+data.comments_id}</span>
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={3}>
                <Form>
                  <Input label='Đã bán' placeholder='131' fluid type='number'
                    value={data.quantity_sold}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.quantity_sold=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={4}>
                <Dropdown
                  button
                  className='icon'
                  floating
                  labeled
                  search
                  icon='table'
                  placeholder='Chọn thuộc tính'
                  options={this.state.attribute_list}
                  value={data.attribute_id}
                  onChange={(e, { value }) => {
                    let {data,attribute_list}=this.state;
                    data.attribute_id=value;
                    let data_attribute=attribute_list.filter(e => e.value === value);
                    let table_attribute={
                      table_price:[],
                      table_infor:[],
                      img:''
                    }
                    if(data_attribute.length>0){
                      data_attribute=JSON.parse(data_attribute[0].data);
                      table_attribute.table_price=data_attribute.table_price;
                      table_attribute.table_infor=data_attribute.table_infor;
                      table_attribute.img=data_attribute.thumnail;
                    } 
                    this.setState({ data: data,table_attribute:table_attribute })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}> Hình ảnh sản phẩm: &nbsp;
                <Input_img
                  is_muti={true}
                  fs_result={(rs) => {
                    let {data}=this.state;
                    data.img_sp.imgs_list=[...rs,...data.img_sp.imgs_list];
                    data.img_sp.imgs_list=data.img_sp.imgs_list.filter((item, index, self) => {
                      return index === self.findIndex((t) => (
                          t.id === item.id
                      ));
                    });
                    this.setState({ data: data })
                  }}
                />
              </Grid.Column>

              <Grid.Column width={7}>
                <table class="table-dt" border="1">
                  <thead>
                    <tr>
                      <th scope="col">Loại sản phẩm</th>
                      <th scope="col">Giá vốn</th>
                      <th scope="col">Giá bán</th>
                      <th scope="col">Chọn làm giá hiển thị</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table_attribute.table_price.map((e,i) => {
                         return <tr key={i}>
                        	<td>{e.name}</td>
                        	<td><span class="txt-price-alt">{Number(e.price_v).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</span></td>
                        	<td><strong>{(Number(e.price_v)+Number(e.price_profit)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}</strong></td>
                        	<td> <Radio toggle 
                            checked={data.index_price==i?true:false}
                            onChange={()=>{
                              if(data.index_price!=i){
                                let {data}=this.state;
                                data.index_price=i;
                                data.show_price=Number(e.price_v)+Number(e.price_profit);
                                this.setState({data:data})
                              }
                            }}
                          /></td>
                      	</tr>
                      })
                    }
                  </tbody>
                </table>
                <div class="table-ct"  style={this.state.is_hidden_1?{}:{maxHeight:"inherit"}}>
                  <span>Thông số kĩ thuật :</span>
                  <table class="st-pd-table">
                      <tbody>
                        {
                          table_attribute.table_infor.map((e,i)=>{
                            return <tr key={i}>
                            <td>{e.name}</td>
                            <td>{e.value}</td>
                        </tr>
                          })
                        }
                      </tbody>
                  </table>
              </div>
              <div><span className='mdrx'
                onClick={()=>this.setState({is_hidden_1:!this.state.is_hidden_1})}
              >{this.state.is_hidden_1?'mở rộng':'thu nhỏ'}</span></div>
              </Grid.Column>
              <Grid.Column width={9}>
                <div>
                  {
                    data.img_sp.imgs_list.map((e,i)=>{
                      return <div className='img-muti' key={e.id}>
                      <Image
                        size='tiny'
                        src={e.url}
                      />
                      {i>0&&<i className="fa-solid fa-angles-left icon-img-muitxx"
                        onClick={()=>{
                            let {data}=this.state;
                            data.img_sp.imgs_list=moveElement(data.img_sp.imgs_list,i,i-1)
                            this.setState({ data: data })
                        }}
                      ></i>}
                      <i className="fa-solid fa-trash icon-x-imgxx"
                        onClick={()=>{
                          if(window.confirm("Xác nhận xóa!")){
                            let {data}=this.state;
                            data.img_sp.imgs_list=data.img_sp.imgs_list.filter(z =>z.id !== e.id)
                            this.setState({ data: data })
                          }
                        }}
                      ></i>
                    </div>
                    })
                  }
                  
                  {/* <div className='img-muti'>
                    <Image
                      size='tiny'
                      src="https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg"
                    />
                    <i className="fa-solid fa-angles-left icon-img-muitxx"
                      // onClick={()=>this.props.move_left_action(i)}
                    ></i>
                    <i className="fa-solid fa-trash icon-x-imgxx"
                      // onClick={()=>{
                      //   if(window.confirm("Xác nhận xóa!")){
                      //     this.props.removeAction(e.id)
                      //   }
                      // }}
                    ></i>
                  </div> */}
                </div>
              </Grid.Column>

            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={12}>
                <Form>
                  <Header as='h4'>*Tiêu đề bài viết</Header>
                  <Input
                    className="input-1"
                    value={data.title}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.title=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h4'>*Mô tả ngắn</Header>
                  <TextArea placeholder='...' style={{ minHeight: 80 }}
                    value={data.short_des}
                    onChange={(e,{value}) => {
                      let {data}=this.state;
                      data.short_des=value;
                      this.setState({ data: data })
                    }}
                  />
                </Form>
              </Grid.Column>
            </Grid>
          </div>
          <Header as='h1' textAlign="center">*Nội dung bài viết</Header>
          <div className='re'>
            <Segment>
              <div className='text-dt'>
                <div dangerouslySetInnerHTML={{ __html: data.long_des }}></div>
              </div>
            </Segment>
            <div className='editxx'>
              <Button content='Chỉnh sửa nội dung' primary
                onClick={()=>{
                  this.setState({
                    editer_option:{
                      is_open:true,
                      text_html:data.long_des,
                      index:1
                    }
                  })
                }}
              />
            </div>
          </div>
        </Container>

        <div className='footer-edit'>
          <div style={{ display: "inline-block", paddingRight: "50px" }}>
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
          <Button size='medium' color='grey'>Hủy</Button>
          <Button primary className='createx'>Tạo bài viết mới</Button>
        </div>
        {this.state.editer_option.is_open && <Editer
          close={() => this.setState({ editer_option: { is_open: false, text_html: '', index: -1 } })}
          data={this.state.editer_option.text_html}
          rs_data={(rs) => {
            let {data,editer_option}=this.state;
            if(editer_option.index==1){
              data.long_des=rs
              this.setState({data:data,editer_option: { is_open: false, text_html: '', index: -1 }});
            }
          }}
        />}
      </div>
    );
  }
}

