import React, { Component } from 'react';
import './tools.css'
import { Button, Input,Dropdown } from 'semantic-ui-react'
import sampleSize  from 'lodash.samplesize';
import { toast } from 'react-toastify';
import EditorWrap from '../Editer/editorwrap';
import {
  get_cates,
  get_imgs_tag,
  get_tags,
  get_posts,
  create_posts
} from '../lib/axios';
import {
  xu_ly_content
} from './fs'
const key={
  ten_tinh:"ten_tinh",
  ten_xa_huyen:"ten_xa_huyen",
  ten_cua_hang:"ten_cua_hang",
  dia_chi_cua_hang:"dia_chi_cua_hang"
}
export default class Tools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      is_open_media: false,
      selected: "",
      data: {
        long_des: [
          // {
          //   id:'l0',
          //   tag:"table",
          //   text:'<table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 33.2896%;"><col style="width: 33.2896%;"><col style="width: 33.2896%;"></colgroup> <tbody> <tr> <td>Loại giường</td> <td>Kích thước</td> <td>Giá</td> </tr> <tr> <td>loai_giuong</td> <td>kich_thuoc</td> <td>gia_tien</td> </tr> <tr> <td>loai_giuong</td> <td>kich_thuoc</td> <td>gia_tien</td> </tr> <tr> <td>loai_giuong</td> <td>kich_thuoc</td> <td>gia_tien</td> </tr> </tbody> </table>',
          // },
          // {
          //   id:'l1',
          //   tag:"h2",
          //   text:"h2 l1",
          //   data:[
          //     {
          //       id:'l3',
          //       tag:'p',
          //       text:"p l2",
          //     },
          //     {
          //       id:'l4',
          //       tag:"h3",
          //       text:"h3 l2",
          //       data:[
          //         {
          //           id:'l11',
          //           tag:"p",
          //           text:"p l3"
          //         },
          //         {
          //           id:'l12',
          //           tag:"img",
          //           text:"img l3"
          //         },
          //         {
          //           id:'l14',
          //           tag:"quote",
          //           text:"quote l3"
          //         }
          //       ]
          //     },
          //     {
          //       id:'l5',
          //       tag:"table",
          //       text:'table l2'
          //     },
          //     {
          //       id:'l6',
          //       tag:"p",
          //       text:'p l2'
          //     },
          //     {
          //       id:'l7',
          //       tag:"quote",
          //       text:'quote l2'
          //     }
          //   ]
          // },
          // {
          //   id:'l2',
          //   tag:"h3",
          //   text:"h3 l1",
          //   data:[
          //     {
          //       id:'l8',
          //       tag:"p",
          //       text:"p l2"
          //     },
          //     {
          //       id:'l9',
          //       tag:"img",
          //       text:"img l2"
          //     },
          //     {
          //       id:'l10',
          //       tag:"quote",
          //       text:"quote l2"
          //     }
          //   ]
          // },
        ],
        title:[],
        short_des:[],
        imgs:[],
        key_words:[
          {
            id:this.makeid(5),
            chu_de_short:"key_word",
            chu_de:"key_word",
            text_key:"",
            list_key:[]
          }
        ],
        tag_img:'',
        selected_cate:{
          key:-1,
          text:"",
          value:-1
        },
        url_target:"",
        list_sp:[]
      },
      list_tinh:[
        {
          id:'sda',
          ten_tinh:"Gia Lai",
          huyen_xa:[
            "Thị xã Ayun Pa",
            "Thị xã An Khê",
            "Phú Thiện"
          ],
          cua_hang:[
            {
              ten:"Nội Thất An Bình, chuyên key_word",
              sp:"giường sắt",
              lien_he:"0963226771",
              dia_chi:[
                "34 Nhất Chi Mai, Tân Bình, Gia Lai",
                "60 Ngô Đức Kế, Thị Xã sông bờ, Gia Lai"
              ]
            },
            {
              ten:"Nội Thất Hoàng Anh, key_word",
              sp:"giường sắt",
              lien_he:"0963226771",
              dia_chi:[
                "54 Ngô Quyền, thị xã Ayun Pa, Gia Lai",
                "54 Tôn Đức Thắng, SÔng bờ, gia Lai"
              ]
            },
          ]
        },
        {
          id:'xxa',
          ten_tinh:"Bình Định",
          huyen_xa:[
            "Thị xã Phù Mỹ",
            "Thị xã Mỹ Chánh",
            "Phù Cát"
          ],
          cua_hang:[
            {
              ten:"Nội Thất An Bình Định, chuyên key_word",
              sp:"giường sắt",
              lien_he:"0963226771",
              dia_chi:[
                "54 Ngô Quyền, thị xã Ayun Pa, Bình Định",
                "60 Ngô Đức Kế, Thị Xã sông bờ,Bình Định"
              ]
            },
            {
              ten:"Nội Thất An Bình Bình, chuyên key_word",
              sp:"giường sắt",
              lien_he:"0963226771",
              dia_chi:[
                "54 Ngô Quyền, thị xã Ayun Pa,Bình Định",
                "60 Ngô Đức Kế, Thị Xã sông bờ, Bình Định"
              ]
            },
          ]
        },
      ],
      category:[
        // {
        //   id:0,
        //   title:'Giường sắt',
        //   thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/ban-hoc-mau-hong-nhua-dai-loan-day-1m.jpg',
        //   link:"#",
        //   short_des:'Bàn học đôi dành cho 2 bé ngồi học, bàn có liền kệ sách. Được làm bằng nhựa cao cấp, giá thành rẻ đang được ưa chuộng trên thị trường. Bàn học có màu xanh dương, màu hồng và màu trắng dành cho bé gái. Được sử dụng để học tập và làm việc. Kích thước ngang 1m4. Phù hợp với mọi lứa tuổi, học sinh tiểu học, mẫu giáo. Bộ bàn ghế học sinh có kệ sách bằng nhựa rất đẹp. Hiện tại, chúng tôi hỗ trợ sản phẩm bàn học đôi cho bé tra và gái tại HCM, Bình Dương, Thủ Đức, Gò Vấp, Tân Phú, Tân bình, Bình Thành, Dĩ An, Các Quận HCM.',
        //   long_des:'<h2>Thông tin chi tiết về chúng tôi?</h2> <ul> <li>Chúng tôi hiện tại chuyên cung cấp 2 loại tủ đựng quần áo chính đó là: <strong>Tủ sắt</strong> và <strong>tủ nhựa Đài Loan</strong>.</li> <li>Giá tủ sẽ phụ thuộc vào kích thước ( chúng ta sẽ tìm hiểu chi tiết ngay ở dưới).</li> <li>Cách tính vận chuyển như thế nào?</li> </ul> <p>Hiện tại, phần lớn tất <strong>cả các loại tủ sẽ được miễn phí vận chuyển</strong> tại khu vực Hồ Chí Minh <strong>trong vòng bán kính 15km</strong> so với địa chỉ : <span style="color: rgb(224, 62, 45);">Số nhà 19, đường số 17,quốc lộ 13 cũ, Hiệp Bình Phước, Quận Thủ Đức,tpHCM</span> , ngoài khoản cách đó chúng tôi sẽ tính giá vận chuyển 5k/1km.</p> <p>Ví dụ: Đại Loại như vầy, chúng tôi sẽ miễn phí vận chuyển trong vòng 15km, ví dụ bạn ở vị trí 17km, thì vận chuyển là 10k (17km-15km=2km)x5=10k; trong trường hợp này, ví dụ vận chuyển dưới 50k thì coi như chúng tôi hỗ trợ luôn, miễn phí, nếu tính vượt qua 50k thì chúng tôi sẽ tính.</p> <ul> <li>Tủ cofa tập trung cung cấp tủ ở khu vực nào?</li> </ul> <p>Dưới đây là những khu vực <strong>vận chuyển miễn phí</strong> và những khu vực <strong>vận chuyển có thể sẽ có tính phí </strong>như sau:</p> <p><strong>*khu vực miễn phí vận chuyển</strong>:</p> <p>+ <strong>Tại Hồ Chí Minh</strong>: Thủ Đức, Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 9, Quận 10, Quận 12, Quận Phú Nhuận, Quận Tân Bình, Quận Bình Tân, Quận Bình Thạnh.</p> <p>+ <strong>Bình Dương</strong>&nbsp; : Dĩ An, Thuận An.</p> <p><br>*&nbsp;<strong>khu vực có thể tính phí vận chuyển:</strong></p> <p><strong>+ Tại Hồ Chí Minh:</strong> Quận 7, Quận 7, Quận 7, Bình Chánh.</p> <p>+ <strong>Bình Dương</strong>: Thủ Dầu Một, Tân Uyên.</p> <p>+ <strong>HÓc Môn</strong>.</p> <ul> <li>Thời gian giao hàng: tùy theo bên kho, hàng có sẵn có thể giao trong ngày, còn hàng không có sẵn thì 1-2 ngày là có thể giao qua được. các loại hàng đặt thì tầm 2-3 ngày làm xong sẽ giao qua. có thể giao được buổi tối, tất cả các ngày trong tuần.</li> <li>Đặt hàng thì cần cọc trước, tùy theo giá trị mà 200k đến 1tr.</li> </ul> <h2>Thông tin chi tiết về các mẫu tủ như sau:</h2> <p><span style="font-size: 12pt;"><strong>*Tủ sắt:</strong></span></p> <ul> <li><span style="font-size: 12pt;">+ Tủ sắt sẽ có 3 loại đó là: <strong>tủ sắt giá rẻ(<span style="color: rgb(224, 62, 45);">tủ sắt sơn dầu</span>), Tủ sắt giá tầm trung(<span style="color: rgb(224, 62, 45);">tủ sắt sơn tĩnh điện</span>), và tủ sắt cao cấp(<span style="color: rgb(224, 62, 45);">Tủ sắt Trung Hưng</span>).</strong></span></li> <li><span style="font-size: 12pt;">+ Trong đó, <strong>tủ sắt sơn dầu</strong> và <strong>tủ sắt sơn tĩnh điện</strong> là 2 loại tủ có kiểu dáng, thiết kế giống nhau y hệt, <strong>khác mỗi loại sơn và độ dày sắt.</strong></span></li> <li><span style="font-size: 12pt;">+ Tủ sắt Trung Hưng là 1 dòng tủ sắt cao cấp khác, loại này thì xịn hơn, giành cho người có tiền muốn đẹp, sang trọng và dùng bền.</span></li> <li><span style="font-size: 12pt;"><em>+ Trong phần tủ sắt này,&nbsp;<strong>tủ sắt giá rẻ</strong> là loại tủ được hỏi mua nhiều, bởi vì giá rẻ thích hợp cho sinh viên, học sinh, người lao động.</em>&nbsp;</span></li> </ul> <p><span style="font-size: 12pt;"><strong>*Đặc điểm chi tiết như sau:</strong></span></p> <p><strong><span style="font-size: 12pt;">*<em> </em><em>Ở phần này, sẽ đề cập tủ sắt sơn dầu và sơn tĩnh điện chung để có thể hiểu rõ hơn:</em></span></strong></p> <p>+ 2 mẫu này nhìn chung thì thiết kế và kiểu dáng giống y hệt nhau, nó khác nhau mỗi đặc điểm loại sơn khác nhau, tủ sơn dầu là loại tủ sơn giá rẻ, kiểu phun lên, Còn sơn tĩnh điện thì sẽ hấp phủ sơn. ( Đơn giản có thể hiểu là sơn tĩnh điện mắc hơn).</p> <p>+ Về chất liệu sắt thì cả 2 đều làm bằng sắt mỏng, tủ giá rẻ sơn dầu thì làm sắt mỏng hơn (sắt dày 3zem). Tủ sơn tĩnh điện thì làm dày 4zem, 2 loại này cũng không hơn kém nhau gì lắm. <span style="color: rgb(53, 152, 219);">Thông thường khi tư vấn cũng không có đề cập đến vấn đề này. Vì nó mỏng, nên chỉ nói đơn giản là tủ này thuộc loại tủ BÌnh Dân giá rẻ, sắt cũng vừa dùng chứ không có dày như loại cao cấp được.</span></p> <p>+ xem hình ảnh thực tế để có cái nhìn rõ hơn:</p> <figure><img title="Hình ảnh bên ngoài của tủ sơn dầu" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-2-canh-dung-quan-ao.jpg" alt="Hình ảnh bên ngoài của tủ sơn dầu"> <figcaption>Hình ảnh bên ngoài của tủ sơn dầu</figcaption> </figure> <p>&nbsp;</p> <figure><img title="HÌnh ảnh bên ngoài của tủ sơn tĩnh điện" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-2-canh-son-tinh-dien.jpg" alt="HÌnh ảnh bên ngoài của tủ sơn tĩnh điện"> <figcaption>HÌnh ảnh bên ngoài của tủ sơn tĩnh điện</figcaption> </figure> <p>+ Nhìn 2 bức hình trên qua hình ảnh nó chả khác nhau tí nào, nhìn thực tế mới thấy được rõ, nhìn thực tế thì tủ sơn bằng sơn tĩnh điện sẽ có màu sắc rõ nét và đẹp, nhìn chắc chắn hơn.&nbsp;</p> <p>+ Vậy bây giờ nhìn bên trong tủ xem sẽ thấy khác nhau như thế nào:</p> <figure><img title="Bên trong tủ sơn dầu" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-quan-ao-2-canh.jpg" alt="Bên trong tủ sơn dầu"> <figcaption>Bên trong tủ sơn dầu</figcaption> </figure> <p>&nbsp;</p> <figure><img title="Bên trong tủ sơn tĩnh điện" src="https://cofa.vn/wp-content/uploads/2022/09/tu-tinh-dien-2-canh-mau-xanh.jpg" alt="Bên trong tủ sơn tĩnh điện"> <figcaption>Bên trong tủ sơn tĩnh điện</figcaption> </figure> <p>+ Giờ ta sẽ thấy sự khác nhau rõ nét, thông thường&nbsp;<strong>tủ sơn dầu</strong> được hỏi mua nhiều hơn, giá rẻ hơn, với lại khách hỏi mua tủ giá rẻ là họ chỉ cần tủ&nbsp;<strong>giá phải rẻ</strong> , vấn đề tủ tốt hơn hay như thế nào họ sẽ không quan tâm lắm đâu. Chúng ta sẽ tư vấn bình thường, miễn sao phù hợp với nhu cầu của khách hàng là được.</p> <p>+ 2 loại này giá thành thường chênh lệch nhau, tủ tĩnh điện giá thường gần gấp đôi tủ sơn dầu.</p> <p><strong>* Chi tiết giá thành và kích thước của từng loại:</strong></p> <p>+<span style="color: rgb(224, 62, 45);"><strong> Như đã nói ở trên, tủ 2 loại tủ này có kích thước và kiểu dáng giống nhau</strong></span>:&nbsp;</p> <p><strong>Ta có bảng giá như sau:</strong></p> <table style="border-collapse: collapse; width: 100%; height: 78.3752px;" border="1"><colgroup><col style="width: 33.3628%;"><col style="width: 33.3628%;"><col style="width: 33.2743%;"></colgroup> <tbody> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">Kích thước</td> <td style="height: 19.5938px;">Tủ sơn Dầu</td> <td style="height: 19.5938px;">Tủ Sơn Tĩnh điện</td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 90cm x cao 1m6</td> <td style="height: 19.5938px;">750.000&nbsp;đ</td> <td style="height: 19.5938px;">1.600.000&nbsp;đ</td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 90cm x cao 1m8</td> <td style="height: 19.5938px;">850.000&nbsp;đ</td> <td><span class="insi">1.700.000&nbsp;đ</span></td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 1m15 x cao 1m8</td> <td><span class="insi">1.250.000&nbsp;đ</span></td> <td style="height: 19.5938px;">2.450.000&nbsp;đ</td> </tr> </tbody> </table> <figure><img title="Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8" src="https://cofa.vn/wp-content/uploads/2022/09/Tu-sat-dung-quan-ao-2-canh-son-dau-gia-re-1.jpg" alt="Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8"> <figcaption>Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8</figcaption> </figure> <figure><img title="Tủ ngang 1m15 x cao 1m8 như hình" src="https://cofa.vn/wp-content/uploads/2022/09/tu-quan-ao-3-canh-gia-re.jpg" alt="Tủ ngang 1m15 x cao 1m8 như hình"> <figcaption>Tủ ngang 1m15 x cao 1m8 như hình</figcaption> </figure> <blockquote> <p>Cofa sẽ tập trung bán chính <strong>tủ sắt sơn dầu</strong>, loại tủ này giá thành rẻ dễ bán.</p> </blockquote> <p>&nbsp;</p> <p>&nbsp;</p>',
        //   parent_category:-1,
        // },
        // {
        //   id:1,
        //   title:'Giường sát giá rẻ',
        //   thumnail:'https://anbinhnew.com/wp-content/uploads/2021/01/giuong-sat-gia-re-mau-xanh-300x300.jpg',
        //   link:"#",
        //   short_des:'Bàn học đôi dành cho 2 bé ngồi học, bàn có liền kệ sách. Được làm bằng nhựa cao cấp, giá thành rẻ đang được ưa chuộng trên thị trường. Bàn học có màu xanh dương, màu hồng và màu trắng dành cho bé gái. Được sử dụng để học tập và làm việc. Kích thước ngang 1m4. Phù hợp với mọi lứa tuổi, học sinh tiểu học, mẫu giáo. Bộ bàn ghế học sinh có kệ sách bằng nhựa rất đẹp. Hiện tại, chúng tôi hỗ trợ sản phẩm bàn học đôi cho bé tra và gái tại HCM, Bình Dương, Thủ Đức, Gò Vấp, Tân Phú, Tân bình, Bình Thành, Dĩ An, Các Quận HCM.',
        //   long_des:'<h2>Thông tin chi tiết về chúng tôi?</h2> <ul> <li>Chúng tôi hiện tại chuyên cung cấp 2 loại tủ đựng quần áo chính đó là: <strong>Tủ sắt</strong> và <strong>tủ nhựa Đài Loan</strong>.</li> <li>Giá tủ sẽ phụ thuộc vào kích thước ( chúng ta sẽ tìm hiểu chi tiết ngay ở dưới).</li> <li>Cách tính vận chuyển như thế nào?</li> </ul> <p>Hiện tại, phần lớn tất <strong>cả các loại tủ sẽ được miễn phí vận chuyển</strong> tại khu vực Hồ Chí Minh <strong>trong vòng bán kính 15km</strong> so với địa chỉ : <span style="color: rgb(224, 62, 45);">Số nhà 19, đường số 17,quốc lộ 13 cũ, Hiệp Bình Phước, Quận Thủ Đức,tpHCM</span> , ngoài khoản cách đó chúng tôi sẽ tính giá vận chuyển 5k/1km.</p> <p>Ví dụ: Đại Loại như vầy, chúng tôi sẽ miễn phí vận chuyển trong vòng 15km, ví dụ bạn ở vị trí 17km, thì vận chuyển là 10k (17km-15km=2km)x5=10k; trong trường hợp này, ví dụ vận chuyển dưới 50k thì coi như chúng tôi hỗ trợ luôn, miễn phí, nếu tính vượt qua 50k thì chúng tôi sẽ tính.</p> <ul> <li>Tủ cofa tập trung cung cấp tủ ở khu vực nào?</li> </ul> <p>Dưới đây là những khu vực <strong>vận chuyển miễn phí</strong> và những khu vực <strong>vận chuyển có thể sẽ có tính phí </strong>như sau:</p> <p><strong>*khu vực miễn phí vận chuyển</strong>:</p> <p>+ <strong>Tại Hồ Chí Minh</strong>: Thủ Đức, Quận 1, Quận 2, Quận 3, Quận 4, Quận 5, Quận 9, Quận 10, Quận 12, Quận Phú Nhuận, Quận Tân Bình, Quận Bình Tân, Quận Bình Thạnh.</p> <p>+ <strong>Bình Dương</strong>&nbsp; : Dĩ An, Thuận An.</p> <p><br>*&nbsp;<strong>khu vực có thể tính phí vận chuyển:</strong></p> <p><strong>+ Tại Hồ Chí Minh:</strong> Quận 7, Quận 7, Quận 7, Bình Chánh.</p> <p>+ <strong>Bình Dương</strong>: Thủ Dầu Một, Tân Uyên.</p> <p>+ <strong>HÓc Môn</strong>.</p> <ul> <li>Thời gian giao hàng: tùy theo bên kho, hàng có sẵn có thể giao trong ngày, còn hàng không có sẵn thì 1-2 ngày là có thể giao qua được. các loại hàng đặt thì tầm 2-3 ngày làm xong sẽ giao qua. có thể giao được buổi tối, tất cả các ngày trong tuần.</li> <li>Đặt hàng thì cần cọc trước, tùy theo giá trị mà 200k đến 1tr.</li> </ul> <h2>Thông tin chi tiết về các mẫu tủ như sau:</h2> <p><span style="font-size: 12pt;"><strong>*Tủ sắt:</strong></span></p> <ul> <li><span style="font-size: 12pt;">+ Tủ sắt sẽ có 3 loại đó là: <strong>tủ sắt giá rẻ(<span style="color: rgb(224, 62, 45);">tủ sắt sơn dầu</span>), Tủ sắt giá tầm trung(<span style="color: rgb(224, 62, 45);">tủ sắt sơn tĩnh điện</span>), và tủ sắt cao cấp(<span style="color: rgb(224, 62, 45);">Tủ sắt Trung Hưng</span>).</strong></span></li> <li><span style="font-size: 12pt;">+ Trong đó, <strong>tủ sắt sơn dầu</strong> và <strong>tủ sắt sơn tĩnh điện</strong> là 2 loại tủ có kiểu dáng, thiết kế giống nhau y hệt, <strong>khác mỗi loại sơn và độ dày sắt.</strong></span></li> <li><span style="font-size: 12pt;">+ Tủ sắt Trung Hưng là 1 dòng tủ sắt cao cấp khác, loại này thì xịn hơn, giành cho người có tiền muốn đẹp, sang trọng và dùng bền.</span></li> <li><span style="font-size: 12pt;"><em>+ Trong phần tủ sắt này,&nbsp;<strong>tủ sắt giá rẻ</strong> là loại tủ được hỏi mua nhiều, bởi vì giá rẻ thích hợp cho sinh viên, học sinh, người lao động.</em>&nbsp;</span></li> </ul> <p><span style="font-size: 12pt;"><strong>*Đặc điểm chi tiết như sau:</strong></span></p> <p><strong><span style="font-size: 12pt;">*<em> </em><em>Ở phần này, sẽ đề cập tủ sắt sơn dầu và sơn tĩnh điện chung để có thể hiểu rõ hơn:</em></span></strong></p> <p>+ 2 mẫu này nhìn chung thì thiết kế và kiểu dáng giống y hệt nhau, nó khác nhau mỗi đặc điểm loại sơn khác nhau, tủ sơn dầu là loại tủ sơn giá rẻ, kiểu phun lên, Còn sơn tĩnh điện thì sẽ hấp phủ sơn. ( Đơn giản có thể hiểu là sơn tĩnh điện mắc hơn).</p> <p>+ Về chất liệu sắt thì cả 2 đều làm bằng sắt mỏng, tủ giá rẻ sơn dầu thì làm sắt mỏng hơn (sắt dày 3zem). Tủ sơn tĩnh điện thì làm dày 4zem, 2 loại này cũng không hơn kém nhau gì lắm. <span style="color: rgb(53, 152, 219);">Thông thường khi tư vấn cũng không có đề cập đến vấn đề này. Vì nó mỏng, nên chỉ nói đơn giản là tủ này thuộc loại tủ BÌnh Dân giá rẻ, sắt cũng vừa dùng chứ không có dày như loại cao cấp được.</span></p> <p>+ xem hình ảnh thực tế để có cái nhìn rõ hơn:</p> <figure><img title="Hình ảnh bên ngoài của tủ sơn dầu" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-2-canh-dung-quan-ao.jpg" alt="Hình ảnh bên ngoài của tủ sơn dầu"> <figcaption>Hình ảnh bên ngoài của tủ sơn dầu</figcaption> </figure> <p>&nbsp;</p> <figure><img title="HÌnh ảnh bên ngoài của tủ sơn tĩnh điện" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-2-canh-son-tinh-dien.jpg" alt="HÌnh ảnh bên ngoài của tủ sơn tĩnh điện"> <figcaption>HÌnh ảnh bên ngoài của tủ sơn tĩnh điện</figcaption> </figure> <p>+ Nhìn 2 bức hình trên qua hình ảnh nó chả khác nhau tí nào, nhìn thực tế mới thấy được rõ, nhìn thực tế thì tủ sơn bằng sơn tĩnh điện sẽ có màu sắc rõ nét và đẹp, nhìn chắc chắn hơn.&nbsp;</p> <p>+ Vậy bây giờ nhìn bên trong tủ xem sẽ thấy khác nhau như thế nào:</p> <figure><img title="Bên trong tủ sơn dầu" src="https://cofa.vn/wp-content/uploads/2022/09/tu-sat-quan-ao-2-canh.jpg" alt="Bên trong tủ sơn dầu"> <figcaption>Bên trong tủ sơn dầu</figcaption> </figure> <p>&nbsp;</p> <figure><img title="Bên trong tủ sơn tĩnh điện" src="https://cofa.vn/wp-content/uploads/2022/09/tu-tinh-dien-2-canh-mau-xanh.jpg" alt="Bên trong tủ sơn tĩnh điện"> <figcaption>Bên trong tủ sơn tĩnh điện</figcaption> </figure> <p>+ Giờ ta sẽ thấy sự khác nhau rõ nét, thông thường&nbsp;<strong>tủ sơn dầu</strong> được hỏi mua nhiều hơn, giá rẻ hơn, với lại khách hỏi mua tủ giá rẻ là họ chỉ cần tủ&nbsp;<strong>giá phải rẻ</strong> , vấn đề tủ tốt hơn hay như thế nào họ sẽ không quan tâm lắm đâu. Chúng ta sẽ tư vấn bình thường, miễn sao phù hợp với nhu cầu của khách hàng là được.</p> <p>+ 2 loại này giá thành thường chênh lệch nhau, tủ tĩnh điện giá thường gần gấp đôi tủ sơn dầu.</p> <p><strong>* Chi tiết giá thành và kích thước của từng loại:</strong></p> <p>+<span style="color: rgb(224, 62, 45);"><strong> Như đã nói ở trên, tủ 2 loại tủ này có kích thước và kiểu dáng giống nhau</strong></span>:&nbsp;</p> <p><strong>Ta có bảng giá như sau:</strong></p> <table style="border-collapse: collapse; width: 100%; height: 78.3752px;" border="1"><colgroup><col style="width: 33.3628%;"><col style="width: 33.3628%;"><col style="width: 33.2743%;"></colgroup> <tbody> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">Kích thước</td> <td style="height: 19.5938px;">Tủ sơn Dầu</td> <td style="height: 19.5938px;">Tủ Sơn Tĩnh điện</td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 90cm x cao 1m6</td> <td style="height: 19.5938px;">750.000&nbsp;đ</td> <td style="height: 19.5938px;">1.600.000&nbsp;đ</td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 90cm x cao 1m8</td> <td style="height: 19.5938px;">850.000&nbsp;đ</td> <td><span class="insi">1.700.000&nbsp;đ</span></td> </tr> <tr style="height: 19.5938px;"> <td style="height: 19.5938px;">ngang 1m15 x cao 1m8</td> <td><span class="insi">1.250.000&nbsp;đ</span></td> <td style="height: 19.5938px;">2.450.000&nbsp;đ</td> </tr> </tbody> </table> <figure><img title="Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8" src="https://cofa.vn/wp-content/uploads/2022/09/Tu-sat-dung-quan-ao-2-canh-son-dau-gia-re-1.jpg" alt="Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8"> <figcaption>Tủ sắt ngang 90cm x cao 1m6 như hình, cao 1m8 thì cũng y hình đó nhưng mà cao 1m8</figcaption> </figure> <figure><img title="Tủ ngang 1m15 x cao 1m8 như hình" src="https://cofa.vn/wp-content/uploads/2022/09/tu-quan-ao-3-canh-gia-re.jpg" alt="Tủ ngang 1m15 x cao 1m8 như hình"> <figcaption>Tủ ngang 1m15 x cao 1m8 như hình</figcaption> </figure> <blockquote> <p>Cofa sẽ tập trung bán chính <strong>tủ sắt sơn dầu</strong>, loại tủ này giá thành rẻ dễ bán.</p> </blockquote> <p>&nbsp;</p> <p>&nbsp;</p>',
        //   parent_category:0,
        // },
      ],
      tags:[],
      selected_cate:-1,
      data_rs:[],
      is_lock:false,
      index_rs:0,
      triger_editer:0,
      selected_page:{
        content_html:'',
        type:'',
        i:-1,
        j:-1,
        x:-1
      },
      data_in:{is_open:false, type_editer:'html', des:'Thêm html'},
      selected_img:{ type:'' },
      text_img_selected:'',
      kq_list:[],
      is_lock_run:false
    }
  }

  async componentDidMount() {
    let a=await get_cates()
    console.log("🚀 ~ file: tools.js:221 ~ Tools ~ componentDidMount ~ a:", a)
    try{
      if(a.length>0){
        this.setState({category:a})
      }
    }catch(e){
      console.log("🚀 ~ file: tools.js:224 ~ Tools ~ componentDidMount ~ e:", e)
    }
    let b=await get_tags();
    console.log("🚀 ~ file: tools.js:229 ~ Tools ~ componentDidMount ~ b:", b)
    try{
      if(b.length>0){
        this.setState({tags:b})
      }
    }catch(e){
      console.log("🚀 ~ file: tools.js:224 ~ Tools ~ componentDidMount ~ e:", e)
    }
  }

  render() {
    let { selected, data,is_lock_run, tags,list_tinh,category,is_lock,index_rs,data_rs,data_in,triger_editer,selected_page} = this.state
    // console.log("🚀 ~ file: tools.js:251 ~ Tools ~ render ~ data:", data)
    let input_long_des = this.show_input_long_des(data.long_des)
    return (
      <React.Fragment>
        <div className='locals'>
          <a
            onClick={async()=>{
              if(window.confirm("Xác nhận thay thế bằng data đã lưu!")){
                let data_local=await localStorage.getItem("data_keywords");
                let text_img_selected=await localStorage.getItem("text_img_selected");
                text_img_selected=text_img_selected==null?"":text_img_selected;
                if(data_local!=null){
                  data_local=JSON.parse(data_local);
                  this.setState({data:data_local,text_img_selected:text_img_selected});
                  toast.success(`cập nhật thành công}`,{theme: "colored"})
                }else{
                  toast.error(`Lấy dữ liệu FAIL!}`,{theme: "colored"})
                }
              }
            }}
          >Get local</a>
          <a
            onClick={()=>{
              let {data,text_img_selected}=this.state;
              window.is_editer=false;
              if(window.confirm("Xác nhận lưu lại!")){
                localStorage.setItem("data_keywords", JSON.stringify(data));
                localStorage.setItem("text_img_selected", text_img_selected);
                toast.success(`cập nhật thành công}`,{theme: "colored"})
              }
            }}
          >Set local</a>
        </div>
        <div className='containerx'>
          <div className='row'>
            <div className='col-6' style={{paddingTop:"46px"}}>
                <Dropdown  selection search
                  value={data.selected_cate.key}
                  options={category}
                  onChange={async(e,{value}) => {
                    let {data}=this.state;
                    let a=category.filter((item)=>item.key==value);
                    if(a.length>0){
                      let rs=await get_posts(value);
                      console.log("🚀 ~ file: tools.js:292 ~ rs:", rs)
                      try{
                        if(rs.length>0){
                          //
                          data.list_sp=rs;
                          //
                          data.selected_cate=a[0];
                          data.url_target=a[0].link;
                          this.setState({data:data})
                        }
                      }catch(e){
                        console.log("🚀 ~ file: tools.js:298 ~ onChange={async ~ e:", e)
                      }
                    }
                  }}
                />
            </div>
          </div>
        </div>
        <div className='containerx mt-3'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={selected == "title" ? 'nav-link acc cs re' : 'nav-link cs re'}
                onClick={() => this.setState({ selected: 'title' })}
              >Tiêu đề<span className='showc'>{data.title.length}</span></a>
            </li>
            <li className="nav-item">
              <a className={selected == "short_des" ? 'nav-link acc cs re' : 'nav-link cs re'}
                onClick={() => this.setState({ selected: 'short_des' })}
              >Mô tả ngắn<span className='showc'>{data.short_des.length}</span></a>
            </li>
            <li className="nav-item">
              <a className={selected == "picture" ? 'nav-link acc cs re' : 'nav-link cs re'}
                onClick={() => this.setState({ selected: 'picture' })}
              >Hình ảnh<span className='showc'>{data.imgs.length}</span></a>
            </li>
            <li className="nav-item">
              <a className={selected == "long_des" ? 'nav-link acc cs re' : 'nav-link cs re'}
                onClick={() => this.setState({ selected: 'long_des' })}
              >Mô tả dài<span className='showc'>{data.long_des.length}</span></a>
            </li>

          </ul>
        </div>
        <div className='containerx'>
          <div className='row uiuix'>
            <div className='col-6'>
              {/* mo ta dai */}
              {selected == "long_des" && <div className='wrap-s scr' style={{paddingBottom:"55vh"}}>

                <div>
                  {input_long_des}
                </div>
              </div>}
              {/* tieu de */}
              {selected == "title" && <div className='wrap-s scr'>
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary btn-primaryx"
                  onClick={()=>{
                    let {data}=this.state;
                    data.title.unshift("")
                    this.setState({data:data})
                    toast.success('Thêm thành công!', { theme: "colored" })
                  }}
                  ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm tiêu đề</span></button>
                </div>
                <div>
                  {
                    data.title.map((e,i)=>{
                      return <div className="input-group mb-3 mt-3 re" key={i}>
                      <span className={e.length>0?"input-group-text key-active":"input-group-text"}>Tiêu đề {i+1}:</span>
                      <input type="text" className="form-control" placeholder="..." 
                        value={e}
                        onChange={(e)=>{
                          let {data}=this.state;
                          if(e.target.value.search('ten_cua_hang')==-1&&e.target.value.search('dia_chi_cua_hang')==-1){
                            data.title[i]=e.target.value;
                            this.setState({data:data})
                          }else{
                            toast.error(`Không nên để tên cửa hàng hoặc địa chỉ trên này.`, { theme: "colored" })
                          }

                        }}
                      />
                      <div className="icon-xxxz"
                        onClick={()=>{
                          if(window.confirm(`Xác nhận xóa! : "${e}"`)){
                            let {data}=this.state;
                            data.title.splice(i,1);
                            this.setState({data:data})
                          }
                        }}
                      ><i className="fa-solid fa-circle-xmark"></i></div>
                    </div>
                    })
                  }

                </div>
              </div>}
              {/* Mô tả */}
              {selected == "short_des" && <div className='wrap-s scr'>
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary btn-primaryx"
                      onClick={()=>{
                        let {data}=this.state;
                        data.short_des.unshift("")
                        this.setState({data:data});
                        toast.success('Thêm thành công!', { theme: "colored" })
                      }}
                  ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm mô tả ngắn</span></button>
                </div>
                <div>
                {
                    data.short_des.map((e,i)=>{
                      return <div className="form-floating mt-3 re">
                      <textarea className="form-control" style={{ height: '100px' }}
                        value={e}
                        onChange={(e)=>{
                          let {data}=this.state;
                          data.short_des[i]=e.target.value;
                          this.setState({data:data})
                        }}
                      ></textarea>
                      <label  >Mô tả {i+1}</label>
                      <div className="icon-xxxz"
                        onClick={()=>{
                          if(window.confirm(`Xác nhận xóa! : "${e}"`)){
                            let {data}=this.state;
                            data.short_des.splice(i,1);
                            this.setState({data:data})
                          }
                        }}
                      ><i className="fa-solid fa-circle-xmark"></i></div>
                    </div>
                    })
                  }
                  
                </div>
              </div>}
              {/* Hình ảnh */}
              {selected == "picture" && <div className='wrap-s scr'>
              <div className='row'>
                <div className='col-6'>
                  <Dropdown  selection search
                    value={data.tag_img}
                    options={tags}
                    onChange={async(e,{value}) => {
                      let {data}=this.state;
                      let a=await get_imgs_tag(value);
                          console.log("🚀 ~ file: tools.js:414 ~ onClick={async ~ a:", a);
                          try{
                            if(a.length>0){
                              //Xoa video and gif
                              let b = a.filter(item => !item.url.endsWith('.mp4') && !item.url.endsWith('.gif'));
                              //
                              data.imgs=b;
                              if(b.length>0){
                                this.setState({data:data})
                                toast.success('OK!',{theme: "colored"})
                              }else{
                                toast.info('0 hình ảnh!',{theme: "colored"})
                              }
                            }
                          }catch(e){
                            console.log("🚀 ~ file: tools.js:419 ~ onClick={async ~ e:", e)
                            
                          }
                      data.tag_img=value;
                      this.setState({data:data})
                    }}
                  />
                </div>
                <div className='col-6'>
                  <p>Tổng số hình ảnh: <b style={{color:"red"}}>{data.imgs.length}</b></p>
                </div>
              </div>
                <div className='row'>
                  {
                    data.imgs.map((e,i)=>{
                      if(i<11){
                        return <div className='col-4 mt-3 re' key={i}>
                          <img src={e.url300} width="100%" />
                        </div>
                      }
                    })
                  }
                </div>
              </div>}
            </div>
            <div className='col-6 re'>
              <div className='detailxs'>
                <i className="fa-solid fa-circle-info"></i>
                <div className='re'>
                  <div className='ifor-tinh'>
                    <span>Data hiện có: <b style={{color:"green"}}>{list_tinh.length}</b> tỉnh</span>
                    <div>
                      {
                        list_tinh.map((e,i)=>{
                          return <div className='elelsx' key={i}>
                          {i+1}.<b>{e.ten_tinh}</b><br/>
                           <span> Xã, huyện: <b style={{color:"green"}}>{e.huyen_xa.length}</b> </span><br/>
                           <span> Cửa hàng: <b style={{color:"green"}}>{e.cua_hang.length}</b> </span>
                          </div>
                        })
                      }
                      

                    </div>
                  </div>
                </div>
              </div>
              <div className='wrap-s bubu'>
                Từ khóa chính theo khu vực:
                <div>
                  <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText(key.ten_tinh);
                      toast.success(`Đã copy: "${key.ten_tinh}"`, { theme: "colored" })
                    }}
                  >Tên tỉnh<i className="fa-regular fa-clone ml-3"></i></button>
                  <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText(key.ten_xa_huyen);
                      toast.success(`Đã copy: "${key.ten_xa_huyen}"`, { theme: "colored" })
                    }}
                  >Tên xã, huyện<i className="fa-regular fa-clone ml-3"></i></button>
                  <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText(key.ten_cua_hang);
                      toast.success(`Đã copy: "${key.ten_cua_hang}"`, { theme: "colored" })
                    }}
                  >Tên cửa hàng<i className="fa-regular fa-clone ml-3"></i></button>
                  <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText(key.dia_chi_cua_hang);
                      toast.success(`Đã copy: "${key.dia_chi_cua_hang}"`, { theme: "colored" })
                    }}
                  >Địa chỉ cửa hàng<i className="fa-regular fa-clone ml-3"></i></button>
                  <button className='buzz buhh ml-3'
                    onClick={()=>{
                      navigator.clipboard.writeText('key_word');
                      toast.success(`Đã copy: "key_word"`, { theme: "colored" })
                    }}
                  >key_word<i className="fa-regular fa-clone ml-3"></i></button>
                </div>
              </div>
            <div className='lulu'>
              <div className="input-group-append ">
                  <button type="button" className="btn btn-primary btn-primaryx"
                  onClick={()=>{
                    let {data}=this.state;
                    data.key_words.unshift({
                      id:this.makeid(5),
                      chu_de_short:"",
                      chu_de:"",
                      text_key:"",
                      list_key:[]
                    })
                    this.setState({data:data})
                  }}
                  ><i className="fa-solid fa-plus"></i><span className="hgfs">Thêm chủ để từ khóa</span></button>
                  {/* <button type="button" className="btn btn-primary btn-success " style={{float:"right"}} > <i className="fa-brands fa-cloudscale"></i><span className="hgfs">Render giá trị</span></button> */}
                </div>
              <div className='keywords'>

                {/*  */}
                {
                  data.key_words.map((e,i)=>{
                    let kw=this.cv_url(e.chu_de);
                    let is_ok=(e.chu_de.length>0)&&e.list_key.length>0;
                    return <div className={is_ok?"wrap-z hgfc mt-3 key-active":"wrap-z hgfc mt-3"} key={e.id}>
                    {e.chu_de!='key_word'&&<i className="fa-solid fa-circle-xmark veis"
                      onClick={()=>{
                        if(window.confirm(`Xác nhận xóa: "${e.chu_de}"`)){
                          let {data}=this.state;
                          data.key_words.splice(i,1);
                          this.setState({data:data})
                        }
                      }}
                    ></i>}
                    <label className="form-label">{kw}<i className="fa-regular fa-copy icon-cp" style={{marginLeft: '20px'}}
                      onClick={()=>{
                        navigator.clipboard.writeText(kw);
                        toast.success(`Đã copy: "${kw}"`, { theme: "colored" })
                      }}
                    ></i></label>
                    <div className="mb-3 input-group">
                      <span className="input-group-text" id="basic-addon3">Chủ đề:</span>
                      {e.chu_de!='key_word'&&<input placeholder="..." aria-describedby="basic-addon3" className="form-control"
                        value={e.chu_de}
                        onChange={(e)=>{
                   
                            let {data}=this.state;
                            data.key_words[i].chu_de=e.target.value;
                            data.key_words[i].chu_de_short=this.cv_url(e.target.value);
                            this.setState({data:data})
             
                        }}
                      />}
                      {e.chu_de=='key_word'&&<input placeholder="..." aria-describedby="basic-addon3" className="form-control"
                        value={e.chu_de}
                        onChange={(e)=>{}}
                      />}
                    </div>
                    <label className="form-label">Danh sách từ khóa :</label>
                    <textarea className="form-control" style={{height:"100px"}}
                        value={e.text_key}
                        onChange={(e)=>{
                          let {data}=this.state;
                          data.key_words[i].text_key=e.target.value;
                          let arr=e.target.value.split(/, +/).join(",");
                          data.key_words[i].list_key=arr.split(",");
                          if(data.key_words[i].list_key[0].length==0) data.key_words[i].list_key=[];
                          this.setState({data:data})
                        }}
                    ></textarea>
                    <div className='tagzxs'>
                      {
                        data.key_words[i].list_key.map((a,x)=>{
                          return <span className='ntag' key={x} 
                            onClick={()=>{
                              navigator.clipboard.writeText(kw);
                              toast.success(`Đã copy: "${kw}"`, { theme: "colored" })
                            }}
                          >{a}</span>
                        })
                      }
                    </div>
                  </div>
                  })
                }
                
                {/*  */}
              </div>
            </div>

            </div>

          </div>
        </div>
        <div className="footer-edit">
          {selected == "long_des" && <div className="input-group-append yyuy" style={{ position: "fixed" }}>
            <button type="button" className="btn btn-primary btn-primary ml-3"
              onClick={() => {
                let { data } = this.state;
                data.long_des.push({
                  id: this.makeid(6),
                  tag: "h2",
                  text: "",
                  data: []
                })
                toast.success('Thêm thành công!', { theme: "colored" })
                this.setState({ data: data })
              }}
            >+ H2</button>
            <button type="button" className="btn btn-primary btn-secondary ml-3"
              onClick={() => {
                let { data } = this.state;
                // check co h2
                let rs_check = this.check_have_tag_h2(data.long_des);
                if (rs_check.is_have) {
                  data.long_des[rs_check.index].data.push({
                    id: this.makeid(6),
                    tag: 'h3',
                    text: '',
                    data: []
                  })
                  toast.success('Thêm thành công!', { theme: "colored" })
                } else {
                  toast.error('Không nên thêm thẻ H3 ở vị trí này!', { theme: "colored" })
                }
                this.setState({ data: data })
              }}
            >+ H3</button>
            <button type="button" className="btn btn-primary btn-success ml-3"
              onClick={() => {
                let { data } = this.state;
                // check co h2
                let rs_check_h2 = this.check_have_tag_h2(data.long_des);
                if (rs_check_h2.is_have) {// co the h2 thi kiem tra xem co h3 hay khong
                  let rs_check_h3 = this.check_have_tag_h3(rs_check_h2.index, data.long_des[rs_check_h2.index].data);
                  if (rs_check_h3.is_have) {// co h3
                    data.long_des[rs_check_h2.index].data[rs_check_h3.index].data.push({
                      id: this.makeid(6),
                      tag: "p",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  } else {// ko co h3

                    data.long_des[rs_check_h2.index].data.push({
                      id: this.makeid(6),
                      tag: "p",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  }
                } else {// khong co gi thi chi can add easy
                  data.long_des.push({
                    id: this.makeid(6),
                    tag: "p",
                    text: "",
                  })
                  toast.success('Thêm thành công!', { theme: "colored" })
                }
                this.setState({ data: data })
              }}
            >+ p</button>
            <button type="button" className="btn btn-primary btn-warning ml-3"
              onClick={() => {
                let { data } = this.state;
                // check co h2
                let rs_check_h2 = this.check_have_tag_h2(data.long_des);
                if (rs_check_h2.is_have) {// co the h2 thi kiem tra xem co h3 hay khong
                  let rs_check_h3 = this.check_have_tag_h3(rs_check_h2.index, data.long_des[rs_check_h2.index].data);
                  if (rs_check_h3.is_have) {// co h3
                    data.long_des[rs_check_h2.index].data[rs_check_h3.index].data.push({
                      id: this.makeid(6),
                      tag: "img",
                      text: "",
                      img_list:this.get_random_imgs_list()
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  } else {// ko co h3

                    data.long_des[rs_check_h2.index].data.push({
                      id: this.makeid(6),
                      tag: "img",
                      text: "",
                      img_list:this.get_random_imgs_list()
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  }
                } else {// khong co gi thi chi can add easy
                  data.long_des.push({
                    id: this.makeid(6),
                    tag: "img",
                    text: "",
                    img_list:this.get_random_imgs_list()
                  })
                  toast.success('Thêm thành công!', { theme: "colored" })
                }
                this.setState({ data: data })
              }}
            >+ img</button>
            <button type="button" className="btn btn-primary btn-dark ml-3"
              onClick={() => {
                let { data } = this.state;
                // check co h2
                let rs_check_h2 = this.check_have_tag_h2(data.long_des);
                if (rs_check_h2.is_have) {// co the h2 thi kiem tra xem co h3 hay khong
                  let rs_check_h3 = this.check_have_tag_h3(rs_check_h2.index, data.long_des[rs_check_h2.index].data);
                  if (rs_check_h3.is_have) {// co h3
                    data.long_des[rs_check_h2.index].data[rs_check_h3.index].data.push({
                      id: this.makeid(6),
                      tag: "quote",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  } else {// ko co h3

                    data.long_des[rs_check_h2.index].data.push({
                      id: this.makeid(6),
                      tag: "quote",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  }
                } else {// khong co gi thi chi can add easy
                  data.long_des.push({
                    id: this.makeid(6),
                    tag: "quote",
                    text: "",
                  })
                  toast.success('Thêm thành công!', { theme: "colored" })
                }
                this.setState({ data: data })
              }}
            >+ Quote</button>
            <button type="button" className="btn btn-danger btn-danger ml-3"
              onClick={() => {
                let { data } = this.state;
                // check co h2
                let rs_check_h2 = this.check_have_tag_h2(data.long_des);
                if (rs_check_h2.is_have) {// co the h2 thi kiem tra xem co h3 hay khong
                  let rs_check_h3 = this.check_have_tag_h3(rs_check_h2.index, data.long_des[rs_check_h2.index].data);
                  if (rs_check_h3.is_have) {// co h3
                    data.long_des[rs_check_h2.index].data[rs_check_h3.index].data.push({
                      id: this.makeid(6),
                      tag: "table",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  } else {// ko co h3

                    data.long_des[rs_check_h2.index].data.push({
                      id: this.makeid(6),
                      tag: "table",
                      text: "",
                    })
                    toast.success('Thêm thành công!', { theme: "colored" })
                  }
                } else {// khong co gi thi chi can add easy
                  data.long_des.push({
                    id: this.makeid(6),
                    tag: "table",
                    text: "",
                  })
                  toast.success('Thêm thành công!', { theme: "colored" })
                }
                this.setState({ data: data })
              }}
            >+ html</button>
            <div className='htys'><i className="fa-solid fa-circle-info"></i>
              <div className='huhxas'>
                <p><b>Ghi chú</b>:</p>
                <p>
                  <span style={{color:"red"}}>{`b_s`}</span> {'nghĩa là thẻ <b>'} ; và  <span style={{color:"red"}}>{` b_e`}</span> {'nghĩa là thẻ </b>'} 
                </p>
                <p>
                  <span style={{color:"red"}}>{`a_s`}</span> {'nghĩa là thẻ <a>'} ; và  <span style={{color:"red"}}>{` a_e`}</span> {'nghĩa là thẻ </a>. =>'} Ví dụ:<i> {'a_s Xem địa chỉ cửa hàng bán key_word tại ten_tinh a_e'}</i><br/> Kết quả:
                  <a className="btn-dc" href="#dia-chi"> Xem địa chỉ cửa hàng bán giường ngủ giá rẻ tại Gia Lai </a>
                </p>
                <p>
                  <span style={{color:"red"}}>{`r_s`}</span> {'nghĩa là thẻ <a href="url_backlink">'} ; và  <span style={{color:"red"}}>{` r_e`}</span> {'nghĩa là thẻ </a>'}
                </p>
              </div>
            </div>
          </div>}
          <button type="button" className="btn btn-primary"
            onClick={async () => {
              let {data,list_tinh}=this.state;
              if(list_tinh.length>0){
                if(data.long_des.length>0&&data.title.length>0&&data.short_des.length>0&&data.imgs.length>0&&data.list_sp.length>0){
    console.log("🚀 ~ file: tools.js:242 ~ Tools ~ render ~ data:", data)
                    let data_rs= xu_ly_content(data,list_tinh);
                    console.log("🚀 ~ file: tools.js:830 ~ onClick={ ~ data_rs:", data_rs)
                    this.setState({data_rs:data_rs.rs_show,kq_list:data_rs.rs_server,is_lock:true,index_rs:0,is_lock_run:false})
                }else{
                  toast.error('Bạn nên xem lại thông tin còn thiếu !.',{theme: "colored"})
                }
              }else{
                toast.error('Không có data tỉnh !.',{theme: "colored"})
              }
            }}
          
          >Bước 1: Render bài viết</button>
        </div>
  
        <EditorWrap
          triger={triger_editer} 
          width_50={true}
          content={selected_page.content_html}
          data_in={data_in}
          fs_close={()=>{
            this.setState({data_in:{is_open:false, type_editer:'', des:''}})
          }}
          fsReturn_editer={(long_des)=>{
            let {selected_page,data}=this.state;
            if(selected_page.type=="L3"){
              data.long_des[selected_page.i].data[selected_page.j].data[selected_page.x].text = long_des;
            }else if(selected_page.type=="L2"){
              data.long_des[selected_page.i].data[selected_page.j].text = long_des;
            }else if(selected_page.type=="L1"){
              data.long_des[selected_page.i].text =long_des;
            }else{
              alert("Lỗi editer HTML tag rồi!")
            }
            // selected_page.long_des=long_des
            this.setState({data:data})
          }}
        />
        {/* show ket qua render */}
        {is_lock&&<div className='rs-render'>
          <div className='container bgf'>
              <div className='row'>
                <div className='col-8'>
                  <div className='cpmtte'>
                    <section className="contents">
                      <h1 className="title">{data_rs[index_rs].title}</h1>
                      <div className="short-des">{data_rs[index_rs].short_des}</div>
                      <div className="long-des">
                        <div dangerouslySetInnerHTML={{__html: data_rs[index_rs].long_des}}></div>
                      </div>
                      <div className="show-adress" id="dia-chi">
                        <div dangerouslySetInnerHTML={{__html: data_rs[index_rs].shop_adress}}></div>
                      </div>
                    </section>
                  </div>
                </div>
                <div className='col-4'>
                  <div className='xssetrs'>
                    <div className='hux'><span style={{color:"blue",fontWeight:"bold"}}>{index_rs+1}</span>/{data_rs.length}</div>
                    <div className='jiss'>
                      <i className="fa-solid fa-caret-left"
                        onClick={()=>{
                          if(index_rs>0){
                            this.setState({index_rs:(index_rs-1)})
                          }else{
                            this.setState({index_rs:(data_rs.length-1)})
                          }
                        }}
                      ></i>
                      <i className="fa-solid fa-caret-right"
                          onClick={()=>{
                            if(index_rs<data_rs.length-1){
                              this.setState({index_rs:(index_rs+1)})
                            }else{
                              this.setState({index_rs:0})
                            }
                          }}
                      ></i>
                    </div>
                    <div className='mt-3' style={{textAlign:"center"}}>
                      <img src={data_rs[index_rs].thumnail} width="200px" />
                    </div>
                    <div className='mt-3' style={{textAlign:"center"}}>
                          <b>{data.selected_cate.title}</b>
                    </div>
                  </div>
                  <div className='hyusxz'>
                    {!is_lock_run&&<button type="button" className="btn btn-primary"
                      onClick={async () => {
                        let {kq_list}=this.state;
                        // if(selected_cate>-1){
                          // start
                          if(kq_list.length>0){
                            let rs=[];
                            kq_list.forEach(e => {
                              rs.push({
                                id:-1,
                                category_id:e.category_id,
                                json_data:JSON.stringify(e),
                                thumnail:JSON.stringify(e.thumnail),
                                title:e.title,
                                price:e.price,
                                quantity_sold:e.quantity_sold,
                                key_word:e.key_word,
                                related_keyword:JSON.stringify(e.related_keyword),
                                status:'private',
                                is_best_seller:false,
                                type:e.type,
                                short_des:e.short_des
                              })
                            });
                            console.log("🚀 ~ file: tools.js:922 ~ onClick={ ~ rs:", rs)
                            let a= await create_posts({
                              data:JSON.stringify(rs)
                            })

                            if(a.status){
                              this.setState({is_lock_run:true})
                              toast.success('Tạo thành công!.',{theme: "colored"})
                            }else{
                              toast.error('Lỗi!.',{theme: "colored"})
                            }

                          }else{
                            toast.error('Bạn phải lựa chọn DANH MỤC chưa bài viết trước khi tạo!.',{theme: "colored"})
                          }
                      }}
                    
                    >Bắt đầu tạo bài viết</button>}
                    <button type="button" className="btn btn-danger ml-3"
                      onClick={async () => {
                        if(window.confirm("Xác nhận hủy, bạn phải render lại mới đó!")){
                          this.setState({is_lock:false})
                        }
                      }}
                    
                    >Hủy</button>
                  </div>
                </div>
              </div>
          </div>
        </div>}
      </React.Fragment>
    );
  }
  get_random_imgs_list=()=>{
    let {data}=this.state;
    let imgs=data.imgs;
    console.log("🚀 ~ file: tools.js:974 ~ imgs:", imgs)
    return sampleSize(imgs,30);
  }
  show_input_long_des = (long_des) => {
    let rs = [];
    let {text_img_selected}=this.state
    long_des.forEach((e, i) => {
      if (e.tag == "h2") {
        rs.push(<div className="input-group mb-3 mt-3 re" key={e.id}>
          <span className="input-group-text">H2:</span>
          <input type="text" className="form-control hh2" placeholder="Tiêu đề thẻ H2"
            value={e.text}
            onChange={(e) => {
              let { data } = this.state;
              data.long_des[i].text = e.target.value;
              this.setState({ data: data })
            }}
          />
          <div className="icon-xxxz"
            onClick={() => {
              if (window.confirm(`Xác nhận xóa!`)) {
                let { data } = this.state;
                data.long_des.splice(i, 1);
                this.setState({ data: data })
              }
            }}
          ><i className="fa-solid fa-circle-xmark"></i></div>
        </div>)
        //  L2
        e.data.forEach((h, j) => {
          if (h.tag == "h3") {
            rs.push(<div className="input-group mb-3 mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">H3:</span>
              <input type="text" className="form-control hh3" placeholder="Tiêu đề thẻ H3"
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              />
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
            // L3
            h.data.forEach((a, x) => {
              if (a.tag == "p") {
                rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "100px" }} key={a.id}>
                  <span className="input-group-text">p</span>
                  <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                    value={a.text}
                    onChange={(e) => {
                      let { data } = this.state;
                      data.long_des[i].data[j].data[x].text = e.target.value;
                      this.setState({ data: data })
                    }}
                  ></textarea>
                  <div className="icon-xxxz"
                    onClick={() => {
                      if (window.confirm(`Xác nhận xóa!`)) {
                        let { data } = this.state;
                        data.long_des[i].data[j].data.splice(x, 1);
                        this.setState({ data: data })
                      }
                    }}
                  ><i className="fa-solid fa-circle-xmark"></i></div>
                </div>)
              } else if (a.tag == "img") {
                rs.push(
                <div className='row' key={a.id}>
                  <div className="input-group mb-3 mt-3 re" style={{ paddingLeft: "100px" }} key={a.id}>
                    <span className="input-group-text">img:</span>
                    <input type="text" className="form-control" placeholder="Mô tả cho hình ảnh"
                      value={a.text}
                      onChange={(e) => {
                        let { data } = this.state;
                        data.long_des[i].data[j].data[x].text = e.target.value;
                        this.setState({ data: data })
                      }}
                    />
                    <div className="icon-xxxz"
                      onClick={() => {
                        if (window.confirm(`Xác nhận xóa!`)) {
                          let { data } = this.state;
                          data.long_des[i].data[j].data.splice(x, 1);
                          this.setState({ data: data })
                        }
                      }}
                    ><i className="fa-solid fa-circle-xmark"></i></div>
                  </div>
                  {/* <div className='row'>
                  {
                      long_des[i].data[j].data[x].img_list.map((e,ii)=>{
                        let is_double=false;
                        if(this.countDuplicateWords(text_img_selected,e.id+",")>=2) is_double=true;
                        return <div className='col-2 mt-3 re' key={ii}>
                          {is_double&&<span style={{position:"absolute",fontSize:"10px",color:"yellow",top:"-12px",left:"31px",fontWeight:"900",padding:"2px 4px",backgroundColor:"#6f7476",borderRadius:"5px"}}>double</span>}
                        <img src={e.img} width="100%" />
                        <div className="icon-xxxz"
                            onClick={()=>{
                                let {data,text_img_selected}=this.state;
                                data.long_des[i].data[j].data[x].img_list.splice(ii,1);
                                text_img_selected=text_img_selected.replace(e.id+",","")
                                this.setState({data:data,text_img_selected:text_img_selected})
                            }}
                          ><i className="fa-solid fa-circle-xmark"></i></div>
                        </div>
                      })
                  }
                  </div> */}
                </div>
                )
              } else if (a.tag == "quote") {
                rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "100px" }} key={a.id}>
                  <span className="input-group-text">Quote</span>
                  <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                    value={a.text}
                    onChange={(e) => {
                      let { data } = this.state;
                      data.long_des[i].data[j].data[x].text = e.target.value;
                      this.setState({ data: data })
                    }}
                  ></textarea>
                  <div className="icon-xxxz"
                    onClick={() => {
                      if (window.confirm(`Xác nhận xóa!`)) {
                        let { data } = this.state;
                        data.long_des[i].data[j].data.splice(x, 1);
                        this.setState({ data: data })
                      }
                    }}
                  ><i className="fa-solid fa-circle-xmark"></i></div>
                </div>)
              } else if (a.tag == "table") {
                rs.push(
                // <div className="input-group mt-3 re" style={{ paddingLeft: "100px" }} key={a.id}>
                //   <span className="input-group-text">html</span>
                //   <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                //     value={a.text}
                //     onChange={(e) => {
                //       let { data } = this.state;
                //       data.long_des[i].data[j].data[x].text = e.target.value;
                //       this.setState({ data: data })
                //     }}
                //   ></textarea>
                //   <div className="icon-xxxz"
                //     onClick={() => {
                //       if (window.confirm(`Xác nhận xóa!`)) {
                //         let { data } = this.state;
                //         data.long_des[i].data[j].data.splice(x, 1);
                //         this.setState({ data: data })
                //       }
                //     }}
                //   ><i className="fa-solid fa-circle-xmark"></i></div>
                // </div>
                <div key={a.id} style={{ paddingLeft: "100px" }}>
                  <div className='wrap-html'>
                    <div className='toolsxzs re'>
                      <button type="button ccos" class="btn-clipboard" 
                        onClick={()=>{
                          let {triger_editer}=this.state;
                          this.setState({
                            selected_page:{
                              content_html:a.text,
                              type:'L3',
                              i:i,
                              j:j,
                              x:x
                            },
                            data_in:{is_open:true, type_editer:'html', des:'Thêm html'},
                            triger_editer:triger_editer+1
                          })
                        }}
                      >Chỉnh sửa</button>
                      <div className="icon-xxxz"
                        onClick={() => {
                          if (window.confirm(`Xác nhận xóa!`)) {
                            let { data } = this.state;
                            data.long_des[i].data[j].data.splice(x, 1);
                            this.setState({ data: data })
                          }
                        }}
                      ><i className="fa-solid fa-circle-xmark"></i></div>
                      <span className='html-tag'>HTML tag</span>
                    </div>
                    <div  dangerouslySetInnerHTML={{__html: a.text}}></div>
                  </div>
                </div>
                )
              }
            });
          } else if (h.tag == "p") {
            rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">p</span>
              <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              ></textarea>
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          } else if (h.tag == "img") {
            rs.push(
            <div className='row' key={h.id}>
              <div className="input-group mb-3 mt-3 re" style={{ paddingLeft: "36px" }}>
                <span className="input-group-text">img:</span>
                <input type="text" className="form-control" placeholder="Tiêu đề thẻ H3"
                  value={h.text}
                  onChange={(e) => {
                    let { data } = this.state;
                    data.long_des[i].data[j].text = e.target.value;
                    this.setState({ data: data })
                  }}
                />
                <div className="icon-xxxz"
                  onClick={() => {
                    if (window.confirm(`Xác nhận xóa!`)) {
                      let { data } = this.state;
                      data.long_des[i].data.splice(j, 1);
                      this.setState({ data: data })
                    }
                  }}
                ><i className="fa-solid fa-circle-xmark"></i></div>
              </div>
              {/* <div className='row'>
               {
                  long_des[i].data[j].img_list.map((e,ii)=>{
                    let is_double=false;
                    if(this.countDuplicateWords(text_img_selected,e.id+",")>=2) is_double=true;
                    return <div className='col-2 mt-3 re' key={ii}>
                      {is_double&&<span style={{position:"absolute",fontSize:"10px",color:"yellow",top:"-12px",left:"31px",fontWeight:"900",padding:"2px 4px",backgroundColor:"#6f7476",borderRadius:"5px"}}>double</span>}
                    <img src={e.img} width="100%" />
                    <div className="icon-xxxz"
                        onClick={()=>{
                            let {data,text_img_selected}=this.state;
                            data.long_des[i].data[j].img_list.splice(ii,1);
                            text_img_selected=text_img_selected.replace(e.id+",","")
                            this.setState({data:data,text_img_selected:text_img_selected})
                        }}
                      ><i className="fa-solid fa-circle-xmark"></i></div>
                    </div>
                  })
                }
              </div> */}
            </div>
            )
          } else if (h.tag == "quote") {
            rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">Quote</span>
              <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              ></textarea>
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          } else if (h.tag == "table") {
            rs.push(
            <div key={h.id} style={{ paddingLeft: "36px" }}>
              <div  className='wrap-html'>
                <div className='toolsxzs re'>
                  <button type="button" class="btn-clipboard ccos" 
                    onClick={()=>{
                      let {triger_editer}=this.state;
                      this.setState({
                        selected_page:{
                          content_html:h.text,
                          type:'L2',
                          i:i,
                          j:j,
                          x:-1
                        },
                        data_in:{is_open:true, type_editer:'html', des:'Thêm html'},
                        triger_editer:triger_editer+1
                      })
                    }}
                  >Chỉnh sửa</button>
                  <div className="icon-xxxz"
                    onClick={() => {
                      if (window.confirm(`Xác nhận xóa!`)) {
                        let { data } = this.state;
                        data.long_des[i].data.splice(j, 1);
                        this.setState({ data: data })
                      }
                    }}
                  ><i className="fa-solid fa-circle-xmark"></i></div>
                  <span className='html-tag'>HTML tag</span>
                </div>
                <div  dangerouslySetInnerHTML={{__html: h.text}}></div>
              </div>
            </div>
            )
          }
        })
      } else if (e.tag == "h3") {
        rs.push(<div className="input-group mb-3 mt-3 re" key={e.id}>
          <span className="input-group-text">H3:</span>
          <input type="text" className="form-control hh3" placeholder="Tiêu đề thẻ H3"
            value={e.text}
            onChange={(e) => {
              let { data } = this.state;
              data.long_des[i].text = e.target.value;
              this.setState({ data: data })
            }}
          />
          <div className="icon-xxxz"
            onClick={() => {
              if (window.confirm(`Xác nhận xóa!`)) {
                let { data } = this.state;
                data.long_des.splice(i, 1);
                this.setState({ data: data })
              }
            }}
          ><i className="fa-solid fa-circle-xmark"></i></div>
        </div>)
        // L2
        e.data.forEach((h, j) => {
          if (h.tag == "p") {
            rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">p</span>
              <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              ></textarea>
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          } else if (h.tag == "img") {
            rs.push(<div className="input-group mb-3 mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">img:</span>
              <input type="text" className="form-control" placeholder="Mô tả cho hình ảnh"
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              />
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          } else if (h.tag == "quote") {
            rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">Quote</span>
              <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              ></textarea>
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          } else if (h.tag == "table") {
            rs.push(<div className="input-group mt-3 re" style={{ paddingLeft: "36px" }} key={h.id}>
              <span className="input-group-text">html</span>
              <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
                value={h.text}
                onChange={(e) => {
                  let { data } = this.state;
                  data.long_des[i].data[j].text = e.target.value;
                  this.setState({ data: data })
                }}
              ></textarea>
              <div className="icon-xxxz"
                onClick={() => {
                  if (window.confirm(`Xác nhận xóa!`)) {
                    let { data } = this.state;
                    data.long_des[i].data.splice(j, 1);
                    this.setState({ data: data })
                  }
                }}
              ><i className="fa-solid fa-circle-xmark"></i></div>
            </div>)
          }
        });
      } else if (e.tag == "p") {
        rs.push(<div className="input-group mt-3 re" key={e.id}>
          <span className="input-group-text">p</span>
          <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
            value={e.text}
            onChange={(e) => {
              let { data } = this.state;
              data.long_des[i].text = e.target.value;
              this.setState({ data: data })
            }}
          ></textarea>
          <div className="icon-xxxz"
            onClick={() => {
              if (window.confirm(`Xác nhận xóa!`)) {
                let { data } = this.state;
                data.long_des.splice(i, 1);
                this.setState({ data: data })
              }
            }}
          ><i className="fa-solid fa-circle-xmark"></i></div>
        </div>)
      } else if (e.tag == "img") {
        rs.push(
          <div className='row' key={e.id}>
              <div className="input-group mb-3 mt-3 re" >
                <span className="input-group-text">img:</span>
                <input type="text" className="form-control" placeholder="Mô tả hình ảnh"
                  value={e.text}
                  onChange={(e) => {
                    let { data } = this.state;
                    data.long_des[i].text = e.target.value;
                    this.setState({ data: data })
                  }}
                />
                <div className="icon-xxxz"
                  onClick={() => {
                    if (window.confirm(`Xác nhận xóa!`)) {
                      let { data } = this.state;
                      data.long_des.splice(i, 1);
                      this.setState({ data: data })
                    }
                  }}
                  ><i className="fa-solid fa-circle-xmark"></i></div>
              </div>
              {/* <div className='row'>
               {
                  long_des[i].img_list.map((e,ii)=>{
                    let is_double=false;
                    if(this.countDuplicateWords(text_img_selected,e.id+",")>=2) is_double=true;
                    return <div className='col-2 mt-3 re' key={ii}>
                      {is_double&&<span style={{position:"absolute",fontSize:"10px",color:"yellow",top:"-12px",left:"31px",fontWeight:"900",padding:"2px 4px",backgroundColor:"#6f7476",borderRadius:"5px"}}>double</span>}
                    <img src={e.img} width="100%" />
                    <div className="icon-xxxz"
                        onClick={()=>{
                            let {data,text_img_selected}=this.state;
                            data.long_des[i].img_list.splice(ii,1);
                            text_img_selected=text_img_selected.replace(e.id+",","")
                            this.setState({data:data,text_img_selected:text_img_selected})
                        }}
                      ><i className="fa-solid fa-circle-xmark"></i></div>
                    </div>
                  })
                }
              </div> */}
          </div>
        )
      } else if (e.tag == "quote") {
        rs.push(<div className="input-group mt-3 re" key={e.id}>
          <span className="input-group-text">Quote</span>
          <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
            value={e.text}
            onChange={(e) => {
              let { data } = this.state;
              data.long_des[i].text = e.target.value;
              this.setState({ data: data })
            }}
          ></textarea>
          <div className="icon-xxxz"
            onClick={() => {
              if (window.confirm(`Xác nhận xóa!`)) {
                let { data } = this.state;
                data.long_des.splice(i, 1);
                this.setState({ data: data })
              }
            }}
          ><i className="fa-solid fa-circle-xmark"></i></div>
        </div>)
      } else if (e.tag == "table") {
        rs.push(
        // <div className="input-group mt-3 re" key={e.id}>
        //   <span className="input-group-text">html</span>
        //   <textarea className="form-control" aria-label="With textarea" style={{ height: "120px", fontSize: "14px" }}
        //     value={e.text}
        //     onChange={(e) => {
        //       let { data } = this.state;
        //       data.long_des[i].text = e.target.value;
        //       this.setState({ data: data })
        //     }}
        //   ></textarea>
          // <div className="icon-xxxz"
          //   onClick={() => {
          //     if (window.confirm(`Xác nhận xóa!`)) {
          //       let { data } = this.state;
          //       data.long_des.splice(i, 1);
          //       this.setState({ data: data })
          //     }
          //   }}
          // ><i className="fa-solid fa-circle-xmark"></i></div>
        // </div>
        <div className='wrap-html' key={e.id}>
          <div className='toolsxzs re'>
            <button type="button" class="btn-clipboard ccos" 
              onClick={()=>{
                let {triger_editer}=this.state;
                this.setState({
                  selected_page:{
                    content_html:e.text,
                    type:'L1',
                    i:i,
                    j:-1,
                    x:-1
                  },
                  data_in:{is_open:true, type_editer:'html', des:'Thêm html'},
                  triger_editer:triger_editer+1
                })
              }}
            >Chỉnh sửa</button>
            <div className="icon-xxxz"
              onClick={() => {
                if (window.confirm(`Xác nhận xóa!`)) {
                  let { data } = this.state;
                  data.long_des.splice(i, 1);
                  this.setState({ data: data })
                }
              }}
            ><i className="fa-solid fa-circle-xmark"></i></div>
            <span className='html-tag'>HTML tag</span>
          </div>
          <div  dangerouslySetInnerHTML={{__html: e.text}}></div>
        </div>
        )
      }
    });
    return rs;
  }
  check_have_tag_h3 = (i, data) => {
    let rs = {
      is_have: false,
      index: -1
    };
    data.forEach((e, i) => {
      if (e.tag == 'h3') rs = {
        is_have: true,
        index: i
      };
    });
    return rs;
  }
  check_have_tag_h2 = (long_des) => {
    let rs = {
      is_have: false,
      index: -1
    };
    long_des.forEach((e, i) => {
      if (e.tag == 'h2') rs = {
        is_have: true,
        index: i
      };
    });
    return rs;
  }
  makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  cv_url=(str)=>{
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

    // return  str.replace(" ","_");
    var encodedUrl = str.toString().toLowerCase();

    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("_and_")

    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("_");

    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("_");

    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('_');

    return encodedUrl;

  }
   countDuplicateWords =(str, word) =>{
    const words = str.split(word);
    return (words.length-1);
  }
}

