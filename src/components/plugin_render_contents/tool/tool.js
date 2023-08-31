import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Table,Grid,Segment,Input,Image,Button} from 'semantic-ui-react';
export default class Tool extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // main
      data:[
        // {
        //   id:1,
        //   name_buyer:'Danh',
        //   phone:'0326397884',
        //   address_1:'37 Ngô Đức Kế, Phường 12, Bình Thạnh, Hồ Chí Minh',
        //   note:'Nhanh lên',
        //   time:'132542141',
        //   order_status:'checked',
        //   data_carts:[]
        // },
      ],
      token_telegram:{
        token:'',
        id:''
      },
      //ho tro
      sdt:'',
      is_loading:true,
      //
      is_edit_token:false,
      data_edit_token:{
        token:'',
        id:''
      }
    }
  }
  async componentDidMount(){
 
    // let data=await get_orders();
    // let token_telegram=await get_setup({name:"telegram_data"})
    // if(!token_telegram) token_telegram={token:"",id:""};
    // if(!data) data=[];
    // this.setState({data:data,is_loading:false,token_telegram:token_telegram})
    // //
  }
  //
 
  render() {
    return (
        <React.Fragment>
              <Grid>
                <Grid.Column width={6} className='mgt-50'>
                ddxxxx  
                </Grid.Column>
                <Grid.Column width={10} className='mgt-50 re'>
                  ttttttttttt
                </Grid.Column>
              </Grid>
        </React.Fragment>
      );
  }
  convert_time=(time)=>{
    let time_his = new Date(time * 1000);
    let time_now= new Date().getTime();
    let time_long=Math.floor((time_now-time_his)/60000);//all phut
    let count_day=Math.floor(time_long/1440);//
    let count_hour=Math.floor(time_long/60)-count_day*24;//
    let count_Minutes=time_long-count_day*24*60-count_hour*60;
    return {
      h:count_hour,
      d:count_day,
      m:count_Minutes,
    }

  }
}

