const axios = require('axios');
const { toast } =require ('react-toastify');
var url_home=window.url;
//
async function fs_gets(url){
    let data= await axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return false;
    })
    return data;
}
 // upload file
const url_upload=url_home+'/wp-content/themes/shopseo/templates/ajax/media/upload_core.php';
export async function upload_core(data,tag){
    console.log("🚀 ~ file: axios.js:7 ~ upload_core ~ tag:", tag)
    console.log("🚀 ~ file: axios.js:7 ~ upload_core ~ data:", data)
    const  formData = new FormData();
    if(data.length>0){
        for(let i=0;i<data.length;i++){
            formData.append(i,data[i]);
        }
        formData.append('tag',tag);

    }
    //
    let response= axios.post(url_upload, 
        formData
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:19 ~ response:", response);
        try{
            if(response.data.length>0){
                toast.success('Tải lên thành công!', { theme: "colored" })
                return response.data
            }else{
                return []
            }
        }catch(e){
            toast.error('Lỗi!', { theme: "colored" })
            return []
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return []
    })
    return response;
}
// get img all
const url_get_img=url_home+'/wp-content/themes/shopseo/templates/ajax/media/get_imgs.php?page=';
export async function get_imgs(page){
    let url=url_get_img+page;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// get img tag
const url_get_img_tag=url_home+'/wp-content/themes/shopseo/templates/ajax/media/get_imgs_tag.php?page=';
export async function get_imgs_tag(tag,page){
    let url=url_get_img_tag+page+'&tag='+tag;
    let data= await axios.get(url)
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:47 ~ response:", response)
        return response.data
    })
    .catch(function (error) {
        toast.error('Không lấy được hình ảnh!',{theme: "colored"})
        return [];
    })
    return data;
}
// delete img
const url_remove_img_by_id=url_home+'/wp-content/themes/shopseo/templates/ajax/media/delete.php';
export async function action_remove_img_by_id(id){
    let data_send=new FormData();
    data_send.append('id',id);
    let response= axios.post(url_remove_img_by_id, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
// delete img
const url_change_tag_img=url_home+'/wp-content/themes/shopseo/templates/ajax/media/change_tag.php';
export async function change_name_tag(id,tag){
    let data_send=new FormData();
    data_send.append('id',id);
    data_send.append('tag',tag);
    let response= axios.post(url_change_tag_img, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_create_or_edit_post=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/create_edit_post.php'
export async function action_create_or_edit_post(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_create_or_edit_post, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
const url_get_cate_v1=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/get_cate_v1.php';
export async function get_cate_v1(){
   return fs_gets(url_get_cate_v1)
}
const url_get_posts=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/get_posts.php';
export async function get_posts(id_category){
   let url=url_get_posts+"?id="+id_category;
   return fs_gets(url)
}
const url_get_infor_post=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/get_infor_post.php';
export async function get_infor_post(id_post){
   let url=url_get_infor_post+"?id="+id_post;
   return fs_gets(url)
}
//
let url_edit_quatity_sold=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/edit_quatity_sold.php'
export async function action_edit_quatity_sold(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_edit_quatity_sold, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_edit_related_keyword=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/edit_related_keyword.php'
export async function action_edit_related_keyword(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_edit_related_keyword, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_edit_status=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/edit_status.php'
export async function edit_status(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_edit_status, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_update_thumnail_post=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/update_thumnail_post.php'
export async function update_thumnail_post(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_thumnail_post, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_edit_is_best_seller=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/edit_is_best_seller.php'
export async function edit_is_best_seller(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_edit_is_best_seller, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_delete_post=url_home+'/wp-content/themes/shopseo/templates/ajax/posts/delete_post.php'
export async function delete_post(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_delete_post, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_edit_attributes=url_home+'/wp-content/themes/shopseo/templates/ajax/attributes/create_edit_attributes.php'
export async function create_edit_attributes(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_edit_attributes, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
const url_get_attribute_list_v2=url_home+'/wp-content/themes/shopseo/templates/ajax/attributes/get_attribute_list_v2.php';
export async function get_attribute_list_v2(){
   let url=url_get_attribute_list_v2;
   return fs_gets(url)
}
const url_get_attributes=url_home+'/wp-content/themes/shopseo/templates/ajax/attributes/get_attributes.php';
export async function get_attributes(){
   let url=url_get_attributes;
   return fs_gets(url)
}
const url_attributes_infor=url_home+'/wp-content/themes/shopseo/templates/ajax/attributes/get_attributes_infor.php';
export async function get_attributes_infor(id){
   let url=url_attributes_infor+"?id="+id;
   return fs_gets(url)
}
//
let url_delete_attribute=url_home+'/wp-content/themes/shopseo/templates/ajax/attributes/delete_attribute.php'
export async function delete_attribute(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_delete_attribute, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
const url_get_pages=url_home+'/wp-content/themes/shopseo/templates/ajax/pages/get_pages.php';
export async function get_pages(){
   let url=url_get_pages;
   return fs_gets(url)
}
//
let url_create_edit_category=url_home+'/wp-content/themes/shopseo/templates/ajax/terms/create_edit_category.php'
export async function action_create_edit_category(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_edit_category ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_create_edit_category, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_edit_category ~ error", error)
        return {}
    })
    return response;
}
const url_get_categorys=url_home+'/wp-content/themes/shopseo/templates/ajax/terms/get_categorys.php';
export async function get_categorys(){
   let url=url_get_categorys;
   return fs_gets(url)
}
//
const url_get_category_detail=url_home+'/wp-content/themes/shopseo/templates/ajax/terms/get_category_detail.php';
export async function get_category_detail(id){
   let url=url_get_category_detail+"?id="+id;
   return fs_gets(url)
}
//
//
let url_delete_category=url_home+'/wp-content/themes/shopseo/templates/ajax/terms/delete_cate.php'
export async function delete_category(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_delete_category, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
const url_get_list_sp=url_home+'/wp-content/themes/shopseo/templates/ajax/terms/get_list_sp.php';
export async function get_list_sp(id){
   let url=url_get_list_sp+"?id="+id;
   return fs_gets(url)
}
//
let url_update_setup=url_home+'/wp-content/themes/shopseo/templates/ajax/setups/update_setup.php'
export async function update_setup(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_update_setup ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_setup, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_edit_category ~ error", error)
        return {}
    })
    return response;
}
//
let url_get_setup=url_home+'/wp-content/themes/shopseo/templates/ajax/setups/get_setup.php'
export async function get_setup(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_get_setup ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_get_setup, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_edit_category ~ error", error)
        return {}
    })
    return response;
}
//
const url_get_comments=url_home+'/wp-content/themes/shopseo/templates/ajax/comments/get_comments.php';
export async function get_comments(id_post){
   let url=url_get_comments+"?id_post="+id_post;
   return fs_gets(url)
}
//
//
let url_update_status_com=url_home+'/wp-content/themes/shopseo/templates/ajax/comments/update_status_com.php'
export async function update_status_com(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_status_com, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
let url_update_comment_by_id_post=url_home+'/wp-content/themes/shopseo/templates/ajax/comments/update_comment_by_id_post.php'
export async function update_comment_by_id_post(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_comment_by_id_post, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
// delete img
const url_delete_by_id=url_home+'/wp-content/themes/shopseo/templates/ajax/comments/delete.php';
export async function action_delete_by_id(id){
    let data_send=new FormData();
    data_send.append('id',id);
    let response= axios.post(url_delete_by_id, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
//
const url_get_orders=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/get_orders.php';
export async function get_orders(){
   let url=url_get_orders;
   return fs_gets(url)
}
//
const url_delete_order_by_id=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/delete.php';
export async function action_delete_order_by_id(id){
    let data_send=new FormData();
    data_send.append('id',id);
    let response= axios.post(url_delete_order_by_id, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
//
let url_update_status_order=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/update_status_order.php'
export async function update_status_order(data){
    console.log("🚀 ~ file: axios.js:111 ~ action_create_or_edit_post ~ data:", data)
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_update_status_order, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
const url_get_order_by_phone=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/get_order_by_phone.php';
export async function search_sdt(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_get_order_by_phone, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
const url_action_update_telegram=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/update_telegram.php';
export async function action_update_telegram(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {
        data_send.append(key,data[key]);
    });
    //
    let response= axios.post(url_action_update_telegram, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response:", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
//
const url_count_order=url_home+'/wp-content/themes/shopseo/templates/ajax/orders/count_order.php';
export async function count_order(){
   let url=url_count_order;
   return fs_gets(url)
}