import React, { Component } from 'react';
import './template_input.css'
// import { toast } from 'react-toastify';
import Editer from '../editer/Editer';
import {Card,Grid,Segment,Input, Image,Form,TextArea,Checkbox,Dropdown,Button, Icon,Table } from 'semantic-ui-react'
import Soan_thao from './container/Soan_Thao';
import Small_input from './container/Small_input';
import Text_Area_input from './container/text_Area_input';
import Check_input from './container/Check_input';
import Table_input from './container/Table_input';
import Catagory_input from './container/Category_input';
import Tag_input from './container/tag_input';
import Selected_input from './container/selected_input';
import Thumnail_input from './container/thumnail_input';
import Muti_thuamnail_input from './container/muti_thumnail_input';
import { moveElement } from '../fs';
export default class Template_input extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editer_option:{
        is_open:false,
        text_html:'',
        index:-1
      }
    }
  }
  render() {
    let {editer_option}=this.state;
    let {tempalate,data,data_options}=this.props;
      console.log("🚀 ~ file: Template_input.js:41 ~ Template_input ~ render ~ data:",data_options)
      return (
        <React.Fragment>
          <Segment horizontal className='wrap-temp-input'
            // loading
          >
            <Grid>
              {
                tempalate.map((e,i)=>{
                  let is_show=true;
                  if(e.condition_show!=undefined){
                    if(data[e.condition_show.index]==e.condition_show.value) is_show=false;
                  }

                  if(e.type_input=="soan_thao"){

                    return (is_show&&<Soan_thao key={i}
                      text_html={data[i]==undefined?"":data[i]}
                      openAction={()=>{
                        this.setState({
                          editer_option:{
                            is_open:true,
                            text_html:data[i]==undefined?"":data[i],
                            index:i
                          }
                        })
                      }}
                      option={e}
                    />)
                  }else if(e.type_input=="small_input"){
                    return (is_show&&<Small_input  key={i}
                      text={data[i]==undefined?"":data[i]}
                      option={e}
                      fs_result={(text)=>{
                        let {data}=this.props;
                        data[i]=text;
                        this.props.fs_return(data)
                      }}
                    />)
                  }else if(e.type_input=="textArea_input"){
                    return (is_show&&<Text_Area_input  key={i}
                      text={data[i]==undefined?"":data[i]}
                      option={e}
                      fs_result={(text)=>{
                        let {data}=this.props;
                        data[i]=text;
                        this.props.fs_return(data)
                      }}
                    />)
                  }else if(e.type_input=="check_input"){
                    return (is_show&&<Check_input key={i}
                      value={data[i]==undefined?e.default_value:data[i]}
                      option={e}
                      fs_result={(value) => {
                        let {data}=this.props;
                        data[i]=value;
                        this.props.fs_return(data)
                      }}
                    />)
                  }else if(e.type_input=="thumnail_input"){
                    return (is_show&&<Thumnail_input key={i}
                      img_url={data[i]==undefined?'':data[i]}
                      option={e}
                      fs_result={(value) => {
                        let {data}=this.props;
                        data[i]=value;
                        this.props.fs_return(data)
                      }}
                    />)
                  }else if(e.type_input=="muti_img_input"){
                    return (is_show&&<Muti_thuamnail_input key={i}
                      img_list={data[i]==undefined?[]:data[i]}
                      option={e}
                      fs_result={(list) => {
                        let {data}=this.props;
                        if(data[i]==undefined){
                          data[i]=list
                        }else{
                          data[i]=[...data[i],...list];
                        }
                        data[i]=data[i].filter((item, index, self) => {
                          return index === self.findIndex((t) => (
                              t.id === item.id
                          ));
                        });
                        this.props.fs_return(data);
                      }}
                      removeAction={(id)=>{
                        let {data}=this.props;
                        data[i]=data[i].filter(z =>z.id !== id)
                        this.props.fs_return(data);
                      }}
                      move_left_action={(index)=>{
                        let {data}=this.props;
                        data[i]=moveElement(data[i],index,index-1)
                        this.props.fs_return(data);
                      }}
                    />)
                  }else if(e.type_input=="table_input"){
                    return (is_show&&<Table_input key={i}
                      arr={data[i]==undefined?[e.table_header]:data[i]}
                      option={e}
                      fs_result={(arr) => {
                        let {data}=this.props;
                        data[i]=arr;
                        this.props.fs_return(data)
                      }}

                    />)
                  }else if(e.type_input=="category_input"){
                    return (is_show&&<Catagory_input key={i}
                      data_arr={data[i]==undefined?[]:data[i]}
                      data_option={data_options[e.data_options_index]==undefined?[]:data_options[e.data_options_index]}
                      option={e}
                      fs_result={(value) => {
                        let {data}=this.props;
                        data[i]=value;
                        this.props.fs_return(data)
                      }}
                    />)
                  }else if(e.type_input=="tag_input"){
                    return (is_show&&<Tag_input key={i}
                      data_arr={data[i]==undefined?[]:data[i]}
                      data_option={data_options[e.data_options_index]==undefined?[]:data_options[e.data_options_index]}
                      option={e}
                      fs_result={(value) => {
                        let {data}=this.props;
                        data[i]=value;
                        this.props.fs_return(data)
                      }}
                      fs_change_data_options={((data_option)=>{
                        let {data_options}=this.props;
                        data_options[e.data_options_index]=data_option;
                        this.props.fs_change_data_options(data_options)
                      })}
                    />)
                  }else if(e.type_input=="selected_input"){
                    return (is_show&&<Selected_input key={i}
                      text={data[i]==undefined?'':data[i]}
                      data_option={data_options[e.data_options_index]==undefined?[]:data_options[e.data_options_index]}
                      option={e}
                      fs_result={(value) => {
                        let {data}=this.props;
                        data[i]=value;
                        this.props.fs_return(data)
                      }}
                    />)
                  }





                })
              }

          </Grid>
            {editer_option.is_open&&<Editer
              close={()=>this.setState({editer_option:{is_open:false,text_html:'',index:-1}})}
              data={editer_option.text_html}
              rs_data={(rs) => {
                let {data}=this.props;
                data[editer_option.index]=rs;
                this.props.fs_return(data)
                this.setState({editer_option:{is_open:false,text_html:'',index:-1}});
                
              }}
          />}
          </Segment>
        </React.Fragment>
      );
  }
}

