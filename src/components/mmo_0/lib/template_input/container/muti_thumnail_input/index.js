import React, { Component } from 'react';
import {Card,Grid,Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { makeid } from '../../../fs';
 class Muti_thuamnail_input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.img_result.length>0 && this.state.selected_img.type==nextProps.keyLock){
        this.setState({
            selected_img:{
                type:'',//img_editer
            },
        });
        alert("OK thanh cong: "+nextProps.img_result.length)
        this.props.closeAction();
    }
  }
  
  render() {
      return (
        <React.Fragment>

          <Grid.Column width={4}>
            <Card className='wrap-item-input'>
              <Card.Content>
                <button className='buzz' style={{float:"right"}}
                  onClick={()=>{
                      let keyLock=makeid(6);
                      this.setState({
                          selected_img:{
                              type:keyLock,
                          }
                      });
                      this.props.openAction({
                          type:"OPEN",
                          is_muti_selected:true,
                          keyLock:keyLock
                      })
                  }}
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


export default connect(mapStateToProps, mapDispatchToProps)(Muti_thuamnail_input);