import React, { Component } from 'react';
import './template_input.css'
// import { toast } from 'react-toastify';
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
      tesst_vlue:[]
    }
  }
  render() {
    console.log("run")
      return (
        <React.Fragment>
          <Segment horizontal className='wrap-temp-input'
            // loading
            
          >
            <Grid>
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
                                <Input placeholder='....' className='header-mmo-tempalate' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <Input placeholder='...' className='header-mmo-tempalate' />
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <Input placeholder='...' className='header-mmo-tempalate' />
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
          </Segment>
        </React.Fragment>
      );
  }
}

