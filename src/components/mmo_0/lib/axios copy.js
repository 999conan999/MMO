const axios = require('axios');
const { toast } =require ('react-toastify');
var url_home=window.url;
async function fs_axios_get(url,return_err){ // return_err => ARRAY ~~ OBJECT
    let data= await axios.get(url)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        // handle error
        if(return_err=='ARRAY') return [];
        return {};
    })
    return data;
}
let setup_url=url_home+'/wp-content/plugins/qc_landingpage/ajax/setup/update_setup.php'
export async function action_update_setup(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

            data_send.append(key,data[key]);

    });
    //
    let response= axios.post(setup_url, 
        data_send
    )
    .then(function (response) {
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
const url_get_setup=url_home+'/wp-content/plugins/qc_landingpage/ajax/setup/get_setup.php';
export async function get_setups(){
    let data= await axios.get(url_get_setup)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return {
            status:false
        };
    })
    return data;
}
let url_create_or_edit_page=url_home+'/wp-content/plugins/qc_landingpage/ajax/page/create_edit_page.php'
export async function action_create_or_edit_page(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

        data_send.append(key,data[key]);
        
    });
    //
    let response= axios.post(url_create_or_edit_page, 
        data_send
    )
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
const url_get_categorys=url_home+'/wp-content/plugins/qc_landingpage/ajax/page/get_categorys_pages.php';
export async function get_categorys_or_pages(id){
    let data= await axios.get(url_get_categorys+'?id='+id)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return [];
    })
    return data;
}
const url_get_page_infor=url_home+'/wp-content/plugins/qc_landingpage/ajax/page/get_page_info.php';
export async function get_page_info($id){
    let data= await axios.get(url_get_page_infor+'?id='+$id)
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
const url_delete_page=url_home+'/wp-content/plugins/qc_landingpage/ajax/page/delete_page.php';
export async function remove_page_by_id(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

            data_send.append(key,data[key]);

    });
    //
    let response= axios.post(url_delete_page, 
        data_send
    )
    .then(function (response) {
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
// const url_update_qc_fast=url_home+'/wp-content/plugins/qc_landingpage/ajax/page/editer_fast.php';
// export async function update_qc_fast(data){
//     let data_send=new FormData();
//     Object.keys(data).forEach(function(key) {

//             data_send.append(key,data[key]);

//     });
//     //
//     let response= axios.post(url_update_qc_fast, 
//         data_send
//     )
//     .then(function (response) {
//         console.log("🚀 ~ file: axios.js:121 ~ response", response)
//         return response.data.status;
//     })
//     .catch(function (error) {
//         console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
//         return false
//     })
//     return response;
// }
const url_get_img=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/get_imgs.php?page=';
export async function get_imgs(page){
    let url=url_get_img+page;
    return await fs_axios_get(url,'ARRAY');
}
// upload file 
const url_upload=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/upload_core.php';
export async function upload_core(data){
    let formData = new FormData();
    if(data.length>0){
        for(let i=0;i<data.length;i++){
            formData.append(i,data[i]);
        }
    }
    //
    let response= axios.post(url_upload, 
        formData
    )
    .then(function (response) {
        if(response.data.length>0){
            return response.data
        }else{
            return []
        }
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return []
    })
    return response;
}
const url_remove_img_by_id=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/delete.php';
export async function action_remove_img_by_id(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_img_by_id, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:183 ~ response", response)
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
const url_get_img_clone=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/get_imgs_clone.php';
export async function get_img_clone(page){
    let data= await axios.get(url_get_img_clone+'?page='+page)
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
const url_clone=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/addTextImg.php';
export async function clone_img(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

            data_send.append(key,data[key]);

    });
    //
    let response= axios.post(url_clone, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:220 ~ response", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
const url_remove_img_clone_by_id=url_home+'/wp-content/plugins/qc_landingpage/ajax/media/delete_img_clone.php';
export async function delete_img_clone(id){
    let data_send=new FormData();
    data_send.append('idN',id);
    let response= axios.post(url_remove_img_clone_by_id, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:183 ~ response", response)
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
const url_get_API_telegram=url_home+'/wp-content/plugins/qc_landingpage/ajax/order/get_API_telegram.php';
export async function get_API_telegram(){
    let data= await axios.get(url_get_API_telegram)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return {
            status:false
        };
    })
    return data;
}
let url_update_API_telegram=url_home+'/wp-content/plugins/qc_landingpage/ajax/order/update_API_telegram.php'
export async function action_update_API_telegram(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

            data_send.append(key,data[key]);

    });
    //
    let response= axios.post(url_update_API_telegram, 
        data_send
    )
    .then(function (response) {
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}
const url_get_orders=url_home+'/wp-content/plugins/qc_landingpage/ajax/order/get_orders.php';
export async function get_orders(){
    let data= await axios.get(url_get_orders)
    .then(function (response) {
        if(response.data==''){
            return []
        }
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return [];
    })
    return data;
}
const url_remove_order_by_id=url_home+'/wp-content/plugins/qc_landingpage/ajax/order/delete.php';
export async function delete__order_by_id(id){
    let data_send=new FormData();
    data_send.append('id',id);
    let response= axios.post(url_remove_order_by_id, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:183 ~ response", response)
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
const url_get_comment_admin=url_home+'/wp-content/plugins/qc_landingpage/ajax/comment/get_comment_admin.php?page=';
export async function get_comment_admin(page){
    let data= await axios.get(url_get_comment_admin+page)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return [];
    })
    return data;
}
let url_update_comment=url_home+'/wp-content/plugins/qc_landingpage/ajax/comment/update_comment.php'
export async function update_comment(data){
    let data_send=new FormData();
    Object.keys(data).forEach(function(key) {

        data_send.append(key,data[key]);
        
    });
    //
    let response= axios.post(url_update_comment, 
        data_send
    )
    .then(function (response) {
        // console.log("🚀 ~ file: axios.js:342 ~ response", response)
        return response.data;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return {}
    })
    return response;
}
const url_remove_comment_by_id=url_home+'/wp-content/plugins/qc_landingpage/ajax/comment/delete_comment.php';
export async function delete__comment_by_id(id,status,id_comment){
    let data_send=new FormData();
    data_send.append('id',id);
    data_send.append('status',status);
    data_send.append('id_comment',id_comment);
    let response= axios.post(url_remove_comment_by_id, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:183 ~ response", response)
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 97 ~ action_create_or_edit_post ~ error", error)
        return {
            status:false
        }
    })
    return response;
}
const url_get_cates_tool=url_home+'/wp-content/plugins/qc_landingpage/ajax/tool/get_cates_tool.php';
export async function get_cates_tool(){
    let data= await axios.get(url_get_cates_tool)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return [];
    })
    return data;
}
const url_add_posts_by_tool=url_home+'/wp-content/plugins/qc_landingpage/ajax/tool/add_posts_by_tool.php';
export async function add_posts_by_tool(data){
    let data_send=new FormData();
    data_send.append('data_list',data);
    // Object.keys(data).forEach(function(key) {

    //         data_send.append(key,data[key]);

    // });
    //
    let response= axios.post(url_add_posts_by_tool, 
        data_send
    )
    .then(function (response) {
        console.log("🚀 ~ file: axios.js:121 ~ response", response)
        return response.data.status;
    })
    .catch(function (error) {
        console.log("🚀 ~ file: axios.js ~ line 44 ~ action_create_or_edit_post ~ error", error)
        return false
    })
    return response;
}

const url_get_posts_sheet=url_home+'/wp-content/plugins/qc_landingpage/ajax/tool/get_posts.php';
export async function get_posts_sheet(id){
    let data= await axios.get(url_get_posts_sheet+'?id='+id)
    .then(function (response) {
        return response.data
    })
    .catch(function (error) {
        toast.error('ERROR!',{theme: "colored"})
        console.log(error)
        return [];
    })
    return data;
}