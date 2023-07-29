import React, { Component } from 'react';
import './editer.css';
import { connect } from 'react-redux';
import {makeid} from '../fs.js'
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import {Segment,Button,Grid, Form, TextArea,Label,Icon } from 'semantic-ui-react';

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
        loading:true,
        step:0,
        is_show_GPT_by_btn:false,
        data_bot:{
            is_key_edit:true,
            is_h2_edit:true,
            h2_selected_text:"",
            key_selected_iddex:-1,
            //
            key_AI:"",
            h2_AI:"",
            //
            key_des:"",
            key_list_related:[],
            h2_list_related:[],

        },
        is_mini_edit:false
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
                window.tinymce.execCommand('mceInsertContent', false ,"<figure class='image'> <img class='lazyload'  alt='"+nextProps.img_text_result+"' title='"+nextProps.img_text_result+"' src='"+nextProps.img_result[0].url300+"' data-srcset='"+nextProps.img_result[0].url+"' ><figcaption>"+nextProps.img_text_result+"</figcaption> </figure><p></p>")
            }else{
                window.tinymce.execCommand('mceInsertContent', false ,"<img class='lazyload' src='"+nextProps.img_result[0].url300+"' data-srcset='"+nextProps.img_result[0].url+"'><p></p>") 
            }
            this.props.closeAction();
        }
  }
 
  render() {
    let {data,loading,step,is_show_GPT_by_btn,data_bot,is_mini_edit}=this.state;
    let is_show_GPT_prompt_by_dk=false;
    let data_prompt=this.props.data_prompt_GPT;
    // console.log("🚀 ~ file: Editer.js:53 ~ Editer ~ render ~ data_prompt:", data_prompt)
    if(this.props.data_prompt_GPT!=undefined&&this.props.data_prompt_GPT!=null){
        is_show_GPT_prompt_by_dk=true;
    }
    // 
    // let is_show_buoc_1=false;
    // if(data_bot.mt_sp!=''&&data_bot.key_des!=''&&data_bot.dt_kh!=''){
    //     is_show_buoc_1=true;
    // }
    // 
      return (
        <React.Fragment>
            <div>
                <div className='wrap-editer re' style={is_mini_edit?{top:"25vh"}:{}}>
                    <div>
                        {is_mini_edit&&<Icon name='expand' size="big" className='cs hv hhuahua' onClick={()=>{this.setState({is_mini_edit:false})}}/>}
                        {!is_mini_edit&&<Icon name='compress' size="big" className='cs hv hhuahua' onClick={()=>{this.setState({is_mini_edit:true})}}/>}
                    </div> 
                    <div className='eidex' style={{margin:"0px 200px"}}>

                            <Grid>
                                <Grid.Column width={is_show_GPT_by_btn?10:16}>
                                    <Segment loading={loading}>
                                        <div className='add-img'>
                                        <div className='zdas' style={is_mini_edit?{top:"31vh"}:{}}>
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
                                            height: 600,
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
                                    </Segment>    
                                </Grid.Column>
                                {is_show_GPT_by_btn&&<Grid.Column width={6}>
                                    <Segment>
                                    <div className='wra-gpt'>

                                        {data_bot.key_list_related.length>0&&<Segment style={{background:"#dddddd"}} className='re'>
                                            {!data_bot.is_h2_edit&&<Button  icon='edit' style={{right:"0px",top:"0px",position:"absolute"}}
                                                onClick={()=>{
                                                    let {data_bot}=this.state;
                                                    data_bot.is_h2_edit=true;
                                                    this.setState({data_bot:data_bot})
                                                }}
                                            />}
                                            {data_bot.is_h2_edit&&<Button color='green' icon='check' style={{right:"0px",top:"0px",position:"absolute"}} 
                                                onClick={()=>{
                                                    let {data_bot}=this.state;
                                                    if(data_bot.h2_AI!=""){
                                                        data_bot.is_h2_edit=false;
                                                        data_bot.h2_list_related=this.extractKeywordsFromText(data_bot.h2_AI)
                                                        this.setState({data_bot:data_bot})
                                                    }else{
                                                        toast.info('Chưa có câu trả lời của AI', { theme: "colored" });
                                                    }
                                                }}
                                            />}
                                            {data_bot.is_h2_edit&&<div>
                                                <span>Bước 2:Thực hiện tạo ra CHỦ ĐỀ liên quan:</span><br/>
                                                <Button color='brown' content='Prompt tạo h2 Chủ đề' icon={'check'} labelPosition='right' className='mgt-gpt' 
                                                    onClick={()=>{
                                                        let y=data_bot.key_des!=""?`từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".`:"";
                                                        let data_rs_text=this.fs_return_infor(data_prompt);
                                                        //
                                                        let text_list_key_related=', và các từ khóa liên quan đến nội dung như là :';
                                                        data_bot.key_list_related.forEach(e => {
                                                            text_list_key_related+=e+', ';
                                                        });
                                                        //
                                                        data_rs_text+=`Nội dung của sản phẩm xoay quanh từ khóa "${data_prompt.key_word}", mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. ${y} ${text_list_key_related}.
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, hãy liệt kê "8 Chủ đề" cần thiết để bổ sung thông tin cho bài viết này. Lưu ý: mỗi chủ đề phải để trong dấu ngoặc kép '""'`;
 
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                    }}
                                                />
                                                <div>
                                                    <span>Điền câu trả lời của AI về CHỦ ĐỀ liên quan vào đây:</span><br/>
                                                    <Form>
                                                        <TextArea placeholder='...' 
                                                            value={data_bot.h2_AI}
                                                            onChange={(e,{value})=>{
                                                                let {data_bot}=this.state;
                                                                data_bot.h2_AI=value;
                                                                this.setState({data_bot:data_bot})
                                                            }}
                                                        />
                                                    </Form>
                                                </div>
                                            </div>}
                                            {!data_bot.is_h2_edit&&<div>
                                                <div style={{marginBottom:"8px"}}>Chủ đề: <b style={{color:"blue"}}> ({data_bot.h2_list_related.length})</b></div>
                                                {
                                                    data_bot.h2_list_related.map((e,i)=>{
                                                        let is_checked=data_bot.h2_selected_text.search(","+i+",")==-1?false:true;
                                                        return <div  key={i} style={{marginBottom:"5px"}}><Label color={is_checked?"grey":"blue"}  as="a" horizontal className='cs' size={"large"}
                                                        onClick={()=>{
                                                            let y=data_bot.key_des!=""?`từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".`:"";
                                                            let data_rs_text=this.fs_return_infor(data_prompt);
                                                            //
                                                            let text_list_key_related='Các từ khóa như là :';
                                                            data_bot.key_list_related.forEach(e => {
                                                                text_list_key_related+=e+', ';
                                                            });
                                                            //
                                                            data_rs_text+=`Nội dung bài viết của sản phẩm đề cập đến ${text_list_key_related}, mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. ${y}
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, hãy viết bài viết chuẩn SEO về chủ đề "${e}". Lưu ý đưa ra dẫn chứng số liệu và ví dụ minh họa cụ thể dựa trên kết quả từ google, mỗi nội dung nói về một chủ đề nhỏ cần tối thiểu 400 từ và Cố gắng sử dụng các từ viết tắt, thành ngữ, cụm từ chuyển tiếp, thán từ, từ bổ nghĩa và từ thông tục, đồng thời tránh các cụm từ lặp lại và cấu trúc câu không tự nhiên, in đậm các từ cần nhấn mạnh. kết quả trả về là các thẻ html tương ứng (chuẩn SEO), không gồm <html>, <head>, <body>, <div>, <h1>. (nội dung tối thiểu 800 từ)`;
     
                                                        toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                        navigator.clipboard.writeText(data_rs_text);
                                                            if(!is_checked){
                                                                let {data_bot}=this.state;
                                                                data_bot.h2_selected_text+=","+i+",";
                                                                this.setState({data_bot:data_bot})
                                                            }
                                                        
                                                        }}
                                                        >
                                                                    {e}
                                                                    <Icon name='delete'
                                                                        onClick={()=>{
                                                                            if(window.confirm(`Xác nhận xóa : ${e}`)){
                                                                                let {data_bot}=this.state;
                                                                                data_bot.h2_list_related.splice(i,1);
                                                                                this.setState({data_bot:data_bot})
                                                                            }
                                                                        }}
                                                                    />
                                                                </Label></div>
                                                    })
                                                }
                                                 
                                            </div>}
                                        </Segment>}
                                        {data_bot.key_des!=""&&<Segment  className='re keyxa'  style={is_mini_edit?{top:"28vh"}:{}}>
                                            {!data_bot.is_key_edit&&<Button  icon='edit' style={{right:"0px",top:"0px",position:"absolute"}}
                                                onClick={()=>{
                                                    let {data_bot}=this.state;
                                                    data_bot.is_key_edit=true;
                                                    this.setState({data_bot:data_bot})
                                                }}
                                            />}
                                            {data_bot.is_key_edit&&<Button color='green' icon='check' style={{right:"0px",top:"0px",position:"absolute"}} 
                                                onClick={()=>{
                                                    let {data_bot}=this.state;
                                                    if(data_bot.key_AI!=""){
                                                        data_bot.is_key_edit=false;
                                                        data_bot.key_list_related=this.extractKeywordsFromText(data_bot.key_AI)
                                                        this.setState({data_bot:data_bot})
                                                    }else{
                                                        toast.info('Chưa có câu trả lời của AI', { theme: "colored" });
                                                    }
                                                }}
                                            />}
                                            {data_bot.is_key_edit&&<div>
                                                <span>Bước 1:Thực hiện tạo ra TỪ KHÓA liên quan:</span><br/>
                                                <Button color='brown' content='Prompt tạo Từ khóa' icon={'check'} labelPosition='right' className='mgt-gpt' 
                                                    onClick={()=>{
                                                        let y=data_bot.key_des!=""?`từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".`:"";
                                                        let data_rs_text=this.fs_return_infor(data_prompt);
                                                        data_rs_text+=`Nội dung của sản phẩm xoay quanh từ khóa "${data_prompt.key_word}", mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. ${y}
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, hãy liệt kê 15 từ khóa liên quan đến sản phẩm này. Lưu ý: Từ khóa phải để trong dấu ngoặc kép '""'`;
 
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                    }}
                                                />
                                                <div>
                                                    <span>Điền câu trả lời của AI về TỪ KHÓA liên quan vào đây:</span><br/>
                                                    <Form>
                                                        <TextArea placeholder='...' 
                                                            value={data_bot.key_AI}
                                                            onChange={(e,{value})=>{
                                                                let {data_bot}=this.state;
                                                                data_bot.key_AI=value;
                                                                this.setState({data_bot:data_bot})
                                                            }}
                                                        />
                                                    </Form>
                                                </div>
                                            </div>}
                                            {!data_bot.is_key_edit&&<div>
                                                <div style={{marginBottom:"8px"}}>Từ khóa liên quan:"{data_prompt.key_word}" <b style={{color:"blue"}}> ({data_bot.key_list_related.length})</b></div>
                                                {
                                                    data_bot.key_list_related.map((e,i)=>{
                                                        return <Label color={data_bot.key_selected_iddex==i?"grey":""}  as="a" basic className='cs' key={i}
                                                            onClick={()=>{
                                                                toast.success(e, { theme: "colored" });
                                                                navigator.clipboard.writeText(e);
                                                                let {data_bot}=this.state;
                                                                data_bot.key_selected_iddex=i;
                                                                this.setState({data_bot:data_bot})
                                                            }}
                                                        >
                                                                    {e}
                                                                    <Icon name='delete'
                                                                        onClick={()=>{
                                                                            if(window.confirm(`Xác nhận xóa : ${e}`)){
                                                                                let {data_bot}=this.state;
                                                                                data_bot.key_list_related.splice(i,1);
                                                                                this.setState({data_bot:data_bot})
                                                                            }
                                                                        }}
                                                                    />
                                                                </Label>
                                                    })
                                                }
                                                 
                                            </div>}
                                        </Segment>}
                                        <Segment style={{background:"#dddddd",position:"fixed",bottom:"28vh",width:"218px",right:"0px"}}>
                                            <span>Ý nghĩa của từ khóa chính: "{data_prompt.key_word}" là:</span><br/>
                                            <Form>
                                                <TextArea placeholder='Mô tả hình dáng, đặc điểm nổi bật, chức năng nổi bật...' 
                                                    value={data_bot.key_des}
                                                    onChange={(e,{value})=>{
                                                        let {data_bot}=this.state;
                                                        data_bot.key_des=value;
                                                        this.setState({data_bot:data_bot})
                                                    }}
                                                    rows={8}
                                                />
                                            </Form>
                                        </Segment>
                                        {data_bot.key_list_related.length>0&&<Segment className='editvka'>

                                            <div>
                                                <Button color='gray' content='Prompt tạo tiêu đề' icon={'check'} labelPosition='right' className='mgt-gpt' 
                                                    onClick={()=>{
                                                        let y=data_bot.key_des!=""?`từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".`:"";
                                                        let data_rs_text=this.fs_return_infor(data_prompt);
                                                        data_rs_text+=`Nội dung của sản phẩm xoay quanh từ khóa "${data_prompt.key_word}", mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. ${y}.
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, hãy liệt kê "5 tiêu đề sản phẩm" dành cho bài viết này. Lưu ý: mỗi tiêu đề phải chứa từ khóa "${data_prompt.key_word}".`;
 
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Button color='gray' content='Prompt tạo Mô tả' icon={'check'} labelPosition='right' className='mgt-gpt' 
                                                    onClick={()=>{
                                                        let y=data_bot.key_des!=""?`từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".`:"";
                                                        let data_rs_text=this.fs_return_infor(data_prompt);
                                                        data_rs_text+=`Nội dung của sản phẩm xoay quanh từ khóa "${data_prompt.key_word}", mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. ${y}.
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, Hãy viết 2 mô tả ngắn 200 từ giới thiệu về sản phẩm. Lưu ý: mỗi mô tả phải chứa từ khóa "${data_prompt.key_word}".`;
 
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Button color='gray' content='Tạo hình ảnh' icon={'check'} labelPosition='right' className='mgt-gpt' 
                                                    onClick={()=>{
                                                        let {data_bot}=this.state;
                                                        let list_key=data_bot.key_list_related;
                                                        let img_list=data_prompt.imgs_list;
                                                        let text='';
                                                        for(let i=0;i<img_list.length;i++){
                                                            let is_mp4=img_list[i].url.search(".mp4")==-1?false:true;
                                                            if(!is_mp4){
                                                                if(list_key[i]){
                                                                    text+="<figure class='image'> <img class='lazyload'  alt='"+list_key[i]+"' title='"+list_key[i]+"' src='"+img_list[i].url300+"' data-srcset='"+img_list[i].url+"' ><figcaption>"+list_key[i]+"</figcaption> </figure>";
                                                                }else{
                                                                    break;
                                                                }
                                                            }
                                                        };
                                                        if(text!=""){
                                                            text+='<p></p>';
                                                            window.tinymce.execCommand('mceInsertContent', false ,text)
                                                        } 

                                                    }}
                                                />
                                            </div>
                                        </Segment>}

                                    </div>
                                    </Segment>  
                                </Grid.Column>}
                            </Grid>
                    </div>
                    {!is_show_GPT_by_btn&&<div className='buttonz-editer'>
                        <button className="ui positive button ABZ bobo"
                            onClick={()=>{
                                 let {data}=this.state;
                                data=data.replace(new RegExp('"', 'g'), "'")
                                 this.props.rs_data(data)
                            }}
                        >Lưu</button>
                        <button className="ui negative button ABZ bobo"
                            onClick={()=>this.props.close()}
                        >Hủy</button>
                    </div>}
                </div>
            </div>
            {is_show_GPT_prompt_by_dk&&<div className='gpt-wrap' style={is_mini_edit?{top:"28vh"}:{}}>
                <b>Prompt chat GPT</b>
                <div className='re'>
                    <Button content={is_show_GPT_by_btn?"Ẩn":"Hiện"} icon={is_show_GPT_by_btn>0?'eye':'eye slash'} labelPosition='right' className='mgt-gpt' 
                        onClick={()=>this.setState({is_show_GPT_by_btn:!is_show_GPT_by_btn})}
                    />
                </div>
            </div>}
        </React.Fragment>
      );
  }
   extractKeywordsFromText=(text) =>{
  // Chuyển đoạn văn bản và từ khóa thành chữ thường
  const lowercaseText = text.toLowerCase();

  // Sử dụng biểu thức chính quy để tách các từ trong dấu nháy kép
  const regex = /"([^"]*)"/g;
  const matchedKeywords = [];

  let match;
  while ((match = regex.exec(lowercaseText)) !== null) {
    matchedKeywords.push(match[1]);
  }

  // Sử dụng Set để loại bỏ các từ trùng lặp
  const uniqueKeywordsSet = new Set(matchedKeywords);

  // Chuyển Set về mảng và trả về kết quả
  return [...uniqueKeywordsSet];
  }
  fs_return_infor=(data_prompt)=>{
    let infor=`Tôi có sản phẩm với các thông tin như sau:
- Sản phẩm có các lựa chọn như sau:
`;
    data_prompt.table_price.forEach(e => {
        infor+=`+ "${data_prompt.attribute_name} ${e.name}" có giá là "${(Number(e.price_v)+Number(e.price_profit)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})}",
`;
    });
    infor+=`- Các thông tin liên quan về sản phẩm như sau:
`;
    data_prompt.table_infor.forEach(e => {
        infor+=`+ ${e.name} : ${e.value},
`;
    });
    return infor
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
  