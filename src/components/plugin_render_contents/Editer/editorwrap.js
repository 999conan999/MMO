import React, { Component   } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Form from 'react-bootstrap/Form';
import './editorwrap.css';
// import Media_img from './Add_media'
const icon_media=<svg  fill={'#2185d0'} width={'25px'} height={'25px'} style={{marginRight:'3px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M618.9 160.8l-208 69.33C404.4 232.3 400 238.5 400 245.3v172.4C394.9 416.7 389.6 416 384 416c-35.35 0-64 21.49-64 48s28.65 48 64 48c35.35 0 64-21.49 64-48V319l144-48v82.7C586.9 352.7 581.6 352 576 352c-35.35 0-64 21.49-64 48s28.65 48 64 48c35.35 0 64-21.49 64-48V176C640 165.1 629.3 157.4 618.9 160.8zM176 392c-8.836 0-16-7.164-16-16V96H40.2C17.1 96 0 113.1 0 136.2v271.7C0 430.1 17.93 448 40.13 448h249.8c5.904-25.11 25.54-45.43 52.31-56H176zM104 384c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8v-32c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V384zM104 288c0 4.418-3.582 8-8 8H64C59.58 296 56 292.4 56 288V256c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V288zM104 192c0 4.418-3.582 8-8 8H64C59.58 200 56 196.4 56 192V160c0-4.418 3.582-8 8-8h32c4.418 0 8 3.582 8 8V192zM235.6 320H368V255.1L301.3 256C296.3 256 291.7 253.2 289.4 248.7c-2.275-4.473-1.846-9.844 1.111-13.9l58.33-80c2.514-3.445 6.518-5.479 10.78-5.479s8.261 2.033 10.77 5.479l18.63 25.55l52.29-78.42C443.8 98.23 447.1 96 452.4 96c4.457 0 8.621 2.227 11.09 5.938l41.98 62.97L608 130.8V44.67C608 19.1 588.5 0 564.4 0H235.6C211.5 0 192 19.1 192 44.67v230.7C192 300 211.5 320 235.6 320zM288 64c17.68 0 32 14.33 32 32S305.7 128 288 128C270.3 128 256 113.7 256 96S270.3 64 288 64z"/></svg>
//  Thư viện này có các thông tin sau:
//  Đầu vào :biến triger là trigger để nhận dữ liệu, is_open=> thể hiện trạng thái muốn mở hay đóng và
// type_editer=>loại cấu hình viết content và cuối cùng là data cũ của trường edit đó và des : mô tả cho biến cần nhập
// Đầu ra :  kết quả sẽ có 2 loại : 1 là content hoặc 2 là OBJ về hình ảnh {img:'url hình ảnh', id:0,title:'tiêu đề hình ảnh'}
// ngoài ra, đầu ra còn có thêm 1 functon đóng cửa sổ.
// this.state = {
//   triger_editer:0,
//   data_in:{
//     is_open:false,
//     type_editer:'',
//     des:''
//   },
//   content:''
// }
{/* <button onClick={()=>{
  this.setState({
    triger_editer:triger_editer+1,
    data_in:{
      is_open:true,
      type_editer:'html',
      des:'Mô tả văn bản'}})
}}>html</button>
<button onClick={()=>{
  this.setState({
    triger_editer:triger_editer+1,
    data_in:{
      is_open:true,
      type_editer:'textarea',
      des:'Mô tả ngắn cho bài viết'}})
}}>textarea</button>
<button onClick={()=>{
  this.setState({
    triger_editer:triger_editer+1,
    data_in:{
      is_open:true,
      type_editer:'input',
      des:'Tiêu đề văn bản'}})
}}>input</button>
<button onClick={()=>{
  this.setState({
    triger_editer:triger_editer+1,
    data_in:{
      is_open:false,
      type_editer:'media',
      des:''}})
}}>media</button> */}
  class EditorWrap extends Component {
    constructor (props) {
        super(props)
        // this.myRef1 = React.createRef();
        // this.myRef2 = React.createRef();
        // this.myRef3 = React.createRef();
        // this.myRef4 = React.createRef();
        this.state = {
          content:'',
          type_editer:'',// html, textarea, input, media, number
          is_open:false,
          is_open_media:false,
          name:''
        }

    }
    async componentWillReceiveProps(nextProps){
      if(nextProps.triger!==this.props.triger){

        if(nextProps.data_in.type_editer==="html"){
          this.setState({
            content:nextProps.content
          })
          // setTimeout(()=>{
          //   this.myRef1.current.focus();
          // },1100)
        }
        else if(nextProps.data_in.type_editer==="textarea"){
          this.setState({
            content:nextProps.content
          })
          // setTimeout(()=>{
          //   this.myRef2.current.focus();
          // },1000)
        }
        else if(nextProps.data_in.type_editer==="input"){
          this.setState({
            content:nextProps.content
          })
          // setTimeout(()=>{
          //   this.myRef3.current.focus();
          // },1000)
        }
        else if(nextProps.data_in.type_editer==="number"){
          this.setState({
            content:Number(nextProps.content)
          })
          // setTimeout(()=>{
          //   this.myRef4.current.focus();
          // },1000)
        }

      }
    }
    // testHA=()=>{
    // window.tinymce.execCommand('mceInsertContent', false ,'<figure className="image"> <img  alt="abinhnew" title="anbinhnew" src="https://anbinhnew.com/wp-content/uploads/2021/01/Ban-hoc-doi-bang-nhua-cho-be-trai-va-gai-1-300x300.jpg""><figcaption>Caption</figcaption> </figure>');
    // }

    // 
    render() {
        let {content,is_open_media}=this.state;
        let {data_in}=this.props;
        let type_editer=data_in.type_editer
        let is_open=data_in.is_open
        let des=data_in.des
        if(type_editer==="media"){
          is_open_media=true
        }
        return (
          <>

          {(type_editer==="media"?false:is_open)&&<div>

              <div className='wrap-editer' style={this.props.width_50===true?{width:"50%"}:{}}>
                <h3>{des}:</h3>
                <div>
                    {type_editer==='html'&&<div>
                      {/* <div className='add-img'>
                        <div className='zdas'>
                          <button className='btn-addMe'
                            onClick={()=>this.setState({is_open_media:true})}
                          >
                            {icon_media}Add media
                          </button>
                        </div>
                      </div> */}
                      <Editor
                        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                        // onInit={(evt, editor) => this.myRef1.current = editor}
                        onEditorChange={(evt) => this.setState({content:evt})}
                        value={content}
                        init={{
                          height: 533,
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
                          remove_linebreaks : true
            
                        }}

                      />
                    </div>}
                    {type_editer==='textarea'&&<div>
                        <Form.Control as="textarea" rows={8} 
                          value={content}
                          onChange={(e)=>this.setState({content:e.target.value})}
                          placeholder="Nhập thông tin ở đây"
                          ref={this.myRef2}
                        />
                    </div>}
                    {type_editer==='input'&&<div>
                        <Form.Control size="lg"
                          value={content}
                          onChange={(e)=>this.setState({content:e.target.value})}
                          placeholder="Nhập thông tin ở đây"
                          ref={this.myRef3}
                        />
                    </div>}
                    {type_editer==='number'&&<div>
                        <Form.Control size="lg"
                          value={content}
                          onChange={(e)=>this.setState({content:e.target.value})}
                          placeholder="Nhập số ở đây"
                          ref={this.myRef4}
                          type="number"
                        />
                    </div>}
                </div>
                <div className='buttonz-editer'>
                  <button type="button" className="btn btn-success"
                    onClick={()=>{
                      this.props.fsReturn_editer(this.state.content)
                      this.props.fs_close()
                    }}
                  >Lưu</button>
                  <button type="button" className="btn btn-danger" onClick={()=>{
                    this.props.fs_close()
                  }}>Hủy</button>
                </div>
                </div>
          </div>}
          {/* <Media_img 
            is_open_media={type_editer==='media'?true:is_open_media}
            handleClose={()=>{
              this.setState({is_open_media:false})
              if(type_editer==='media') this.props.fs_close();
            }}
            fsReturn_media={(media)=>{
                if(type_editer==='media'){
                  this.props.fsReturn_editer(media)
                  this.props.fs_close()
                }else{
                  if(media.img!=''){
                    window.tinymce.execCommand('mceInsertContent', false ,'<figure className="image"> <img  alt="'+media.title+'" title="'+media.title+'" src="'+media.img+'""><figcaption>'+media.title+'</figcaption> </figure>');
                  }

                }
            }}
          /> */}

          </>
        )
    }

}
export default EditorWrap;

