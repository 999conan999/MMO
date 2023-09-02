import React, { Component } from 'react';
import './danh_sach_tinh.css'
import { toast } from 'react-toastify';
import sampleSize  from 'lodash.samplesize';
import {
  action_update_data_like_setup,
  get_data_like_setup,
} from '../lib/axios'
export default class Danh_sach_tinh extends Component {
  constructor(props) {
    super(props)
      this.state = {
          checked:'',
          text_check:'',
          selected:-1,
          input_add_tinh:'',
          input_add_huyen:'',
          data:[
            // {
            //   id:'sda',
            //   ten_tinh:"Gia Lai",
            //   huyen_xa:[
            //     "Thị xã Ayun Pa",
            //     "Thị xã An Khê",
            //     "Phú Thiện"
            //   ],
            //   cua_hang:[
            //     {
            //       ten:"Nội Thất An Bình, chuyên key_word",
            //       sp:"giường sắt",
            //       lien_he:"0963226771",
            //       dia_chi:[
            //         "54 Ngô Quyền, thị xã Ayun Pa, Gia Lai",
            //         "60 Ngô Đức Kế, Thị Xã sông bờ, Gia Lai"
            //       ]
            //     },
            //     {
            //       ten:"Nội Thất An Bình, chuyên key_word",
            //       sp:"giường sắt",
            //       lien_he:"0963226771",
            //       dia_chi:[
            //         "54 Ngô Quyền, thị xã Ayun Pa, Gia Lai",
            //         "60 Ngô Đức Kế, Thị Xã sông bờ, Gia Lai"
            //       ]
            //     },
            //   ]
            // },
          ]
      }
    }

  async componentDidMount() {
    let text_check=await window.localStorage.getItem("selected_tinh");
    text_check=text_check==null?"":text_check;
    let a= await get_data_like_setup('data_tinh_viet_nam')
    if(a.status){
      this.setState({data:a.data,text_check:text_check})
    }
  }

  render() {
    let {data,input_add_tinh,input_add_huyen,selected,text_check,checked}=this.state
    return (
      <React.Fragment>
        <div className='container mt-50'>

         <div className='row'>
          <div className='col-4'>
            <div className="input-group mb-3 re">
              <input type="text" className="form-control" placeholder="Nhập tỉnh" aria-label="Recipient's username" aria-describedby="basic-addon2"
                value={input_add_tinh}
                onChange={(e)=>{
                  this.setState({input_add_tinh:e.target.value})
                }}
              />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary btn-primaryx"
                  onClick={()=>{
                    let {data}=this.state;
                    if(input_add_tinh.length>3){
                      data.unshift({
                        id:this.makeid(3),
                        ten_tinh:input_add_tinh,
                        huyen_xa:[],
                        cua_hang:[]
                      })
                      this.setState({data:data,input_add_tinh:""})
                      toast.success('Đã thêm.',{theme: "colored"});
                    }else{
                      toast.error('Tên tỉnh phải lớn hơn 3 kí tự.',{theme: "colored"});
                    }
                  }}
                ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm tỉnh</span></button>
              </div>
              <div className='zias'>
                <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText('key_word');
                      toast.success(`Đã copy: "key_word"`, { theme: "colored" })
                    }}
                  >key_word<i className="fa-regular fa-clone ml-3"></i></button>
              </div>
            </div>
          </div>
         </div>

         {/*  */}

