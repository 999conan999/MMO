import React, { Component } from 'react';
import {Card,Grid,Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { makeid } from '../../../fs';
 class Thumnail_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected_img:{
        type:'',
      },
    }
  }

componentWillReceiveProps(nextProps){
  if(nextProps.img_result.length>0 && this.state.selected_img.type==nextProps.keyLock){
      this.setState({
          selected_img:{
              type:'',//img_editer
          },
      });
      alert("OK thanh cong: "+nextProps.img_result[0].url)
      this.props.closeAction();
  }
}


  render() {
      return (
        <React.Fragment>
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
                      onClick={()=>{
                        let keyLock=makeid(6);
                        this.setState({
                            selected_img:{
                                type:keyLock,
                            }
                        });
                        this.props.openAction({
                            type:"OPEN",
                            is_muti_selected:false,
                            keyLock:keyLock
                        })
                    }}
                  >
                    <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                  </button>
                </Card.Content>
              </Card>

          </Grid.Column>
        </React.Fragment>
      );
  }
}

// 
const mapStateToProps = (state) => ({
  img_result: state.img_result,
  img_text_result: state.img_text_result,
  keyLock:state.keyLock
});

const mapDispatchToProps = (dispatch,props) => ({
  openAction: (data) => dispatch(data),
  closeAction: (type) => dispatch({type:'CLOSE'}),
});


export default connect(mapStateToProps, mapDispatchToProps)(Thumnail_input);
