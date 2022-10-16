# 淮阴师范学院健康填报

!> 本项目仅适用于淮阴师范学院（学生疫情信息收集—每日报平安）

1. 如有相关旅居史、接触史及发热状况，请手动上传表单并向学校汇报，配合学校防疫工作。
2. 所有内容禁止修改！造成相关防疫问责问题与作者无关。
3. 只可自己使用，禁止代他人使用或他人代使用！
4. 如不能遵守上述要求，请不要使用！

## 密码加密

使用统一身份验证平台进行登录，~~该平台密码默认为身份证后六位。可能是出于安全考虑，系统实际请求密码是输入密码加密后的密码。我们需要获取实际请求密码才能登录成功~~。(现在学校更新系统要求设置新密码了，但依然使用了原来的加密方法。哦，更换了密钥，但还是前端写死的😑。)

这里将加密算法搬了过来，将统一身份验证平台登录密码填入下框，即可获取加密后的密码。

（如不能正常显示请在[https://docs.anyfan.top/#/hytc_sign](https://docs.anyfan.top/#/hytc_sign)打开，或者在[github](https://github.com/anyfan/hytc-auto_cpdaily)下载此项目使用`index.html`获取）


<div id="hytc_sign">
<input v-model="message" placeholder="你是我的waifu吗？">⬅编辑我

<pre data-lang="text"><code class="lang-text">{{ after_message }}</code></pre>
</div>

## python 部署

使用之前你需要安装以下包

```python
pip3 install beautifulsoup4
```

接着你只需要传入相关参数就可以了

```python
python3 DailyXY.py 学号 加密后的密码
```

配合 linux 服务器`crontab`即可每天自动运行

### 简单的接口应用

你也可以通过请求接口来完成自定义时间，以下是 php 服务端简单是示例。`post`请求`id`,`pwd`,`tk`对应的值，接口返回程序运行结果。

```php
<?php
header('Content-Type:application/json');

$id = $_POST['id'];

$pwd = $_POST['pwd'];

$tk = $_POST['tk'];

if ($tk=='hytc'){
    if($id==''||$pwd==''){
        echo('你是我的waifu吗');
    }
    else{
        $result = exec("python3 1.py $id $pwd");
        echo json_encode($result,JSON_UNESCAPED_UNICODE);
    }

}else{
    echo('你是我的waifu吗');
}
```

## ios 快捷指令

由于部分人没有服务器以及不懂相关的知识，于是我花了一天的时间编写了这个快捷指令。只要你拥有 ios 设备就可以运行。

在 safair 打开[https://www.icloud.com/shortcuts/53d0f9171c2a4a05b7e2f925f90c382a](https://www.icloud.com/shortcuts/53d0f9171c2a4a05b7e2f925f90c382a)

添加后按要求填写账号与密码，密码是加密后的密码。详情见 [密码加密](#密码加密)

试运行，期间允许所有的网站申请访问，提示密码错误请检查账号密码。

添加自动化，选择特定时间，依次选择 `添加操作`-`app`-`快捷指令`-`运行快捷指令`。然后选中`hytc健康填报`，最后关闭`运行前询问`。

## 其他

> 上次检查可用性 `22-10-16`



<script>
    
function get_HytcPwd(o){function RSAKeyPair(a,b,c){this.e=biFromHex(a);this.d=biFromHex(b);this.m=biFromHex(c);this.chunkSize=2*biHighIndex(this.m);this.radix=16;this.barrett=new BarrettMu(this.m)}function twoDigit(n){return(n<10?"0":"")+String(n)}function encryptedString(b,s){var a=new Array();var c=s.length;var i=0;while(i<c){a[i]=s.charCodeAt(i);i++}while(a.length%b.chunkSize!=0){a[i++]=0}var d=a.length;var e="";var j,k,block;for(i=0;i<d;i+=b.chunkSize){block=new BigInt();j=0;for(k=i;k<i+b.chunkSize;++j){block.digits[j]=a[k++];block.digits[j]+=a[k++]<<8}var f=b.barrett.powMod(block,b.e);var g=b.radix==16?biToHex(f):biToString(f,b.radix);e+=g+" "}return e.substring(0,e.length-1)}function decryptedString(a,s){var b=s.split(" ");var c="";var i,j,block;for(i=0;i<b.length;++i){var d;if(a.radix==16){d=biFromHex(b[i])}else{d=biFromString(b[i],a.radix)}block=a.barrett.powMod(d,a.d);for(j=0;j<=biHighIndex(block);++j){c+=String.fromCharCode(block.digits[j]&255,block.digits[j]>>8)}}if(c.charCodeAt(c.length-1)==0){c=c.substring(0,c.length-1)}return c}var p=2;var v=16;var w=v;var z=1<<16;var A=z>>>1;var B=z*z;var C=z-1;var D=9999999999999998;var E;var F;var G,bigOne;function setMaxDigits(a){E=a;F=new Array(E);for(var b=0;b<F.length;b++)F[b]=0;G=new BigInt();bigOne=new BigInt();bigOne.digits[0]=1}setMaxDigits(20);var H=15;var I=biFromNumber(1000000000000000);function BigInt(a){if(typeof a=="boolean"&&a==true){this.digits=null}else{this.digits=F.slice(0)}this.isNeg=false}function biFromDecimal(s){var a=s.charAt(0)=='-';var i=a?1:0;var b;while(i<s.length&&s.charAt(i)=='0')++i;if(i==s.length){b=new BigInt()}else{var c=s.length-i;var d=c%H;if(d==0)d=H;b=biFromNumber(Number(s.substr(i,d)));i+=d;while(i<s.length){b=biAdd(biMultiply(b,I),biFromNumber(Number(s.substr(i,H))));i+=H}b.isNeg=a}return b}function biCopy(a){var b=new BigInt(true);b.digits=a.digits.slice(0);b.isNeg=a.isNeg;return b}function biFromNumber(i){var a=new BigInt();a.isNeg=i<0;i=Math.abs(i);var j=0;while(i>0){a.digits[j++]=i&C;i=Math.floor(i/z)}return a}function reverseStr(s){var a="";for(var i=s.length-1;i>-1;--i){a+=s.charAt(i)}return a}var J=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');function biToString(x,a){var b=new BigInt();b.digits[0]=a;var c=biDivideModulo(x,b);var d=J[c[1].digits[0]];while(biCompare(c[0],G)==1){c=biDivideModulo(c[0],b);digit=c[1].digits[0];d+=J[c[1].digits[0]]}return(x.isNeg?"-":"")+reverseStr(d)}function biToDecimal(x){var b=new BigInt();b.digits[0]=10;var a=biDivideModulo(x,b);var c=String(a[1].digits[0]);while(biCompare(a[0],G)==1){a=biDivideModulo(a[0],b);c+=String(a[1].digits[0])}return(x.isNeg?"-":"")+reverseStr(c)}var K=new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');function digitToHex(n){var a=0xf;var b="";for(i=0;i<4;++i){b+=K[n&a];n>>>=4}return reverseStr(b)}function biToHex(x){var a="";var n=biHighIndex(x);for(var i=biHighIndex(x);i>-1;--i){a+=digitToHex(x.digits[i])}return a}function charToHex(c){var a=48;var b=a+9;var d=97;var e=d+25;var f=65;var g=65+25;var h;if(c>=a&&c<=b){h=c-a}else if(c>=f&&c<=g){h=10+c-f}else if(c>=d&&c<=e){h=10+c-d}else{h=0}return h}function hexToDigit(s){var a=0;var b=Math.min(s.length,4);for(var i=0;i<b;++i){a<<=4;a|=charToHex(s.charCodeAt(i))}return a}function biFromHex(s){var a=new BigInt();var b=s.length;for(var i=b,j=0;i>0;i-=4,++j){a.digits[j]=hexToDigit(s.substr(Math.max(i-4,0),Math.min(i,4)))}return a}function biFromString(s,a){var b=s.charAt(0)=='-';var d=b?1:0;var e=new BigInt();var f=new BigInt();f.digits[0]=1;for(var i=s.length-1;i>=d;i--){var c=s.charCodeAt(i);var g=charToHex(c);var h=biMultiplyDigit(f,g);e=biAdd(e,h);f=biMultiplyDigit(f,a)}e.isNeg=b;return e}function biDump(b){return(b.isNeg?"-":"")+b.digits.join(" ")}function biAdd(x,y){var a;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;a=biSubtract(x,y);y.isNeg=!y.isNeg}else{a=new BigInt();var c=0;var n;for(var i=0;i<x.digits.length;++i){n=x.digits[i]+y.digits[i]+c;a.digits[i]=n%z;c=Number(n>=z)}a.isNeg=x.isNeg}return a}function biSubtract(x,y){var a;if(x.isNeg!=y.isNeg){y.isNeg=!y.isNeg;a=biAdd(x,y);y.isNeg=!y.isNeg}else{a=new BigInt();var n,c;c=0;for(var i=0;i<x.digits.length;++i){n=x.digits[i]-y.digits[i]+c;a.digits[i]=n%z;if(a.digits[i]<0)a.digits[i]+=z;c=0-Number(n<0)}if(c==-1){c=0;for(var i=0;i<x.digits.length;++i){n=0-a.digits[i]+c;a.digits[i]=n%z;if(a.digits[i]<0)a.digits[i]+=z;c=0-Number(n<0)}a.isNeg=!x.isNeg}else{a.isNeg=x.isNeg}}return a}function biHighIndex(x){var a=x.digits.length-1;while(a>0&&x.digits[a]==0)--a;return a}function biNumBits(x){var n=biHighIndex(x);var d=x.digits[n];var m=(n+1)*w;var a;for(a=m;a>m-w;--a){if((d&0x8000)!=0)break;d<<=1}return a}function biMultiply(x,y){var a=new BigInt();var c;var n=biHighIndex(x);var t=biHighIndex(y);var u,uv,k;for(var i=0;i<=t;++i){c=0;k=i;for(j=0;j<=n;++j,++k){uv=a.digits[k]+x.digits[j]*y.digits[i]+c;a.digits[k]=uv&C;c=uv>>>v}a.digits[i+n+1]=c}a.isNeg=x.isNeg!=y.isNeg;return a}function biMultiplyDigit(x,y){var n,c,uv;O=new BigInt();n=biHighIndex(x);c=0;for(var j=0;j<=n;++j){uv=O.digits[j]+x.digits[j]*y+c;O.digits[j]=uv&C;c=uv>>>v}O.digits[1+n]=c;return O}function arrayCopy(a,b,c,d,n){var m=Math.min(b+n,a.length);for(var i=b,j=d;i<m;++i,++j){c[j]=a[i]}}var L=new Array(0x0000,0x8000,0xC000,0xE000,0xF000,0xF800,0xFC00,0xFE00,0xFF00,0xFF80,0xFFC0,0xFFE0,0xFFF0,0xFFF8,0xFFFC,0xFFFE,0xFFFF);function biShiftLeft(x,n){var a=Math.floor(n/w);var b=new BigInt();arrayCopy(x.digits,0,b.digits,a,b.digits.length-a);var c=n%w;var d=w-c;for(var i=b.digits.length-1,i1=i-1;i>0;--i,--i1){b.digits[i]=((b.digits[i]<<c)&C)|((b.digits[i1]&L[c])>>>(d))}b.digits[0]=((b.digits[i]<<c)&C);b.isNeg=x.isNeg;return b}var M=new Array(0x0000,0x0001,0x0003,0x0007,0x000F,0x001F,0x003F,0x007F,0x00FF,0x01FF,0x03FF,0x07FF,0x0FFF,0x1FFF,0x3FFF,0x7FFF,0xFFFF);function biShiftRight(x,n){var a=Math.floor(n/w);var b=new BigInt();arrayCopy(x.digits,a,b.digits,0,x.digits.length-a);var c=n%w;var d=w-c;for(var i=0,i1=i+1;i<b.digits.length-1;++i,++i1){b.digits[i]=(b.digits[i]>>>c)|((b.digits[i1]&M[c])<<d)}b.digits[b.digits.length-1]>>>=c;b.isNeg=x.isNeg;return b}function biMultiplyByRadixPower(x,n){var a=new BigInt();arrayCopy(x.digits,0,a.digits,n,a.digits.length-n);return a}function biDivideByRadixPower(x,n){var a=new BigInt();arrayCopy(x.digits,n,a.digits,0,a.digits.length-n);return a}function biModuloByRadixPower(x,n){var a=new BigInt();arrayCopy(x.digits,0,a.digits,0,n);return a}function biCompare(x,y){if(x.isNeg!=y.isNeg){return 1-2*Number(x.isNeg)}for(var i=x.digits.length-1;i>=0;--i){if(x.digits[i]!=y.digits[i]){if(x.isNeg){return 1-2*Number(x.digits[i]>y.digits[i])}else{return 1-2*Number(x.digits[i]<y.digits[i])}}}return 0}function biDivideModulo(x,y){var a=biNumBits(x);var c=biNumBits(y);var d=y.isNeg;var q,r;if(a<c){if(x.isNeg){q=biCopy(bigOne);q.isNeg=!y.isNeg;x.isNeg=false;y.isNeg=false;r=biSubtract(y,x);x.isNeg=true;y.isNeg=d}else{q=new BigInt();r=biCopy(x)}return new Array(q,r)}q=new BigInt();r=x;var t=Math.ceil(c/w)-1;var e=0;while(y.digits[t]<A){y=biShiftLeft(y,1);++e;++c;t=Math.ceil(c/w)-1}r=biShiftLeft(r,e);a+=e;var n=Math.ceil(a/w)-1;var b=biMultiplyByRadixPower(y,n-t);while(biCompare(r,b)!=-1){++q.digits[n-t];r=biSubtract(r,b)}for(var i=n;i>t;--i){var f=(i>=r.digits.length)?0:r.digits[i];var g=(i-1>=r.digits.length)?0:r.digits[i-1];var h=(i-2>=r.digits.length)?0:r.digits[i-2];var j=(t>=y.digits.length)?0:y.digits[t];var k=(t-1>=y.digits.length)?0:y.digits[t-1];if(f==j){q.digits[i-t-1]=C}else{q.digits[i-t-1]=Math.floor((f*z+g)/j)}var l=q.digits[i-t-1]*((j*z)+k);var m=(f*B)+((g*z)+h);while(l>m){--q.digits[i-t-1];l=q.digits[i-t-1]*((j*z)|k);m=(f*z*z)+((g*z)+h)}b=biMultiplyByRadixPower(y,i-t-1);r=biSubtract(r,biMultiplyDigit(b,q.digits[i-t-1]));if(r.isNeg){r=biAdd(r,b);--q.digits[i-t-1]}}r=biShiftRight(r,e);q.isNeg=x.isNeg!=d;if(x.isNeg){if(d){q=biAdd(q,bigOne)}else{q=biSubtract(q,bigOne)}y=biShiftRight(y,e);r=biSubtract(y,r)}if(r.digits[0]==0&&biHighIndex(r)==0)r.isNeg=false;return new Array(q,r)}function biDivide(x,y){return biDivideModulo(x,y)[0]}function biModulo(x,y){return biDivideModulo(x,y)[1]}function biMultiplyMod(x,y,m){return biModulo(biMultiply(x,y),m)}function biPow(x,y){var b=bigOne;var a=x;while(true){if((y&1)!=0)b=biMultiply(b,a);y>>=1;if(y==0)break;a=biMultiply(a,a)}return b}function biPowMod(x,y,m){var b=bigOne;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)b=biMultiplyMod(b,a,m);k=biShiftRight(k,1);if(k.digits[0]==0&&biHighIndex(k)==0)break;a=biMultiplyMod(a,a,m)}return b}function BarrettMu(m){this.modulus=biCopy(m);this.k=biHighIndex(this.modulus)+1;var a=new BigInt();a.digits[2*this.k]=1;this.mu=biDivide(a,this.modulus);this.bkplus1=new BigInt();this.bkplus1.digits[this.k+1]=1;this.modulo=BarrettMu_modulo;this.multiplyMod=BarrettMu_multiplyMod;this.powMod=BarrettMu_powMod}function BarrettMu_modulo(x){var a=biDivideByRadixPower(x,this.k-1);var b=biMultiply(a,this.mu);var c=biDivideByRadixPower(b,this.k+1);var d=biModuloByRadixPower(x,this.k+1);var e=biMultiply(c,this.modulus);var f=biModuloByRadixPower(e,this.k+1);var r=biSubtract(d,f);if(r.isNeg){r=biAdd(r,this.bkplus1)}var g=biCompare(r,this.modulus)>=0;while(g){r=biSubtract(r,this.modulus);g=biCompare(r,this.modulus)>=0}return r}function BarrettMu_multiplyMod(x,y){var a=biMultiply(x,y);return this.modulo(a)}function BarrettMu_powMod(x,y){var b=new BigInt();b.digits[0]=1;var a=x;var k=y;while(true){if((k.digits[0]&1)!=0)b=this.multiplyMod(b,a);k=biShiftRight(k,1);if(k.digits[0]==0&&biHighIndex(k)==0)break;a=this.multiplyMod(a,a)}return b}if(o!=256){setMaxDigits(131);var N=new RSAKeyPair("010001",'',"0080745d6f3378effb7a4998d67a67b9d2f969c84b13bc6f5d640470705e778429aab2ca2ce753a1a470a1db1e451f13b2fde6f0714b8aea9e2e32e3c91142e57b31b856605c07f5b9537a7cd1ee8588cf7c1f4d08719da148ff0c5c3c0294464646556f513b009ff91914e55fb56d8a0f76cb82409f77fd6b4dd6855ab6482973");var O=encryptedString(N,encodeURIComponent(o));return O}};const hytc_sign=Vue.createApp({data(){return{message:'123456'}},computed:{after_message(){return get_HytcPwd(this.message)}}});hytc_sign.mount("#hytc_sign")

</script>