        <div className='wrapxs'>
          {
            data.map((e,i)=>{
              let chek=text_check.search(e.id+",")==-1?false:true;
              return(
                   <div className='tagxs' key={e.id}>
                      <div className={chek?'checkxs activesel':'checkxs'}
                        onClick={()=>{
                          let {text_check}=this.state;
                          if(text_check.search(e.id+",")==-1){
                            text_check+=e.id+",";
                          }else{
                            text_check=text_check.replace(e.id+",", "");
                          }
                          this.setState({text_check:text_check,input_add_huyen:'',input_add_tinh:''});
                          window.localStorage.setItem("selected_tinh",text_check);
                        }}
                      >
                        <span className="xxy">{i+1}</span>
                      </div>
                      <div className={selected==e.id?"tillexs activexx":"tillexs"}
                        onClick={()=>{
                          if(selected==e.id){
                            this.setState({selected:''})
                          }else{
                            this.setState({selected:e.id})
                          }
                          
                        }}
                      >{e.ten_tinh}</div>
                      <div className="xxxs brsx" 
                        onClick={()=>{
                          if(window.confirm(`Xác nhận xóa : "${e.ten_tinh}"`)){
                            let {data}=this.state;
                            data.splice(i,1);
                            this.setState({data:data})
                          }
                        }}
                      ><i className="fa-sharp fa-solid fa-trash"></i></div>
                    </div>
              )
            })
          }
        </div>
        {
      data.map((e,i)=>{
        return <div key={e.id}>
          {selected==e.id&&<div className='row wrap-s csxx culacula' key={i} style={{backgroundColor:"#a5a4a3"}}>
            <div className='col-6'>
                <div className="input-group mb-3">
                  <span className="input-group-text">Tên (tỉnh):</span>
                  <input type="text" className="form-control" placeholder="Gia Lai" aria-label="Username" aria-describedby="basic-addon1" 
                    value={e.ten_tinh}
                    onChange={(e)=>{
                      let {data}=this.state;
                      data[i].ten_tinh=e.target.value
                      this.setState({data:data})
                    }}
                  />
                </div>
            </div>
            <div className='col-12'>
              <h4>*Tên thị xã, huyện,..vv. (Khu vực trực thuộc nhỏ hơn)</h4>
            </div>
            <div className='col-5'>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Nhập huyện, xã" aria-label="Recipient's username" aria-describedby="basic-addon2"
                    value={input_add_huyen}
                    onChange={(e)=>{
                      this.setState({input_add_huyen:e.target.value})
                    }}
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary btn-primaryx"
                    onClick={()=>{
                      let {data}=this.state
                      if(input_add_huyen.length>3){
                        data[i].huyen_xa.unshift(input_add_huyen);
                        this.setState({data:data,input_add_huyen:""})
                        toast.success(`Thêm thành thành công.`,{theme: "colored"})
                      }else{
                        toast.error('Tên huyện, xã phải lớn hơn 3 kí tự.',{theme: "colored"});
                      }
                    }}
                  ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm thị xã, huyện</span></button>
                </div>
              </div>
            </div>
              {/*  */}
            <div className='wrapxs' style={{backgroundColor:"antiquewhite"}}>
              {
                e.huyen_xa.map((huyen,j)=>{
                  return <div className='tagxs' key={j}>
                  <div className={checked==huyen?'checkxs echsasxz':'checkxs'}
                    onClick={()=>{
                        this.setState({checked:huyen}) 
                    }}
                  >
                    <span className="xxy">{j+1}</span>
                  </div>
                  <div className='tillexs'
                    onClick={()=>{
                        navigator.clipboard.writeText(huyen);
                        toast.success(`Đã copy: "${huyen}"`, { theme: "colored" })
                        this.setState({checked:huyen}) 
                    }}
                  ><b>{huyen}</b></div>
                  <div className="xxxs"
                    onClick={()=>{
                      if(window.confirm(`Xác nhận xóa: "${huyen}"`)){
                        let {data}=this.state;
                        data[i].huyen_xa.splice(j,1);
                        this.setState({data:data,input_add_huyen:""})
                      }
                        navigator.clipboard.writeText(huyen);
                        toast.success(`Đã copy: "${huyen}"`, { theme: "colored" })
                    }}
                  ><i className="fa-sharp fa-solid fa-trash"></i></div>
                </div>
                })
              }
          
            </div>
            <div className="input-group-append">
                  <button type="button" className="btn btn-primary btn-primaryx"
                    onClick={()=>{
                      let {data}=this.state;
                      data[i].cua_hang.unshift({
                        ten:"",
                        sp:"key_word",
                        lien_he:"",
                        dia_chi:["",""]
                      },)
                      this.setState({data:data})
                    }}
                  ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm địa chỉ cửa hàng ở khu vực này</span></button>
                </div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col" style={{width:'1%'}}>#</th>
                  <th scope="col" style={{width:'50%'}}>Cửa hàng bán</th>
                  <th scope="col" style={{width:'18%'}}>Sản phẩm</th>
                  <th scope="col" style={{width:'20%'}}>Liên hệ</th>
                </tr>
              </thead>
              <tbody>
                {
                  e.cua_hang.map((shop,j)=>{
                    return <tr key={j}>
                    <td scope="row">{j+1}
                      <div className="xxxs"
                        onClick={()=>{
                          if(window.confirm(`Xác nhận xóa : "${shop.ten}"`)){
                            let {data}=this.state;
                            data[i].cua_hang.splice(j,1);
                            this.setState({data:data})
                          }
                        }}
                      ><i className="fa-sharp fa-solid fa-trash"></i></div>
                    </td>
                    <td scope="row">
                      <div className="input-group ">
                        <span className="input-group-text">Tên nội thất:</span>
                        <input type="text" className="form-control" placeholder="Nội thất An Bình chuyên [key_word]" aria-label="Username" aria-describedby="basic-addon1" 
                          value={shop.ten}
                          onChange={(e)=>{
                            let {data}=this.state;
                            data[i].cua_hang[j].ten=e.target.value;
                            this.setState({data:data})
                          }}
                          
                        />
                        <i className="fa-solid fa-robot renderzd"
                          onClick={()=>{
                            let {data}=this.state;
                            data[i].cua_hang[j].ten=shop.ten+sampleSize([
                              ', chuyên key_word',
                              ', chuyên bán key_word',
                              ', nơi bán key_word',
                              ', có sỉ lẻ key_word',
                              ' bán key_word',
                              ' key_word',
                              ' - key_word',
                              ' - [key_word]',
                              ' - (key_word)',
                              ' - có bán key_word',
                              ' - cung cấp key_word',
                              ' - phân phối key_word',
                            ],1)[0];
                            this.setState({data:data})
                          }}
                        ></i>
                      </div>
                      <div className="input-group">
                        <span className="input-group-text">Địa chỉ 1:</span>
                        <input type="text" className="form-control" placeholder="..." aria-label="Username" aria-describedby="basic-addon1" 
                          value={shop.dia_chi[0]}
                          onChange={(e)=>{
                            let {data}=this.state;
                            data[i].cua_hang[j].dia_chi[0]=e.target.value;
                            this.setState({data:data})
                          }}
                          
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Địa chỉ 2:</span>
                        <input type="text" className="form-control" placeholder="..." aria-label="Username" aria-describedby="basic-addon1" 
                          value={shop.dia_chi[1]}
                          onChange={(e)=>{
                            let {data}=this.state;
                            data[i].cua_hang[j].dia_chi[1]=e.target.value;
                            this.setState({data:data})
                          }}
                          
                        />
                      </div>
                    </td>
                    <td scope="row">
                      <input type="text" className="form-control" placeholder="Giường sắt" aria-label="Username" aria-describedby="basic-addon1" 
                            value={shop.sp}
                            onChange={(e)=>{
                              let {data}=this.state;
                              data[i].cua_hang[j].sp=e.target.value;
                              this.setState({data:data})
                            }}
                            
                          />
                    </td>
                    <td scope="row">
                      <input type="text" className="form-control" placeholder="0963226771" aria-label="Username" aria-describedby="basic-addon1" 
                            value={shop.lien_he}
                            onChange={(e)=>{
                              let {data}=this.state;
                              data[i].cua_hang[j].lien_he=e.target.value;
                              this.setState({data:data})
                            }}
                            
                          />
                    </td>
                  </tr>
                  })
                }
                {/* <tr>
                  <td scope="row">1</td>
                  <td scope="row">
                    <div className="input-group">
                      <span className="input-group-text">Tên nội thất:</span>
                      <input type="text" className="form-control" placeholder="Nội thất An Bình chuyên [key_word]" aria-label="Username" aria-describedby="basic-addon1" 
                        // value={selected_page.title}
                        // onChange={(e)=>{
                        //   let {selected_page}=this.state;
                        //   selected_page.title=e.target.value;
                        //   this.setState({selected_page:selected_page})
                        // }}
                        
                      />
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">Địa chỉ 1:</span>
                      <input type="text" className="form-control" placeholder="..." aria-label="Username" aria-describedby="basic-addon1" 
                        // value={selected_page.title}
                        // onChange={(e)=>{
                        //   let {selected_page}=this.state;
                        //   selected_page.title=e.target.value;
                        //   this.setState({selected_page:selected_page})
                        // }}
                        
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Địa chỉ 2:</span>
                      <input type="text" className="form-control" placeholder="..." aria-label="Username" aria-describedby="basic-addon1" 
                        // value={selected_page.title}
                        // onChange={(e)=>{
                        //   let {selected_page}=this.state;
                        //   selected_page.title=e.target.value;
                        //   this.setState({selected_page:selected_page})
                        // }}
                        
                      />
                    </div>
                  </td>
                  <td scope="row">
                    <input type="text" className="form-control" placeholder="Giường sắt" aria-label="Username" aria-describedby="basic-addon1" 
                          // value={selected_page.title}
                          // onChange={(e)=>{
                          //   let {selected_page}=this.state;
                          //   selected_page.title=e.target.value;
                          //   this.setState({selected_page:selected_page})
                          // }}
                          
                        />
                  </td>
                  <td scope="row">
                    <input type="text" className="form-control" placeholder="0963226771" aria-label="Username" aria-describedby="basic-addon1" 
                          // value={selected_page.title}
                          // onChange={(e)=>{
                          //   let {selected_page}=this.state;
                          //   selected_page.title=e.target.value;
                          //   this.setState({selected_page:selected_page})
                          // }}
                          
                        />
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>}
        </div>
      })}
       
 

          </div>
 
        <div className="footer-edit">
            <button type="button" className="btn btn-primary"
              onClick={async()=>{
                let {data}=this.state;
                let a = await action_update_data_like_setup({
                  name:'data_tinh_viet_nam',
                  value:JSON.stringify(data)
                })
                if(a.status){
                  toast.success(`Cập nhật thành công.`,{theme: "colored"})
                }else{
                  toast.error('Lỗi rồi bạn ơi!.',{theme: "colored"})
                }
              }}
            >Cập nhật bài viết</button>
        </div>
      </React.Fragment>
    );
  }
  makeid=(length)=> {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

