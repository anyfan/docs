# 淮阴师范学院健康填报

!> 本项目仅适用于淮阴师范学院（学生疫情信息收集—每日报平安）

1. 如有相关旅居史、接触史及发热状况，请手动上传表单并向学校汇报，配合学校防疫工作。
2. 所有内容禁止修改！造成相关防疫问责问题与作者无关。
3. 只可自己使用，禁止代他人使用或他人代使用！
4. 如不能遵守上述要求，请不要使用！

## 密码加密
使用统一身份验证平台进行登录，该平台密码默认为身份证后六位。可能是出于安全考虑，系统实际请求密码是输入密码加密后的密码。我们需要获取实际请求密码才能登录成功。

这里将加密算法搬了过来，将统一身份验证平台登录密码填入下框，即可获取加密后的密码。

（如不能正常显示请在[https://docs.anyfan.top/#/hytc_sign](https://docs.anyfan.top/#/hytc_sign)打开，或者在[github](https://github.com/anyfan/hytc-auto_cpdaily)下载此项目使用`index.html`获取）

<script>
    const app = Vue.createApp({
        data() {
            return {
                message: '123456'
            };
        },
        computed: {
            after_message() {
                return get_HytcPwd(this.message)
            }
        }
    })
    app.mount("#hytc_sign")
</script>

<div id="hytc_sign">
<input v-model="message" placeholder="你是我的waifu吗？">⬅编辑我

<pre data-lang="text"><code class="lang-text">{{ after_message }}</code></pre>
</div>

## python部署
使用之前你需要安装以下包
```python
pip3 install beautifulsoup4
```
接着你只需要传入相关参数就可以了
```python
python3 DailyXY.py 学号 加密后的密码
```
配合linux服务器`crontab`即可每天自动运行
### 简单的接口应用
你也可以通过请求接口来完成自定义时间，以下是php服务端简单是示例。`post`请求`id`,`pwd`,`tk`对应的值，接口返回程序运行结果。
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
## ios快捷指令
由于部分人没有服务器以及不懂相关的知识，于是我花了一天的时间编写了这个快捷指令。只要你拥有ios设备就可以运行。

在safair打开[https://www.icloud.com/shortcuts/53d0f9171c2a4a05b7e2f925f90c382a](https://www.icloud.com/shortcuts/53d0f9171c2a4a05b7e2f925f90c382a)

添加后按要求填写账号与密码，密码是加密后的密码。详情见 [密码加密](#密码加密)

试运行，期间允许所有的网站申请访问，提示密码错误请检查账号密码。

添加自动化，选择特定时间，依次选择 `添加操作`-`app`-`快捷指令`-`运行快捷指令`。然后选中`hytc健康填报`，最后关闭`运行前询问`。

## 其他

> 上次检查可用性 `22-04-12`