import React, { Component } from 'react';
import './editer.css';
import { connect } from 'react-redux';
import {makeid} from '../fs.js'
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-toastify';
import {Segment,Button,Grid, Form, TextArea } from 'semantic-ui-react';

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
            mt_sp:'',
            key_des:'',
            dt_kh:'',
            cot_truyen:''
        }
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
    let {data,loading,step,is_show_GPT_by_btn,data_bot}=this.state;
    let is_show_GPT_prompt_by_dk=false;
    let data_prompt=this.props.data_prompt_GPT;
    console.log("🚀 ~ file: Editer.js:53 ~ Editer ~ render ~ data_prompt:", data_prompt)
    if(this.props.data_prompt_GPT!=undefined&&this.props.data_prompt_GPT!=null){
        is_show_GPT_prompt_by_dk=true;
    }
    let is_show_buoc_1=false;
    if(data_bot.mt_sp!=''&&data_bot.key_des!=''&&data_bot.dt_kh!=''){
        is_show_buoc_1=true;
    }
      return (
        <React.Fragment>
            <div>
                <div className='wrap-editer'  style={(step==2||step==3)?{top:"25vh"}:{}}>
                    {/* <h3>XXX:</h3> */}
                    <div className='eidex' style={{margin:"0px 200px"}}>
                            <Grid>
                                <Grid.Column width={is_show_GPT_by_btn?10:16}>
                                    <Segment loading={loading}>
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
                                    </Segment>    
                                </Grid.Column>
                                {is_show_GPT_by_btn&&<Grid.Column width={6}>
                                    <Segment>
                                    <div className='wra-gpt'>
                                        {step>5&&<div>
                                            <span>Bước 7:Kinh nghiệm khi mua "{data_prompt.key_word}":</span><br/>
                                            {data_bot.cot_truyen!=""&&<Button content='Get data' icon={step>6?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    let {data}=this.state;
                                                    if(step==6){
                                                        data+=`<h2>Kinh nghiệm khi mua ${data_prompt.key_word}</h2>`;
                                                        this.setState({step:7,data:data});
                                                    }
                                                    let data_rs_text=`OK, làm rất tốt. Tiếp đến, hãy đóng vai là một trong các đối tượng mua sản phẩm được nêu ở trên, kể về câu chuyện của chính mình, có bố cục rõ ràng, và có dàn ý như sau: "${data_bot.cot_truyen}". Lưu ý, câu chuyện này tập trung vô SEO "${data_prompt.key_word}", nên hãy phân bổ thêm các từ khóa liên quan đã phân tich ở trên vào câu chuyện, và hãy sáng tạo thêm những tình huống kịch tính cho câu chuyện trở nên lôi cuốn. Cố gắng sử dụng các từ viết tắt, thành ngữ, cụm từ chuyển tiếp, thán từ, từ bổ nghĩa và từ thông tục, đồng thời tránh các cụm từ lặp lại và cấu trúc câu không tự nhiên. kết quả trả về là các thẻ html tương ứng (chuẩn SEO), không gồm <html>, <head>, <body>, <div>. (nội dung tối thiểu 400 từ)`;
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />}
                                            <Form>
                                                <TextArea placeholder='người này tìm mua giường ngủ, phải đắng đo lựa chọn không biết chọn loại giường gỗ hay giường sắt, thông qua một người bạn chỉ dẫn, anh ta đã biết đến nội thất An Bình có bán giường sắt giá rẻ, anh ta liên hệ và được hỗ trợ rất tận tình, chế độ dịch vụ tốt, và từ đó anh ta rất hài lòng, và giới thiệu thêm bạn bè' 
                                                    value={data_bot.cot_truyen}
                                                    onChange={(e,{value})=>{
                                                        let {data_bot}=this.state;
                                                        data_bot.cot_truyen=value;
                                                        this.setState({data_bot:data_bot})
                                                    }}
                                                />
                                            </Form>
                                            
                                        </div>}
                                         {step>4&&<div>
                                            <span>Bước 6:Hình ảnh thực tế sản phẩm:</span><br/>
                                            <Button content='Get data' icon={step>5?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    let {data}=this.state;
                                                    if(step==5){
                                                        data+=`<h2>Hình ảnh thực tế sản phẩm</h2>`;
                                                        this.setState({step:6,data:data});
                                                    }
                                                }}
                                            />
                                        </div>}
                                         {step>3&&<div>
                                            <span>Bước 5:{data_prompt.key_word} thích hợp cho đối tượng nào:</span><br/>
                                            <Button content='Get data' icon={step>4?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    let {data}=this.state;
                                                    if(step==4){
                                                        data+=`<h2>${data_prompt.key_word} thích hợp cho đối tượng nào</h2>`;
                                                        this.setState({step:5,data:data});
                                                    }
                                                    let data_rs_text=`OK, làm tốt lắm. Tiếp theo, từ dữ liệu của google và thông tin sản phẩm ở trên, hãy liệt kê 8 đối tượng nên sử dụng "${data_prompt.key_word}", và giải thích vì sao, cho thêm ví dụ minh họa. Cố gắn sử dụng các từ khóa liên quan và từ khóa chính. Bài viết tối thiểu 300 từ, Cố gắng sử dụng các từ viết tắt, thành ngữ, cụm từ chuyển tiếp, thán từ, từ bổ nghĩa và từ thông tục, đồng thời tránh các cụm từ lặp lại và cấu trúc câu không tự nhiên. kết quả trả về là các thẻ html tương ứng (chuẩn SEO), không gồm <html>, <head>, <body>, <div>. (nội dung tối thiểu 400 từ)`;
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />
                                        </div>}
                                         {step>2&&<div>
                                            <span>Bước 4:Đặc điểm của "{data_prompt.key_word}":</span><br/>
                                            <Button content='Get data' icon={step>3?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    let {data}=this.state;
                                                    if(step==3){
                                                        data+=`<h2>Thông tin về ${data_prompt.key_word}</h2>`;
                                                        this.setState({step:4,data:data});
                                                    }
                                                    let data_rs_text=`OK, rất tốt. Tiếp theo, từ những thông tin sản phẩm nêu ở trên, hãy kết hợp với dữ liệu từ google với các nội dung liên quan, hãy phân tích chi tiết các thông tin sản phẩm đã đưa ra ở trên, nhằm mục đích cho người dùng hiểu rõ về sản phẩm hơn. Điều kiện đặt ra là nội dung xoay quanh các từ khóa liên quan. Cố gắng sử dụng các từ viết tắt, thành ngữ, cụm từ chuyển tiếp, thán từ, từ bổ nghĩa và từ thông tục, đồng thời tránh các cụm từ lặp lại và cấu trúc câu không tự nhiên. kết quả trả về là các thẻ html tương ứng (chuẩn SEO), không gồm <html>, <head>, <body>, <div>. (nội dung tối thiểu 400 từ)`;
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />
                                        </div>}
                                        {step>1&&<div>
                                            <span>Bước 3:Tạo Mô tả ngắn cho sản phẩm này:</span><br/>
                                            <Button content='Get data' icon={step>2?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    if(step==2){
                                                        this.setState({step:3});
                                                    }
                                                    let data_rs_text=`OK, rất tốt, tiếp đến hãy viết cho tôi 2 mẫu tóm tắt thông tin sản phẩm (tối đa 200 từ). Điều kiện là chứa từ khóa chính: "${data_prompt.key_word}", và các từ khoa liên quan, ngôn ngữ Lôi cuống, kích thích tò mò cho đôi tượng đã nêu ở trên.`;
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />
                                        </div>}
                                        {step>0&&<div>
                                            <span>Bước 2:Tạo tiêu đề cho sản phẩm này:</span><br/>
                                            <Button content='Get data' icon={step>1?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    if(step==1){
                                                        this.setState({step:2});
                                                    }
                                                    let data_rs_text=`OK, rất tốt, tiếp đến hãy viết cho tôi 10 mẫu tiêu đề giới thiệu sản phẩm. Điều kiện là  số kí tự phù hợp để hiển thị lên google, Lôi cuống, kích thích tò mò cho đôi tượng đã nêu ở trên, Lưu ý : tiêu đề phải chứa từ khóa chính: "${data_prompt.key_word}".`;
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />
                                        </div>}
                                    {is_show_buoc_1&&<div>
                                            <span>Bước 1:Thực hiện tạo data cho chat GPT:</span><br/>
                                            <Button content='Get data' icon={step>0?'check':'right arrow'} labelPosition='right' className='mgt-gpt' 
                                                onClick={()=>{
                                                    let prices=`- Sản phẩm có thuộc tính ${data_prompt.attribute_name} và giá tương ứng như sau:
`;
                                                    data_prompt.table_price.forEach(e => {
                                                        prices+=`+ ${data_prompt.attribute_name} ${e.name} có giá là ${(Number(e.price_v)+Number(e.price_profit)).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'})},
`;
                                                    });
                                                    let infors=`- Các thông tin liên quan của sản phẩm như sau:
`;
                                                    data_prompt.table_infor.forEach(e => {
                                                        infors+=`+ ${e.name} : ${e.value},
`;
});

                                                        let data_rs_text=`Tôi có sản phẩm với các thông tin như sau:
${prices} ${infors} - Mô tả thêm về sản phẩm: ${data_bot.mt_sp}.
+ Nội dung của sản phẩm xoay quanh từ khóa "${data_prompt.key_word}", mục đích là để tối ưu hóa SEO trên kết quả tìm kiếm của google. từ khóa "${data_prompt.key_word}" có nghĩa là : "${data_bot.key_des}".
+ Đối tượng khách hàng: ${data_bot.dt_kh}.
Bạn hãy trả lời "YES" nếu bạn đã hiểu các dữ liệu mà tôi đưa ra ở trên.
Từ những thông tin ở trên và dữ liệu tìm kiếm từ google, hãy liệt kê 15 từ khóa liên quan đến sản phẩm này.`
                                                    if(step==0){
                                                        this.setState({step:1});
                                                    }
                                                    toast.success('Copy thành công! bạn past vào chat GPT.', { theme: "colored" });
                                                    navigator.clipboard.writeText(data_rs_text);
                                                }}
                                            />
                                        </div>}
                                        <div>
                                            <span>Mô tả thêm về sản phẩm:</span><br/>
                                            <Form>
                                                <TextArea placeholder='Mô tả hình dáng, đặc điểm nổi bật, chức năng nổi bật...' 
                                                    value={data_bot.mt_sp}
                                                    onChange={(e,{value})=>{
                                                        let {data_bot}=this.state;
                                                        data_bot.mt_sp=value;
                                                        this.setState({data_bot:data_bot})
                                                    }}
                                                />
                                            </Form>
                                        </div>
                                        <div>
                                            <span>Ý nghĩa của từ khóa chính: "{data_prompt.key_word}" là:</span><br/>
                                            <Form>
                                                <TextArea placeholder='Giường sắt bán ở Gia Lai...' 
                                                    value={data_bot.key_des}
                                                    onChange={(e,{value})=>{
                                                        let {data_bot}=this.state;
                                                        data_bot.key_des=value;
                                                        this.setState({data_bot:data_bot})
                                                    }}
                                                />
                                            </Form>
                                        </div>
                                        <div>
                                            <span>Đối tượng khách hàng: "{data_prompt.key_word}" là:</span><br/>
                                            <Form>
                                                <TextArea placeholder='Học sinh, sinh viên, người có thu nhập thấp...'
                                                    value={data_bot.dt_kh}
                                                    onChange={(e,{value})=>{
                                                        let {data_bot}=this.state;
                                                        data_bot.dt_kh=value;
                                                        this.setState({data_bot:data_bot})
                                                    }}
                                                />
                                            </Form>
                                        </div>




                                    </div>
                                    </Segment>  
                                </Grid.Column>}
                            </Grid>
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
            {is_show_GPT_prompt_by_dk&&<div className='gpt-wrap'>
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
  