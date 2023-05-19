import React, { Component } from 'react';
import {Card,Grid,Checkbox,Segment } from 'semantic-ui-react'
export default class Check_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    let {option,value}=this.props;
    console.log("🚀 ~ file: index.js:10 ~ Check_input ~ render ~ value:", value)
    let bg_color={};
    if(option.bg_color!=undefined) bg_color.backgroundColor=option.bg_color;
      return (
        <React.Fragment>
          {option.space_before!=undefined&&option.space_before!=0&&<Grid.Column width={option.space_before==0?1:option.space_before}></Grid.Column>}
          <Grid.Column width={option.size==undefined?12:option.size}>
            <Card className='wrap-item-input' style={bg_color}>
              <Card.Content>
                <Card.Header>{option.name}</Card.Header>
              </Card.Content>
              <Card.Content extra >
                <Segment className='clorg'>
                  <Checkbox toggle label={{ children: option.des }}
                    checked={value}
                    onClick={()=>this.props.fs_result(!value)}
                  />
                </Segment>
              </Card.Content>
            </Card>
          </Grid.Column>
          {option.space_after!=undefined&&option.space_after!=0&&<Grid.Column width={option.space_after==0?1:option.space_after}></Grid.Column>}
        </React.Fragment>
      );
  }
}

