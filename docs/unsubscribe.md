# 信息更新

<div id="UnBirthApp">

### 基本信息

> `昵称` <input v-model="name" placeholder="username">
>
> `邮箱` <input v-model="mail" placeholder="username@domain.com">
>
> <span>`公历生日` <input v-model="birth_s" placeholder="yyyy-MM-dd"></span>
>
> <span title="无需提交，根据公历自动修改">`农历生日` <input v-model="birth_l" placeholder="XX年XX月XX" readonly="true"></span>

### 邮件推送

| `公历祝福`<input type="checkbox" v-model="solar"> | `农历祝福` <input type="checkbox" v-model="lunar"> |
| ------------------------------------------------- | -------------------------------------------------- |


<button class="ant-btn ant-btn-red" style="display:block;margin:0 auto" v-on:click="updata_user">提交</button>

</div>

<script>

var birth_unsubsribe=function(c){var d=this;var e={api_url:'https://mail-unsubscribe.vercel.app/api/',archive_part:'#/unsubscribe?',id_key:c,id_user:null};var f={"_id":null,"name":null,"mail":null,"birthday":null,"receive_solar":null,"receive_lunar":null,"birth_y":null,"solar_cal":null,"lunar_cal":null,"lunar_text":null,};var g={birth:/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,mail:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,name:/^.{1,12}$/,id_user:/^[0-9a-fA-F]{24}$/};var h={getQueryString:function(a,b){let reg=new RegExp("(^|&)"+b+"=([^&]*)(&|$)");let url=location.hash.replace(a,'');let r=url.match(reg);if(r!=null){return decodeURIComponent(r[2])};return null},getapi:async function(a){let fetch_data=await fetch(a);let fetch_Json=await fetch_data.json();return fetch_Json},showmsg:function(a){alert(a)},getFullDate:function(a){let mon=parseInt(f[a]/100);let day=f[a]%100;mon=(mon/10<1)?('0'+mon):mon;day=(day/10<1)?('0'+day):day;return(f.birth_y+'-'+mon+'-'+day)},url_Usersubmit:function(){let url_p=['name','mail','birthday','receive_solar','receive_lunar'];let userid='update?id='+f._id;let url='';for(var i in url_p){if(f[url_p[i]]!=null){url+=`&${url_p[i]}=${f[url_p[i]]}`}}url=e.api_url+userid+url;return url}};var j={IntApp:async function(){await this.getUser();if(e.id_user!=f._id){h.showmsg('你究竟是谁，想要干什么！！！')}else{d.action=this}},UpAppData:function(a){if(f._id!=null){a.solar=f.receive_solar;a.lunar=f.receive_lunar;a.name=f.name;a.mail=f.mail;a.birth_s=h.getFullDate("solar_cal");a.birth_l=f.lunar_text}},getUser:async function(){if(e.id_user==null){return}let url=e.api_url+"?id="+e.id_user;let data=await h.getapi(url);f=Object.assign(f,data['document'])},Usersubmit:async function(a){if(f._id!=null){if(g.name.test(a.name)){f.name=a.name}else{h.showmsg('名字最少1字符，最长12字符');return}if(g.mail.test(a.mail)){f.mail=a.mail}else{h.showmsg('邮箱格式不对');return}if(g.birth.test(a.birth_s)){f.birthday=a.birth_s}else{h.showmsg('日期格式不对');return}f.receive_solar=a.solar;f.receive_lunar=a.lunar;let url=h.url_Usersubmit();await h.getapi(url);location.reload()}},};this.init=async function(){let id_user=h.getQueryString(e.archive_part,e.id_key);if(g.id_user.test(id_user)){e.id_user=id_user;await j.IntApp()}else{h.showmsg('无效的身份')}}};async function int_m(){var a=new birth_unsubsribe('user');const UnBirthApp={data(){return{solar:null,lunar:null,name:null,mail:null,birth_s:null,birth_l:null}},methods:{updata_user(){a.action.Usersubmit(this)}},};var b=Vue.createApp(UnBirthApp).mount('#UnBirthApp');await a.init();a.action.UpAppData(b)};int_m();

</script>
