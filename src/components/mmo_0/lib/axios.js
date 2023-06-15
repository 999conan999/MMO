const axios = require('axios');
const { toast } =require ('react-toastify');
var url_home=window.url;
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