import React, { Component } from 'react';
import './editer.css';
import { connect } from 'react-redux';
import {makeid} from '../fs.js'
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import {Segment} from 'semantic-ui-react';

const icon_media=<svg  fill={'#2185d0'} width={'25px'} height={'25px'} style={{marginRight:'75px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M618.9 160.8l-208 69.33C404.4 232.3 400 238.5 400 245.3v172.4C394.9 416.7 389.6 416 384 416c-35.35 0-64 21.49-64 48s28.65 48 64 48c35.35 0 64-21.49 64-48V319l144-48v82.7C586.9 352.7 581.6 352 576 352c-35.35 0-64 21.49-64 48s28.65 48 64 48c35.35 0 64-21.49 64-48V176C640 165.1 629.3 157.4 618.9 160.8zM176 392c-8.836 0-16-7.164-16-16V96H40.2C17.1 96 0 113.1 0 136.2v271.7C0 430.1 17.93 448 40.13 448h249.8c5.904-25.11 25.54-45.43 52.31-56H176zM104 384c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8v-32c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V384zM104 288c0 4.418-3.582 8-8 8H64C59.58 296 56 292.4 56 288V256c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V288zM104 192c0 4.418-3.582 8-8 8H64C59.58 200 56 196.4 56 192V160c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V192zM235.6 320H368V255.1L301.3 256C296.3 256 291.7 253.2 289.4 248.7c-2.275-4.473-1.846-9.844 1.111-13.9l58.33-80c2.514-3.445 6.518-5.479 10.78-5.479s8.261 2.033 10.77 5.479l18.63 25.55l52.29-78.42C443.8 98.23 447.1 96 452.4 96c4.457 0 8.621 2.227 11.09 5.938l41.98 62.97L608 130.8V44.67C608 19.1 588.5 0 564.4 0H235.6C211.5 0 192 19.1 192 44.67v230.7C192 300 211.5 320 235.6 320zM288 64c17.68 0 32 14.33 32 32S305.7 128 288 128C270.3 128 256 113.7 256 96S270.3 64 288 64z"/></svg>
class Editer extends Component {
  constructor (props) {
    super(props)
    // this.myRef1 = React.createRef();
    this.state = {
        data:'',
        selected_img:{
            type:'',//img_editer
        },
        loading:true
    }
  }
  componentDidMount(){
    // setTimeout(()=>{
    //     window.tinymce.execCommand('mceSetContent', false ,this.props.data);
    //     this.setState({loading:false})
    // },1000)
    this.setState({
        data:this.props.data
    })
  }
  componentWillReceiveProps(nextProps){
        if(nextProps.img_result.length>0 && this.state.selected_img.type==nextProps.keyLock){
            this.setState({
                selected_img:{
                    type:'',//img_editer
                },
            });
            if(nextProps.img_text_result!=""){
                window.tinymce.execCommand('mceInsertContent', false ,'<figure className="image"> <img  alt="'+nextProps.img_text_result+'" title="'+nextProps.img_text_result+'" src="'+nextProps.img_result[0].url+'""><figcaption>'+nextProps.img_text_result+'</figcaption> </figure><p></p>')
            }else{
                window.tinymce.execCommand('mceInsertContent', false ,'<img src="'+nextProps.img_result[0].url+'""><p></p>') 
            }
            this.props.closeAction();
        }
  }
 
  render() {
    let {data,loading}=this.state;
      return (
        <React.Fragment>
            <div>
                <div className='wrap-editer'>
                    {/* <h3>XXX:</h3> */}
                    <div className='eidex' style={{margin:"0px 200px"}}>
                        <Segment loading={loading}>
                            <div>
                                <div className='add-img'>
                                <div className='zdas'>
                                    <button className='btn-addMe'
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
                                                keyLock:keyLock,
                                                show_description_img:true
                                            })
                                        }}
                                    >
                                    {icon_media}<span>Add media</span>
                                    </button>
                                </div>
                                </div>
                                <Editor
                                tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                // onInit={(evt, editor) => this.myRef1.current = editor}
                                onEditorChange={(evt) => this.setState({data:evt})}
                                value={data}
                                init={{
                                    height: 650,
                                    menubar: true,
                                    relative_urls: false,
                                    remove_script_host: false,
                                    plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                    ],
                                    toolbar: 
                                    'blockquote | blocks |'+'fontsize bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify'+'| unlink | link |' +
                                    '| bullist numlist ' +
                                    'removeformat |'+' code | image| fontsizeselect | insertfile'+'| table |',
                                    toolbar_mode: 'wrap',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    entity_encoding : "raw",
                                    image_dimensions: false,

                                }}
                                onLoadContent={() =>{
                                    setTimeout(()=>{
                                        window.tinymce.execCommand('mceSetContent', false ,this.props.data);
                                        this.setState({loading:false})
                                    },300)
                                }}
                                />
                            </div>
                        </Segment>    
                    </div>
                    <div className='buttonz-editer'>
                        <button className="ui positive button ABZ bobo"
                            onClick={()=>{
                                 toast.success('Cập nhật thành công!', { theme: "colored" });
                                 let {data}=this.state;
                                data=data.replace(new RegExp('"', 'g'), "'")
                                 this.props.rs_data(data)
                            }}
                        >Lưu</button>
                        <button className="ui negative button ABZ bobo"
                            onClick={()=>this.props.close()}
                        >Hủy</button>
                    </div>
                </div>
            </div>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Editer);
  