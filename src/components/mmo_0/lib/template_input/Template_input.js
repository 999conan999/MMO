import React, { Component } from 'react';
import './template_input.css'
// import { toast } from 'react-toastify';
import Editer from '../editer/Editer';
import {Card,Grid,Segment,Input, Image,Form,TextArea,Checkbox,Dropdown,Button, Icon,Table } from 'semantic-ui-react'
export default class Template_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      a:1,
      test:[
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
        { key: 'German', text: 'German', value: 'German' },
        { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
      ],
      tesst_vlue:[],
      //
      editer_option:{
        is_open:false,
        data:''
      }
    }
  }
  render() {
    let {editer_option}=this.state;
      return (
        <React.Fragment>
          <Segment horizontal className='wrap-temp-input'
            // loading
          >
            <Grid>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={12}>
                  <Card className='wrap-item-input' style={{backgroundColor:"rgb(255 218 218)"}}>
                    <Card.Content>
                      <Card.Header>Matthew</Card.Header>
                      <Card.Meta>
                        <span className='date'>Matthew is a musician</span>
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='content-z'>
                                <h2>Giường sắt là gì?</h2><h3>Giường sắt là gì?</h3> <p>- <strong>Giường sắt</strong> là một loại <strong>giường ngủ</strong> được làm từ kim loại sắt hoặc hợp kim sắt, phần lớn ở đây là sắt, hoặc inox là chính. Thường được sử dụng trong các căn phòng ngủ hiện đại hoặc các khu trọ, giường sắt có thiết kế đơn giản và chắc chắn, giúp cho người sử dụng có thể nghỉ ngơi một cách thoải mái và an toàn.</p> <h3>Ưu điểm của giường sắt</h3> <ul> <li><strong>Độ bền cao</strong>: Giường sắt được làm từ vật liệu là sắt hoặc inox, cho nên có độ bền cao hơn so với những loại giường làm từ các vật liệu khác như giường gỗ, giường nhựa hay giường MDF. Điều này giúp giường sắt có thể sử dụng trong thời gian dài mà không cần phải lo lắng về việc sửa chữa hay thay thế.</li> <li><strong>Chống mối mọt</strong>: Vì được làm từ kim loại, giường sắt không bị mối mọt, không bị ảnh hưởng bởi môi trường ẩm ướt hay thời tiết khắc nghiệt. Điều này giúp giường sắt có tuổi thọ lâu dài và không cần phải bảo trì thường xuyên.</li> <li><strong>Dễ vệ sinh</strong>: Giường sắt có bề mặt phẳng, thiết kế đơn giản. Do đó, việc vệ sinh giường rất là dễ dàng và nhanh chóng.</li> <li><strong>Thiết kế đa dạng</strong>: Giường sắt có nhiều kiểu dáng và màu sắc khác nhau để phù hợp với nhu cầu và phong cách của từng người dùng. Người dùng có thể lựa chọn kiểu giường sắt với nhiều hình dáng, đường nét và màu sắc khác nhau để phù hợp với nội thất của căn phòng ngủ.</li> <li><strong>An toàn</strong>: Giường sắt có cấu trúc chắc chắn, không dễ bị đổ, gãy hay sập xuống. Điều này giúp người dùng cảm thấy an toàn hơn khi sử dụng giường sắt, đặc biệt là với trẻ nhỏ hay người già.</li> </ul> <figure><img title="Giường sắt hộp giá rẻ" src="https://anbinhnew.com/wp-content/uploads/2021/04/giuong-sat-1-met.jpg" alt="Giường sắt hộp giá rẻ"/> <figcaption>Giường sắt hộp giá rẻ</figcaption> </figure>
                        </div>
                        <div className='edit-content'>
                          <button
                            onClick={()=>this.setState({editer_option:{
                              is_open:true,
                              data:'<h2>Giường sắt là gì?</h2><h3>Giường sắt là gì?</h3> <p>- <strong>Giường sắt</strong> là một loại <strong>giường ngủ</strong> được làm từ kim loại sắt hoặc hợp kim sắt, phần lớn ở đây là sắt, hoặc inox là chính. Thường được sử dụng trong các căn phòng ngủ hiện đại hoặc các khu trọ, giường sắt có thiết kế đơn giản và chắc chắn, giúp cho người sử dụng có thể nghỉ ngơi một cách thoải mái và an toàn.</p> <h3>Ưu điểm của giường sắt</h3> <ul> <li><strong>Độ bền cao</strong>: Giường sắt được làm từ vật liệu là sắt hoặc inox, cho nên có độ bền cao hơn so với những loại giường làm từ các vật liệu khác như giường gỗ, giường nhựa hay giường MDF. Điều này giúp giường sắt có thể sử dụng trong thời gian dài mà không cần phải lo lắng về việc sửa chữa hay thay thế.</li> <li><strong>Chống mối mọt</strong>: Vì được làm từ kim loại, giường sắt không bị mối mọt, không bị ảnh hưởng bởi môi trường ẩm ướt hay thời tiết khắc nghiệt. Điều này giúp giường sắt có tuổi thọ lâu dài và không cần phải bảo trì thường xuyên.</li> <li><strong>Dễ vệ sinh</strong>: Giường sắt có bề mặt phẳng, thiết kế đơn giản. Do đó, việc vệ sinh giường rất là dễ dàng và nhanh chóng.</li> <li><strong>Thiết kế đa dạng</strong>: Giường sắt có nhiều kiểu dáng và màu sắc khác nhau để phù hợp với nhu cầu và phong cách của từng người dùng. Người dùng có thể lựa chọn kiểu giường sắt với nhiều hình dáng, đường nét và màu sắc khác nhau để phù hợp với nội thất của căn phòng ngủ.</li> <li><strong>An toàn</strong>: Giường sắt có cấu trúc chắc chắn, không dễ bị đổ, gãy hay sập xuống. Điều này giúp người dùng cảm thấy an toàn hơn khi sử dụng giường sắt, đặc biệt là với trẻ nhỏ hay người già.</li> </ul>  '
                            }})}
                          >Chỉnh sửa</button>
                        </div>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>

                        <div className='tabkzx'>
                          <Table collapsing unstackable >
                            <Table.Header className='header-table-tem'>
                              <Table.Row>
                                <Table.HeaderCell>
                                  Thuộc tính <Icon name="edit" className='cu'/>
                                  <div className='re'>
                                    <Input placeholder='....' className='header-mmo-tempalate' />
                                    <Icon name='x' className='xe'/>
                                    <Icon name='checkmark' className='ce'/>
                                  </div>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  Giá gốc <Icon name="edit" className='cu'/>
                                  {/* <div className='re'>
                                    <Input placeholder='....' className='header-mmo-tempalate' />
                                    <Icon name='x' className='xe'/>
                                    <Icon name='checkmark' className='ce'/>
                                  </div> */}
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                  Giá khuyến mãi <Icon name="edit" className='cu'/>
                                  {/* <div className='re'>
                                    <Input placeholder='....' className='header-mmo-tempalate' />
                                    <Icon name='x' className='xe'/>
                                    <Icon name='checkmark' className='ce'/>
                                  </div> */}
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body className='body-table-mmo-temp'>
                              <Table.Row style={{position:"relative"}}>
                                <Table.Cell>
                                  <Input placeholder='....' className='header-mmo-tempalate' />
                                </Table.Cell>
                                <Table.Cell>
                                  <Input placeholder='....' className='header-mmo-tempalate' />
                                </Table.Cell>
                                <Table.Cell>
                                <Input placeholder='....' className='header-mmo-tempalate' />
                                </Table.Cell>
                                <i className="fa-solid fa-circle-xmark icon-x-img" style={{top:'8px'}}></i>
                              </Table.Row>
      
                            </Table.Body>
    
                          </Table>
                          <div className='btun'>
                            <Button icon primary>
                              <Icon name='add square' />
                            </Button>
                          </div>
                        </div>

                        
                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Image
                          floated='right'
                          size='mini'
                          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                          <button className='buzz'
                          // onClick={()=>this.props.open_modal_img('img_1')}
                        >
                          <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                        </button>
                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <button className='buzz' style={{float:"right"}}
                          // onClick={()=>this.props.open_modal_img('img_1')}
                        >
                          <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                        </button>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                        <div className='img-muti'>
                          <Image
                            size='tiny'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                          />
                          <i className="fa-solid fa-angles-left icon-img-muit"></i>
                          <i className="fa-solid fa-circle-xmark icon-x-img"></i>
                        </div>

                        <div className='img-muti'>
                          <Image
                            size='tiny'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                          />
                          <i className="fa-solid fa-angles-left icon-img-muit"></i>
                          <i className="fa-solid fa-circle-xmark icon-x-img"></i>
                        </div>

                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>

                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>Mattxxxhew</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician living in Nashville.</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra >
                        <Input
                          label={{ icon: 'asterisk' }}
                          labelPosition='left corner'
                          placeholder='...'
                          className="input-1"
                        />
                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>

                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                      </Card.Content>
                      <Card.Content extra >
                        <Checkbox toggle label={{ children: 'Make my profile visible' }} />
                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>4</Grid.Column>
                <Grid.Column width={8}>

                    <Card className='wrap-item-input'>
                          <Card.Content>
                            <Card.Header>Matthew</Card.Header>
                            <Card.Meta>
                              <span className='date'>Matthew is a musician living in Nashville.</span>
                            </Card.Meta>
                          </Card.Content>
                          <Card.Content extra >
                            <Form>
                              <TextArea placeholder='...' style={{ minHeight: 150 }} />
                            </Form>
                          </Card.Content>
                        </Card>

                </Grid.Column>
                <Grid.Column width={4}>4</Grid.Column>
                <Grid.Column width={4}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                      <Dropdown  
                        value={this.state.a}
                        options={[
                            { key: 1, text: 'Choice 1', value: 1 },
                            { key: 2, text: 'Choice 2', value: 2 },
                            { key: 3, text: 'Choice 3', value: 3 },
                          ]} 
                          onChange={(e,data) => {
                            console.log("🚀 ~ file: Template_input.js:164 ~ Template_input ~ render ~ data:", data)
                          this.setState({a:data.value})
                          }}
                      />

                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>tag</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>

                      <Dropdown
                        options={this.state.test}
                        placeholder='...'
                        search
                        selection
                        fluid
                        multiple
                        allowAdditions
                        value={this.state.tesst_vlue}
                        onAddItem={(e, { value }) => {
                          this.setState((prevState) => ({
                            test: [{ text: value, value }, ...prevState.test],
                          }))
                        }}
                        onChange={(e, { value }) => this.setState({ tesst_vlue: value })}
                      />
                      </Card.Content>
                    </Card>

                </Grid.Column>
                <Grid.Column width={4}>
                    <Card className='wrap-item-input'>
                      <Card.Content>
                        <Card.Header>category</Card.Header>
                        <Card.Meta>
                          <span className='date'>Matthew is a musician</span>
                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>

                      <Dropdown
                        options={this.state.test}
                        placeholder='...'
                        multiple
                        selection
                        fluid
                        // value={this.state.tesst_vlue}
                        // onChange={(e, { value }) => this.setState({ tesst_vlue: value })}
                      />
                      </Card.Content>
                    </Card>

                </Grid.Column>
            </Grid>
            {editer_option.is_open&&<Editer
              close={()=>{
                let {editer_option}=this.state;
                editer_option.is_open=false;
                this.setState({editer_option:editer_option})
              }}
              data={editer_option.data}
              rs_data={(data) => {
                console.log("🚀 ~ file: Template_input.js:328 ~ Template_input ~ render ~ data:", data)
              }}
            />}
          </Segment>
        </React.Fragment>
      );
  }
}

