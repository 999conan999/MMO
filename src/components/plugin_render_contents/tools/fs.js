import { random } from 'lodash';
import sampleSize  from 'lodash.samplesize';
// import sample   from 'lodash.sample';
export  function xu_ly_content (content_data,list_tinh){
    let rs=[];
    list_tinh.forEach((e,i) => {
        let bv={
            thumnail:'',
            title:'',
            short_des:'',
            long_des:'',
            shop_adress:''
        }
        let ten_tinh=e.ten_tinh;
        window.check_img=',';
        // xu ly thumnail // hien thi lan luot trong list hinh anh, neu khong duoc thi random;
        if(content_data.imgs[i]==undefined){
            bv.thumnail= get_random_thumnail(content_data.imgs);
        }else{
            bv.thumnail=content_data.imgs[i].img;
        }
        // xu ly tieu de
        let title=get_random_array_text(content_data.title);
        title=xu_ly_text_vs_keywords(title,content_data.key_words);
        title=fs_replace_all(title,'ten_tinh',ten_tinh);
        title=fs_replace_random_arr_text(title,'ten_xa_huyen',e.huyen_xa);
        bv.title=fs_replace_all(title,'"',"'").trim();
        //xu ly mo ta ngan
        let short_des=get_random_array_text(content_data.short_des);
        short_des=xu_ly_text_vs_keywords(short_des,content_data.key_words);
        short_des=fs_replace_random_arr_cua_hang_and_dia_chi(short_des,e.cua_hang,content_data.key_words);//todo
        short_des=fs_replace_random_arr_text(short_des,'ten_xa_huyen',e.huyen_xa);
        short_des=fs_replace_all(short_des,'ten_tinh',ten_tinh);
        bv.short_des=fs_replace_all(short_des,'"',"'").trim();
        // xu ly mo ta dai
        let long_des=xu_ly_long_des(content_data,e);
        bv.long_des=fs_replace_all(long_des,'"',"'").trim();
        // xu ly bang dia chi o day;
        let shop_adress=xu_ly_dia_chi_cua_hang(content_data,e);
        bv.shop_adress=fs_replace_all(shop_adress,'"',"'").trim();
        rs.push(bv);
    });
    return rs;
}
function xu_ly_dia_chi_cua_hang(content_data,tinh){
    // console.log("🚀 ~ file: fs.js:44 ~ xu_ly_dia_chi_cua_hang ~ key_words:", key_words)
    // console.log("🚀 ~ file: fs.js:44 ~ xu_ly_dia_chi_cua_hang ~ cua_hang:", cua_hang)
    let cua_hang_arr=sampleSize(tinh.cua_hang,100);
    let rs='';
    if(cua_hang_arr.length>0){
        let text_arr=[
            '# Địa chỉ cửa hàng bán key_word tại ten_tinh',
            '# Địa chỉ cửa hàng mua bán key_word tại ten_tinh',
            '# Cửa hàng bán key_word tại ten_tinh tốt nhất',
            '# Cửa hàng nội thất bán key_word tại ten_tinh giá rẻ',
            '# Shop bán key_word tại ten_tinh giá rẻ',
            '# Nơi bán key_word tại ten_tinh siêu đẹp',
            '# Những cửa hàng bán key_word tại ten_tinh',
            '# Top Những cửa hàng bán key_word tại ten_tinh',
            '# Top 5 cửa hàng bán key_word tại ten_tinh',
            '# Mua bán key_word tại ten_tinh ở đâu?',
            '# 5 Shop bán key_word tại ten_tinh giá rẻ',
            '# Mua key_word tại ten_tinh giá rẻ, top 5 cửa hàng bán',
            '# Nơi mua bán key_word giá rẻ tại ten_tinh'
        ];
        let text=sampleSize(text_arr,1)[0];
        text=convert_add_key_to_text_tag(text,tinh,content_data.key_words);
        rs+='<h2 id="cua-hang">'+text+'</h2>';
        rs+='<table style="width: 100%;"> <thead> <tr> <th scope="col" style="width: 2%;">#</th> <th scope="col" style="width: 50%;">Địa chỉ</th> <th scope="col" style="width: 18%;">Sản phẩm</th> <th scope="col" style="width: 20%;">Liên hệ</th> </tr> </thead> <tbody>';
        let a=Math.floor(Math.random() * 3 ) + 5;
        cua_hang_arr.forEach((e,i) => {
            if(i<a){
                rs+='<tr>';
                rs+='<th scope="row">'+(i+1)+'</th>';
                rs+='<td> <strong class="nameshop">'+convert_add_key_to_text_tag(e.ten,tinh,content_data.key_words)+'</strong> <p class="dc"><b>Địa chỉ: </b>'+sampleSize(e.dia_chi,1)[0]+'</p> </td>';
                text='key_word';
                rs+='<td>'+convert_add_key_to_text_tag(text,tinh,content_data.key_words)+'</td>';
                rs+='<td>'+e.lien_he+'</td>';
                rs+='</tr>';
            }
        });
        rs+='</tbody></table>';
    }
    return rs;
}
//
function xu_ly_long_des(content_data,tinh){
    // console.log("🚀 ~ file: fs.js:39 ~ xu_ly_long_des ~ list_tinh:", list_tinh)
    let long_des_arr=sampleSize(content_data.long_des,100);
    let key_words=content_data.key_words;
    // console.log("🚀 ~ file: fs.js:43 ~ xu_ly_long_des ~ key_words:", key_words)
    let content='';
    long_des_arr.forEach((e) => {// L1
        let text='';
        text=e.text;
        text=convert_add_key_to_text_tag(text,tinh,key_words)
        if(e.tag=='h2'){
            content+='<h2>'+text+`</h2>`;
            let data_1=sampleSize(e.data,100);
            data_1.forEach((a1) => {//L2
                text=a1.text;
                text=convert_add_key_to_text_tag(text,tinh,key_words);
                if(a1.tag=='h3'){
                    content+='<h3>'+text+'</h3>';
                    let data_2=sampleSize(a1.data,100);
                    data_2.forEach((a2) => {//L3
                        text=a2.text;
                        text=convert_add_key_to_text_tag(text,tinh,key_words);
                        if(a2.tag=='p'){
                            text=text.replace(/[\n]+/g, "</p><p>");
                            content+='<p>'+text+'</p>';
                        }else if(a2.tag=='img'){
                            text=text.replace(/[\n]+/g, "");
                            let img_url=get_ramdom_img_from_img_list(a2.img_list,text);
                            content+='<figure><img class="lazyload" title="'+text+'" src="'+img_url.url300+'" data-srcset="'+img_url.url+'" alt="'+text+'"> <figcaption>'+text+'</figcaption> </figure>';
                        }else if(a2.tag=='quote'){
                            text=text.replace(/[\n]+/g, "");
                            content+='<blockquote><p>'+text+'</p></blockquote>';
                        }else if(a2.tag=='table'){
                            text=text.replace(/[\n]+/g, "");
                            content+=text;
                        }
                    })
                }else if(a1.tag=='p'){
                    text=text.replace(/[\n]+/g, "</p><p>");
                    content+='<p>'+text+'</p>';
                }else if(a1.tag=='img'){
                    text=text.replace(/[\n]+/g, "");
                    let img_url=get_ramdom_img_from_img_list(a1.img_list,text);
                    content+='<figure><img class="lazyload" title="'+text+'" src="'+img_url.url300+'" data-srcset="'+img_url.url+'" alt="'+text+'"> <figcaption>'+text+'</figcaption> </figure>';
                }else if(a1.tag=='quote'){
                    text=text.replace(/[\n]+/g, "");
                    content+='<blockquote><p>'+text+'</p></blockquote>';
                }else if(a1.tag=='table'){
                    text=text.replace(/[\n]+/g, "");
                    content+=text;
                }
            })
        }else if(e.tag=='p'){
            text=text.replace(/[\n]+/g, "</p><p>");
            content+='<p>'+text+'</p>';
        }else if(e.tag=='img'){
            console.log("🚀 ~ file: fs.js:143 ~ long_des_arr.forEach ~ e:", e)
            text=text.replace(/[\n]+/g, "");
            let img_url=get_ramdom_img_from_img_list(e.img_list,text);
            content+='<figure><img class="lazyload" title="'+text+'" src="'+img_url.url300+'" data-srcset="'+img_url.url+'" alt="'+text+'"> <figcaption>'+text+'</figcaption> </figure>';
        }else if(e.tag=='quote'){
            text=text.replace(/[\n]+/g, "");
            content+='<blockquote><p>'+text+'</p></blockquote>';
        }else if(e.tag=='table'){
            text=text.replace(/[\n]+/g, ' ');
            content+=text;
        }
    });
    // xu lu hinh anh tu nua hinh_anh
    content=add_hinh_anh(content,content_data.imgs);// ket qua cuoi cung
    content=fs_replace_all(content,'b_s','<b>');
    content=fs_replace_all(content,'b_e','</b>');
    content=fs_replace_all(content,'a_s','<a class="btn-dc" href="#dia-chi">');
    content=fs_replace_all(content,'a_e','</a>');
    if(content_data.url_target.length>5){
        let list_title_a=getFromBetween.get(content,"r_s","r_e");
        list_title_a.forEach(e => {
            content=content.replace('r_s',"<a class='btn-dc' href='"+content_data.url_target+"' title='"+e+"'>");
        });
        content=fs_replace_all(content,'r_e','</a>');
    }
    return content

} 
var getFromBetween = {
    results:[],
    string:"",
    getFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1)+sub1.length;
        var string1 = this.string.substr(0,SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP,TP);
    },
    removeFromBetween:function (sub1,sub2) {
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        this.string = this.string.replace(removal,"");
    },
    getAllResults:function (sub1,sub2) {
        // first check to see if we do have both substrings
        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        // find one result
        var result = this.getFromBetween(sub1,sub2);
        // push it to the results array
        this.results.push(result);
        // remove the most recently found one from the string
        this.removeFromBetween(sub1,sub2);

        // if there's more substrings
        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1,sub2);
        }
        else return;
    },
    get:function (string,sub1,sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1,sub2);
        return this.results;
    }
};
// xu ly lay random hinh tu list img co san, dieu kien la kiem tra cai co san khong bi trung so voi text hien co
function get_ramdom_img_from_img_list(array,text){
    let img_list=[...[],...array];
    if(img_list.length>0){
        let rs='hinh_anh';
        while(img_list.length>0){
            let a=sampleSize(img_list,1);
            if(a.length>0){
                if(window.check_img.search(','+a[0].id+',')==-1){
                    rs=a[0];
                    window.check_img+=a[0].id+',';
                    break;
                }else{
                    let index=-1;
                    img_list.forEach((e,i) => {
                        if(e.id==a[0].id) index=i;
                    });
                    if(index!=-1){
                        img_list.splice(index,1)
                    }else{
                        break;
                    }
                }
            }else{
                break;
            }
        }
        return rs;
 
    }else{
        return 'hinh_anh'
    }
}
// xu ly hinh anh
function add_hinh_anh(text,arr_pic){
    let array=[...[],...arr_pic];
    let k=[...[],...arr_pic];
    while(text.search('hinh_anh')>-1){
        if(array.length>0){
            let a=sampleSize(array,1);
            if(a.length>0){
                if(window.check_img.search(','+a[0].id+',')==-1){
                    text=text.replace('hinh_anh',a[0].img);
                    // xoa phan tu da thay o trong mang da lay
                    let index=-1;
                    array.forEach((e,i) => {
                        if(e.id==a[0].id) index=i;
                    });
                    if(index!=-1){
                        array.splice(index,1)
                    };
                    window.check_img+=a[0].id+',';
                }else{
                    let index=-1;
                    array.forEach((e,i) => {
                        if(e.id==a[0].id) index=i;
                    });
                    if(index!=-1){
                        array.splice(index,1)
                    };
                }
            }else{
                let a=sampleSize(k,1);
                text=text.replace('hinh_anh',a[0].img);
            }

        }else{
            let a=sampleSize(k,1);
            text=text.replace('hinh_anh',a[0].img);
        }
        // 
        // text=text.replace(find,a)
    }
    return text;
}
// convert add key_words to text tag
function convert_add_key_to_text_tag(text,tinh,key_words){
    text=xu_ly_text_vs_keywords(text,key_words);
    text=fs_replace_all(text,'ten_tinh',tinh.ten_tinh);
    text=fs_replace_random_arr_text(text,'ten_xa_huyen',tinh.huyen_xa);
    text=fs_replace_random_arr_cua_hang_and_dia_chi(text,tinh.cua_hang,key_words);
    return text;
}
//
function get_random_array_text(arr){
    let a=sampleSize(arr,1);
    if(a.length>0){
        return a[0];
    }else{
        return ""
    }
}
function get_random_thumnail(arr){
    let a=sampleSize(arr,1);
    if(a.length>0){
        return a[0].img;
    }else{
        return ""
    }
}
function fs_replace_random_arr_cua_hang_and_dia_chi(text,arr,key_words_arr){// replace random mang chua text
    let array=[...[],...arr];
    while(text.search('ten_cua_hang')>-1){
        if(array.length>0){
            let a=sampleSize(array,1)[0];
            text=text.replace('ten_cua_hang',xu_ly_text_vs_keywords(a.ten,key_words_arr));
            text=text.replace('dia_chi_cua_hang',sampleSize(a.dia_chi,1)[0]);
            // xoa phan tu da thay o trong mang da lay
            let index=-1;
            array.forEach((e,i) => {
                if(e.ten==a.ten) index=i;
            });
            if(index!=-1) array.splice(index,1)
        }else{
            text=text.replace('ten_cua_hang','')
            text=text.replace('dia_chi_cua_hang','')
        }
    }
    text=fs_replace_all(text,'ten_cua_hang','')
    text=fs_replace_all(text,'dia_chi_cua_hang','')
    return text;
}
function fs_replace_random_arr_text(text,find,arr){// replace random mang chua text
    let array=[...[],...arr];
    while(text.search(find)>-1){
        if(array.length>0){
            let a=sampleSize(array,1)[0];
            text=text.replace(find,a);
            // xoa phan tu da thay o trong mang da lay
            let index=-1;
            array.forEach((e,i) => {
                if(e==a) index=i;
            });
            if(index!=-1) array.splice(index,1)
        }else{
            text=text.replace(find,'')
        }
        // 
        // text=text.replace(find,a)
    }
    return text;
}
function fs_replace_all(text,find,replace){
    return text.replace(new RegExp(find, 'g'), replace);
}
function xu_ly_text_vs_keywords(text,key_words_arr){
    key_words_arr.forEach(e => {
        let key=e.chu_de_short;
        let list_key=e.list_key;
        text=fs_replace_random_arr_text(text,key,list_key)
    });
    return text
}
 
   