import React, { Component } from 'react';
// import './post.css';
import Editer from '../lib/editer/Editer';
import Input_img from '../lib/input_img';
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
      //
      editer_option: {
        is_open: false,
        text_html: '',
        index: -1
      },
      // main
      data:{
        id:1,
        type:'sp',//sp||bv
        category_id:-1,
        thumnail:'',
        key_word:'Giường săt giá rẻ',
        canonical:"#",
        comments_id:-1,
        quantity_sold:131,
        attribute_id:1,
        img_sp:{
          imgs_list:[],
          img_html:''
        },
        title:'Giường sắt giá rẻ miễn phí vận chuyển',
        short_des:'xxxxxxx',
        long_des:'yyyyyyyyyyyy',
        price:1250000,
        related_keyword:[],
        status:'private',
        is_best_seller:false,
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
      ]
    }
  }
  render() {
    let {data}=this.state;
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
                <Dropdown selection
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
                  icon='table'
                  options={this.state.test}
                  text='Chọn thuộc tính'
                />
              </Grid.Column>
              <Grid.Column width={4}> Hình ảnh sản phẩm: &nbsp;
                <Input_img
                  is_muti={true}
                  fs_result={(rs) => {
                    console.log('line 181+ ',rs)
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
                      <th scope="col">Giá gốc</th>
                      <th scope="col">Giá khuyến mãi</th>
                      <th scope="col">Chọn làm giá hiển thị</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>tầng trên 1m x tầng dưới 1m2 x dài 2m</td>
                      <td><del class="txt-price-alt">1.700.000đ</del></td>
                      <td><strong>1.700.000 đ</strong></td>
                      <td> <Radio toggle /></td>
                    </tr>
                    <tr>
                      <td>1m4x2m</td>
                      <td><del class="txt-price-alt">1.800.000đ</del></td>
                      <td><strong>1.800.000 đ</strong></td>
                      <td> <Radio toggle /></td>
                    </tr>
                    <tr>
                      <td>1m6x2m</td>
                      <td><del class="txt-price-alt">1.900.000đ</del></td>
                      <td><strong>1.900.000 đ</strong> </td>
                      <td> <Radio toggle /></td>
                    </tr>
                    <tr>
                      <td>1m8x2m</td>
                      <td><del class="txt-price-alt">2.700.000đ</del></td>
                      <td><strong>2.000.000 đ</strong> </td>
                      <td> <Radio toggle /></td>
                    </tr>
                  </tbody>
                </table>
                <div class="table-ct">
                  <span>Thông số kĩ thuật :</span>
                  <table class="st-pd-table">
                      <tbody>
                          <tr>
                              <td>Màn hình</td>
                              <td>13.3 inch, 2560 x 1600 Pixels, IPS, IPS LCD LED Backlit, True Tone</td>
                          </tr>
                          <tr>
                              <td>CPU</td>
                              <td>Apple, M1</td>
                          </tr>
                          <tr>
                              <td>RAM</td>
                              <td>8 GB, LPDDR4</td>
                          </tr>
                          <tr>
                              <td>Ổ cứng</td>
                              <td>SSD 256 GB</td>
                          </tr>
                          <tr>
                              <td>Đồ họa</td>
                              <td>Apple M1 GPU 7 nhân</td>
                          </tr>
                          <tr>
                              <td>Trọng lượng</td>
                              <td>1.29 kg</td>
                          </tr>
                          <tr>
                              <td>Kích thước</td>
                              <td>304.1 x 212.4 x 4.1 ~ 16.1 mm</td>
                          </tr>
                          <tr>
                              <td>Xuất xứ</td>
                              <td>Trung Quốc</td>
                          </tr>
                          <tr>
                              <td>Năm ra mắt</td>
                              <td>2020</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div><span className='mdrx'>mở rộng</span></div>
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
                  // label={{ icon: 'asterisk' }}
                  // labelPosition='left corner'
                  // placeholder='...'
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
              <Grid.Column width={16}>
                <Form>
                  <Header as='h4'>*Mô tả ngắn</Header>
                  <TextArea placeholder='...' style={{ minHeight: 80 }}
                  // value={text}
                  // onChange={(e,{value}) => {
                  //   this.props.fs_result(value)
                  // }}
                  />
                </Form>
              </Grid.Column>
            </Grid>
          </div>
          <Header as='h1' textAlign="center">*Nội dung bài viết</Header>
          <div className='re'>
            <Segment>
              <div className='text-dt'>
                <div dangerouslySetInnerHTML={{ __html: test_html }}></div>
              </div>
            </Segment>
            <div className='editxx'>
              <Button content='Chỉnh sửa nội dung' primary />
            </div>
          </div>
        </Container>

        <div className='footer-edit'>
          <div style={{ display: "inline-block", paddingRight: "50px" }}>
            <Dropdown
              value={this.state.selected_test}
              options={this.state.test}
              onChange={(e, { value }) => {
                this.setState({ selected_test: value })
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
            console.log("🚀 ~ file: editer_post.js:240 ~ Editer_post ~ render ~ rs:", rs)
            // let {data}=this.props;
            // data[editer_option.index]=rs;
            // this.props.fs_return(data)
            // this.setState({editer_option:{is_open:false,text_html:'',index:-1}});

          }}
        />}
      </div>
    );
  }
}

