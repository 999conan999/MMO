import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeid } from '../../lib/fs';
 class Img_img extends Component {
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
    this.props.fs_result(nextProps.img_result)
      this.setState({
          selected_img:{
              type:'',//img_editer
          },
      });      
      this.props.closeAction();
  }
}


  render() {
      let { is_muti, }=this.props;
      return (
        <React.Fragment>
              <button className='buzz re'
                  onClick={()=>{
                    let keyLock=makeid(6);
                    this.setState({
                        selected_img:{
                            type:keyLock,
                        }
                    });
                    this.props.openAction({
                        type:"OPEN",
                        is_muti_selected:is_muti==undefined?false:is_muti,
                        keyLock:keyLock
                    })
                }}
                >
                  <i className="fa-solid fa-photo-film"></i> <span>Add Media</span>
                </button>
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


export default connect(mapStateToProps, mapDispatchToProps)(Img_img);
