import React, { Component } from 'react';
import './post.css'
// import { toast } from 'react-toastify';
// import Template_input from '../lib/template_input/Template_input';
import { Container,Grid,Button,Dropdown,Segment,Input,Image,Icon,Header,TextArea,Form } from 'semantic-ui-react'
export default class Editer_post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // data:[],
        test:[
          { text: 'Hiển thị tất cả danh mục', value: 'English' },
          {text: 'French', value: 'French' },
          { text: 'Spanish', value: 'Spanish' },
          {text: 'German', value: 'German' },
          { text: 'Chinese', value: 'Chinese' },
        ],
        selected_test:'English',
        selected_test_arr:[]
      
    }
  }
  render() {
      return (
        <div className='wrap-editer-post'>
              {/* <Grid>
                <Grid.Column width={12}>x</Grid.Column>
              </Grid> */}
              <Container>
              <Header as='h1'>*Tạo bài viết mới</Header>
                <div className='wrap-s'>
                  <Grid>
                    {/* <Grid.Column width={16}></Grid.Column> */}
                    <Grid.Column width={4}>
                      <Header as='h4'>*<span style={{color:"#03A9F4"}}>Bài viết</span> hay <span style={{color:"#03A9F4"}}>sản phẩm</span></Header>
                      <Dropdown  selection
                        value={this.state.selected_test}
                        options={this.state.test}
                        onChange={(e,{value}) => {
                          this.setState({selected_test:value})
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Header as='h4'>*Chọn danh mục</Header>
                      <Dropdown  selection
                        value={this.state.selected_test}
                        options={this.state.test}
                        onChange={(e,{value}) => {
                          this.setState({selected_test:value})
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
                      <Header as='h4'>*Thêm tag (nếu cần)</Header>
                      <Dropdown
                          options={this.state.test}
                          placeholder='...'
                          search
                          selection
                          fluid
                          multiple
                          allowAdditions
                          value={this.state.selected_test_arr}
                          onAddItem={(e, { value }) => {
                            let {test}=this.state;
                            test=[{ text: value, value }, ...test]
                            this.setState({test:test})
                          }}
                          onChange={(e, { value }) => {
                            this.setState({selected_test_arr:value})
                          }}
                        />
                    </Grid.Column>
                  </Grid>
                </div>
                
                <div className='wrap-s'>
                  <Grid>
                      <Grid.Column width={10}>
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
                      <Grid.Column width={6}>
                        <Header as='h4'>*Chọn bảng giá</Header>
                        <Dropdown  selection
                        value={this.state.selected_test}
                        options={this.state.test}
                        onChange={(e,{value}) => {
                          this.setState({selected_test:value})
                        }}
                      />
                      </Grid.Column>
                  </Grid>
                </div>
                <div className='wrap-s'>
                  <Grid>
                      <Grid.Column width={16}>
                        <Form>
                          <Header as='h4'>*Mô tả ngắn</Header>
                          <TextArea placeholder='...' style={{ minHeight:80 }} 
                              // value={text}
                              // onChange={(e,{value}) => {
                              //   this.props.fs_result(value)
                              // }}
                            />
                        </Form>
                      </Grid.Column>
                      
                  </Grid>
                </div>
                <Grid>
                    <Grid.Column width={10}>
                    <div className='wrap-s'>
xxx
                    </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <div className='wrap-s'>
xxx
                    </div>
                    </Grid.Column>
                </Grid>

              </Container>
              
              <div className='footer-edit'>
                <Button size='medium'  color='grey'>Hủy</Button> 
                <Button primary  className='createx'>Tạo bài viết mới</Button>
              </div>
        </div>
      );
  }
}

