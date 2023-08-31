import React, { Component,useRef    } from 'react';
import './Add_media.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {
    upload_core,
    get_imgs,
    action_remove_img_by_id,
    get_img_clone,
    clone_img,
    delete_img_clone
} from '../axios'
const icon_upload=<svg  fill={'#2185d0'} width={'26px'} height={'26px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM352.1 304.1C348.3 309.7 342.2 312 336 312s-12.28-2.344-16.97-7.031L280 265.9V376c0 13.25-10.75 24-24 24s-24-10.75-24-24V265.9L192.1 304.1c-9.375 9.375-24.56 9.375-33.94 0s-9.375-24.56 0-33.94l80-80c9.375-9.375 24.56-9.375 33.94 0l80 80C362.3 280.4 362.3 295.6 352.1 304.1z"/>
</svg>
// const img_listx=[
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/Ban-hoc-doi-bang-nhua-cho-be-trai-va-gai-1-300x300.jpg',
//         id:0,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-gia-re-mau-do-300x300.jpg',
//         id:2,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-mau-trang-gia-re-binh-duong-300x300.jpg',
//         id:3,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-mau-nau-dep-300x300.jpg',
//         id:4,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-gia-re-Duy-phuong-1m2x2m-h2-300x300.jpg',
//         id:5,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-gia-re-mau-xanh-300x300.jpg',
//         id:6,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-nam-tinh-mau-den-An-Binh-300x300.jpg',
//         id:7,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-1m8x2m-trang-den-300x300.jpg',
//         id:8,
//     },
//     {
//         img:'https://anbinhnew.com/wp-content/uploads/2021/01/Giuong-sat-hop-cao-cap-don-gian-300x300.jpg',
//         id:9,
//     },
// ]
const quantity=30;
export default class Media_img extends Component {
    constructor (props) {
        super(props)
        this.myRef1 = React.createRef();
        this.myRef_scroll = React.createRef() 
        this.state = {
            page_bs:0,
            show_more_bs:false,
            selected_ban_sao:{
                index:-1,
                id:-1,
                img:'',
                alt:''
            },
            lock:true,
            selected_show_img:'tv',// tv || bs
            show_more:false,
            selected:{
                img:'',
                id:-1
            },
            title:'',
            img_list:[],
            img_bs:[]
        }


    }
    handleClose=()=>{
        this.props.handleClose();
        this.setState({
            selected_ban_sao:{
                index:-1,
                id:-1,
                img:'',
                alt:''
            },
            // selected:{
            //     img:'',
            //     id:-1
            // },
        })
    };
    async componentDidMount(){

        let a= await get_imgs(0);
        let show_more=true;
        if(a.length>0){
          if(a.length<quantity) show_more=false;
          this.setState({
            img_list:a,
            show_more:show_more,
            page:1
          })
        }
      }
    // 
    render() {
        let {selected,img_bs,selected_show_img,title,img_list,show_more,selected_ban_sao,lock,show_more_bs}=this.state;
        let imgs=selected_show_img=='tv'?img_list:img_bs;
        // let imgs=img_listx;
        let {is_open_media} =this.props
        return (
            <>
            <Modal 
                show={is_open_media} onHide={this.handleClose}
                size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                    <div className={selected_show_img=='tv'?'rurur active-ru':'rurur'}
                        onClick={()=>this.setState({
                            selected_show_img:'tv'
                        })}
                    >
                        <span>Thư viện hình ảnh</span>
                    </div>
                    <div className={selected_show_img=='bs'?'rurur active-ru':'rurur'}
                        onClick={async()=>{
                                if(lock){
                                    let a=await get_img_clone(0);
                                    let show_more_bs=true;
                                    if(a.length>0){
                                        if(a.length<quantity) show_more_bs=false;
                                        this.setState({
                                            selected_show_img:'bs',
                                            lock:false,
                                            img_bs:a,
                                            show_more_bs:show_more_bs,
                                            page_bs:1
                                        })
                                    }else{
                                        this.setState({
                                            selected_show_img:'bs',
                                            lock:false,
                                        })
                                    }
                                }else{
                                    this.setState({
                                        selected_show_img:'bs'
                                    })
                                }
                            }
                            
                        }
                    >
                        <span
                        >Bản sao hình ảnh</span>
                    </div>
                </Modal.Title>
                <div className='uploaz'>
                     <div className='upload-btn-wrapper'>
                        <button  className='btnz'>
                            Upload&nbsp;
                            {icon_upload}
                        </button>
                        <input type="file" id="myFile" name="filename" className='btn-upl' multiple
                            onChange={this.handleChangeFile.bind(this)} 
                        />
                    </div>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div className='row bozy'>
                    <div ref={this.myRef_scroll}></div> 
                    {
                        imgs.map((item,i)=>{
                            return (
                                <div className='col-3 card-imgz' key={item.id}>
                                    <div className={selected.id===item.id?'row wrap-imgz active':'row wrap-imgz'}>
                                        <div className='col-12 img-ak'
                                            onClick={()=>{
                                                if(selected.id===item.id){
                                                    this.setState({selected:{img:'',id:-1}});
                                                }else{
                                                    this.setState({selected:item});
                                                }
                                                
                                                this.myRef1.current.focus();
                                            }}
                                        >
                                            {item.alt!==undefined&&<div className='huhula'>
                                                {item.alt==undefined?'':item.alt}
                                            </div>}
                                            <img src={item.img} width="100%"/>
                                        </div>
                                        <div className='rela'>
                                            {selected_ban_sao.index==i&&<div className='img-name-input'>
                                                <input type="text" placeholder='Nhập tên cho hình ảnh này' className='inputxx'
                                                    value={selected_ban_sao.alt}
                                                    onChange={(e)=>{
                                                        let {selected_ban_sao}=this.state;
                                                        selected_ban_sao.alt=e.target.value
                                                        this.setState({selected_ban_sao:selected_ban_sao})
                                                      }}
                                                />
                                                <span className='ok-imgs'
                                                    onClick={async()=>{
                                                        let {selected_ban_sao,img_bs}=this.state;
                                                        if(selected_ban_sao.alt.length>5){
                                                            let a=await clone_img({
                                                                alt:selected_ban_sao.alt,
                                                                img:item.img
                                                            })
                                                            if(a.id!=undefined){
                                                                if(lock){
                                                                    let b=await get_img_clone(0);
                                                                    let show_more_bs=true;
                                                                        if(b.length<quantity) show_more_bs=false;
                                                                        this.setState({
                                                                            lock:false,
                                                                            img_bs:b,
                                                                            show_more_bs:show_more_bs,
                                                                            page_bs:1,
                                                                            selected_ban_sao:{
                                                                                index:-1,
                                                                                id:-1,
                                                                                img:'',
                                                                                alt:''
                                                                            },
                                                                            selected_show_img:'bs',
                                                                        })
                                                              
                                                                }else{
                                                                    img_bs.unshift(a);
                                                                    this.setState({
                                                                        selected_ban_sao:{
                                                                            index:-1,
                                                                            id:-1,
                                                                            img:'',
                                                                            alt:''
                                                                        },
                                                                        selected_show_img:'bs',
                                                                        img_bs:img_bs
                                                                    })
                                                                }
                                                                this.myRef_scroll.current.scrollIntoView()

                                                            }else{
                                                                toast.error('Nhân bản hình ảnh không thành công.',{theme: "colored"});
                                                            }
                                                            
                                                        }else{
                                                            alert("Bạn cần nhập tên cho hình ảnh ( >5 kí tự)")
                                                        }
                                                        
                                                    }}
                                                >Ok</span>
                                                <i className="fa-solid fa-circle-xmark toxx"
                                                    onClick={()=>{
                                                        this.setState({
                                                            selected_ban_sao:{
                                                                index:-1,
                                                                id:-1,
                                                                img:'',
                                                                alt:''
                                                            }
                                                        })
                                                    }}
                                                ></i>
                                             </div>}
                                        </div>
                                            <div className={selected_show_img=='tv'?'col-6 textd':'col-12 textd'}
                                                onClick={()=>{
                                                    navigator.clipboard.writeText(item.img)
                                                    toast.success('Đã sao chép vào bộ nhớ tạm!',{theme: "colored"})
                                                }}
                                            >
                                                Copy link
                                            </div>
                                            {selected_show_img=='tv'&&<div className='col-6 textd'
                                                onClick={()=>{
                                                    this.setState({
                                                        selected_ban_sao:{
                                                            index:i,
                                                            id:item.id,
                                                            img:item.img,
                                                            alt:''
                                                        }
                                                    })
                                                }}
                                            >
                                                Tạo bản sao
                                            </div>}
                                            <div className='col-6 textd'
                                                onClick={async()=>{
                                                    if (window.confirm(`Xóa hình ảnh này?`)) {
                                                        // // test xoa hinh anh local list seletect and list all img
                                                          toast.success('Xóa thành công',{theme: "colored"});
                                                            if(selected_show_img=='tv'){
                                                                let a=await action_remove_img_by_id(item.id);
                                                                console.log("🚀 ~ file: Add_media.js:302 ~ Media_img ~ onClick={async ~ item.id", item.id)
                                                                if(a.status){
                                                                    let index=-1;
                                                                    let {img_list}=this.state;
                                                                    img_list.forEach((e,k) => {
                                                                        if(e.id==item.id) index=k;
                                                                    });
                                                                    console.log(index);
                                                                    if(index!=-1) {
                                                                        img_list.splice(index,1);
                                                                        this.setState({img_list:img_list})
                                                                    }
                                                                }
                                                            }else{
                                                                let a= await delete_img_clone(item.id);
                                                                console.log("🚀 ~ file: Add_media.js:317 ~ onClick={async ~ item.id", item.id)
                                                                if(a.status){
                                                                    let index=-1;
                                                                    let {img_bs}=this.state;
                                                                    img_bs.forEach((e,k) => {
                                                                        if(e.id==item.id) index=k;
                                                                    });
                                                                    console.log(index);
                                                                    if(index!=-1) {
                                                                        img_bs.splice(index,1);
                                                                        this.setState({img_bs:img_bs})
                                                                    }
                                                                }
                                                            }
                                                         
                                                        
                                                    }
                                                }}
                                            >
                                                Xóa
                                            </div>
                                            <a   target="_blank" href={item.img} className='col-6 textd xmez'>
                                                Xem
                                            </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                   {show_more&&selected_show_img=="tv"&&<div className='col-12 xem-themz' 
                        onClick={async()=>{
                            let {img_list,page}=this.state;
                            let a= await get_imgs(page);
                            if(a!=null){
                            let show_more=true;
                            if(a.length<quantity) show_more=false;
                            if(a.length>0){
                                img_list=[...img_list,...a];
                                this.setState({
                                page:page+1,
                                show_more:show_more,
                                img_list:img_list
                                })
                            }else{
                                this.setState({
                                page:page+1,
                                show_more:false,
                                })
                            }
                            }else{
                            this.setState({
                                page:page+1,
                                show_more:false,
                            })
                            }
                        }}
                   >
                        <a>Xem thêm</a>
                    </div>}
                   {show_more_bs&&selected_show_img=="bs"&&<div className='col-12 xem-themz' 
                        onClick={async()=>{
                            let {img_bs,page_bs}=this.state;
                            let a= await get_img_clone(page_bs);
                                let show_more_bs=true;
                                if(a.length<quantity) show_more_bs=false;
                                if(a.length>0){
                                    img_bs=[...img_bs,...a];
                                    this.setState({
                                    page_bs:page_bs+1,
                                    show_more_bs:show_more_bs,
                                    img_bs:img_bs
                                    })
                                }else{
                                    this.setState({
                                    page_bs:page_bs+1,
                                    show_more_bs:false,
                                    })
                                }

                        }}
                   >
                        <a>Xem thêm</a>
                    </div>}
                </div>

              </Modal.Body>
              <Modal.Footer>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Mô tả về hình ảnh
                    </InputGroup.Text>
                    <Form.Control   aria-describedby="basic-addon3" 
                        placeholder="Mô tả về hình ảnh ở đây ..."
                        ref={this.myRef1}
                        value={title}
                        onChange={(e)=>this.setState({title:e.target.value})}
                    />
                </InputGroup>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={()=>{
                    this.handleClose();
                    let {selected,title}=this.state;
                    this.props.fsReturn_media({
                        img:selected.img,
                        id:selected.id,
                        title:title
                    })
                    this.setState({
                        selected:{
                            img:'',
                            id:-1
                          },
                          title:''
                    })
                }}>
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
    handleChangeFile=async(e)=>{
        let listFile= e.target.files;
        //
        if(listFile.length>0){
        toast.success('Tải lên thành công!',{theme: "colored"})
          let a= await upload_core(listFile);
          let {img_list}=this.state;
          img_list=[...a,...img_list];
          this.setState({
            img_list:img_list,
            selected_show_img:'tv'
          })
        }
        //
    }
  
}

