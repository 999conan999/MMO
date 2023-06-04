import React, { Component } from 'react';
// import './post.css';
import Editer from '../lib/editer/Editer';
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container, Grid, Button, Dropdown, Segment, Input, Image, Checkbox, Header, TextArea, Form } from 'semantic-ui-react'
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
      }
    }
  }
  render() {
    return (
      <div className='wrap-editer-post'>
        <Container>
          <Header as='h1'>*Tạo bài viết mới</Header>

          <div className='wrap-s'>
            <Grid>
              {/* <Grid.Column width={16}></Grid.Column> */}
              <Grid.Column width={4}>
                <Header as='h4'>*<span style={{ color: "#03A9F4" }}>Bài viết</span> hay <span style={{ color: "#03A9F4" }}>sản phẩm</span></Header>
                <Dropdown selection
                  value={this.state.selected_test}
                  options={this.state.test}
                  onChange={(e, { value }) => {
                    this.setState({ selected_test: value })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as='h4'>*Chọn danh mục</Header>
                <Dropdown selection
                  value={this.state.selected_test}
                  options={this.state.test}
                  onChange={(e, { value }) => {
                    this.setState({ selected_test: value })
                  }}
                />
              </Grid.Column>
              <Grid.Column width={4} >
                <Header as='h4'>*Chọn hình đại diện</Header>
                <button className='buzz re'
                //   onClick={()=>{
                //     let keyLock=makeid(6);
                //     this.setState({
                //         selected_img:{
                //             type:keyLock,
                //         }
                //     });
                //     this.props.openAction({
                //         type:"OPEN",
                //         is_muti_selected:false,
                //         keyLock:keyLock
                //     })
                // }}
                >
                  <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                  <Image
                    floated='right'
                    size='tiny'
                    src={'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-don-Hoang-Gia-mau-HG02-300x300.jpg'}
                    className='thuasda'
                  />
                </button>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as='h4'>*Từ khóa Chính (cần SEO):</Header>
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
              </Grid.Column>
              <Grid.Column width={8}>
                <Form>
                  <Input label='URL tham chiếu' placeholder='131' fluid />
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
              Chọn nơi ánh xạ comments:{' '}
                <Dropdown selection
                  value={this.state.selected_test}
                  options={this.state.test}
                  onChange={(e, { value }) => {
                    this.setState({ selected_test: value })
                  }}
                />
              </Grid.Column>
            </Grid>
          </div>
          <div className='wrap-s'>
            <Grid>
              <Grid.Column width={3}>
                <Form>
                  <Input label='Đã bán' placeholder='131' fluid/>
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
                <button className='buzz re'
                //   onClick={()=>{
                //     let keyLock=makeid(6);
                //     this.setState({
                //         selected_img:{
                //             type:keyLock,
                //         }
                //     });
                //     this.props.openAction({
                //         type:"OPEN",
                //         is_muti_selected:false,
                //         keyLock:keyLock
                //     })
                // }}
                >
                  <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                </button>
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
                    </tr>
                    <tr>
                      <td>1m4x2m</td>
                      <td><del class="txt-price-alt">1.800.000đ</del></td>
                      <td><strong>1.800.000 đ</strong></td>
                    </tr>
                    <tr>
                      <td>1m6x2m</td>
                      <td><del class="txt-price-alt">1.900.000đ</del></td>
                      <td><strong>1.900.000 đ</strong> </td>
                    </tr>
                    <tr>
                      <td>1m8x2m</td>
                      <td><del class="txt-price-alt">2.700.000đ</del></td>
                      <td><strong>2.000.000 đ</strong> </td>
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
                  <div className='img-muti'>
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
                  </div>
                  <div className='img-muti'>
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
                  </div>
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

