import React, { Component } from 'react';
import {Card,Grid,Input,Button, Icon,Table,Segment } from 'semantic-ui-react';
import { moveElement } from '../../../fs';
export default class Table_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index_show_edit_header:-1
    }
  }
  render() {
    let {index_show_edit_header}=this.state
    let {option,arr}=this.props;
    let bg_color={};
    if(option.bg_color!=undefined) bg_color.backgroundColor=option.bg_color;
      return (
        <React.Fragment>
          {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
          <Grid.Column  width={option.size==undefined?12:option.size}>
              <Card className='wrap-item-input' style={bg_color}>
                <Card.Content>
                  <Card.Header>{option.name}</Card.Header>
                  <Card.Meta>
                    <span className='date'>{option.des}</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>

                  <div className='tabkzx'>
                    {arr.length>1&&<Segment className='clorg'>
                      <Table size='small' padded>
                        <Table.Header className='header-table-tem'>
                          <Table.Row>
                            {
                              arr[0].map((e,i)=>{
                                return <Table.HeaderCell key={i}>{e} &nbsp;
                                 {option.is_editer_table_header&&<Icon name="edit" className='cu'
                                  onClick={()=>this.setState({index_show_edit_header:i})}
                                 />}
                                    {index_show_edit_header==i&&<div className='re'>
                                      <Input placeholder='....' className='header-mmo-tempalate' 
                                        value={e}
                                        onChange={(event,{value})=>{
                                          let {arr}=this.props;
                                          arr[0][i]=value
                                          this.props.fs_result(arr)
                                        }}
                                      />
                                      <Icon name='checkmark' className='xe'
                                        onClick={()=>this.setState({index_show_edit_header:-1})}
                                      />
                                    </div>}
                                  </Table.HeaderCell>
                              })
                            }
                          </Table.Row>
                        </Table.Header>
                        <Table.Body className='body-table-mmo-temp'>
                        {
                              arr.map((rowz,i)=>{
                                if(i>0){
                                 return <Table.Row style={{position:"relative"}} key={i}>
                                    {
                                      rowz.map((e,j)=>{
                                        return  <Table.Cell>
                                        <Input placeholder='....'           
                                          className='header-mmo-tempalate' 
                                          value={e}
                                          onChange={(event,{value})=>{
                                            let {arr}=this.props;
                                            arr[i][j]=value;
                                            this.props.fs_result(arr)
                                          }}
                                        />
                                      </Table.Cell>
                                      })
                                    }
                                    <i className="fa-solid fa-circle-xmark icon-x-img" style={{top:'8px'}}
                                      onClick={()=>{
                                        if(window.confirm("Xác nhận xóa!")){
                                          let {arr}=this.props;
                                          arr.splice(i,1);
                                          this.props.fs_result(arr)
                                        }
                                      }}
                                    ></i>
                                    {i>1&&<Icon name="angle double up" className='icon-up'
                                      onClick={()=>{
                                        let {arr}=this.props;
                                        arr=moveElement(arr,i,i-1)
                                        this.props.fs_result(arr)
                                      }}
                                    />}
                                 </Table.Row>
                                }
                              })
                          }

                        </Table.Body>

                      </Table>
                    </Segment>}
                    <div className='btun'>
                      <Button icon primary
                        onClick={()=>{
                          let {arr}=this.props;
                          arr.push(Array(option.table_header.length).fill(""));
                          this.props.fs_result(arr)
                        }}
                      >
                        <Icon name='add square'/>
                      </Button>
                    </div>
                  </div>

                  
                </Card.Content>
              </Card>

          </Grid.Column>
          {option.space_after!=undefined&&option.space_after!=0&&<Grid.Column width={option.space_after==0?1:option.space_after}></Grid.Column>}
        </React.Fragment>
      );
  }
}

