import React, { Component } from 'react';
import {Card,Grid,Input,Button, Icon,Table,Segment } from 'semantic-ui-react'
export default class Table_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
      return (
        <React.Fragment>
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
                    <Segment className='clorg'>
                      <Table size='small' padded>
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
                    </Segment>
                    <div className='btun'>
                      <Button icon primary>
                        <Icon name='add square' />
                      </Button>
                    </div>
                  </div>

                  
                </Card.Content>
              </Card>

          </Grid.Column>
        </React.Fragment>
      );
  }
}

