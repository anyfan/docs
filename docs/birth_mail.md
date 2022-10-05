<!-- [Birthday_Mail](https://cdn.jsdelivr.net/gh/anyfan/Birthday_Mail@master/README.md ':include') -->

# Birthday_Mail

这是利用`github-action`来自动发送生日祝福的项目。为了便于以后管理，这里简单的说明一下

## 数据存储(免费)

利用[https://www.mongodb.com/](https://www.mongodb.com/)提供 500MB 容量 的`mongodb`数据库存储数据，该项目数据存放在`api`库，`users`表中。

## 邮件推送（免费）

因为不想污染私人邮箱，所以使用阿里云邮件推送，每天免费 200 封

## 自动化运行(免费)

利用`github-action`,每天世界协调时`20:00`(北京时间`04:00`)运行脚本。

### 简要

由`python`构建。获取今天的日期，转换为农历。查找数据库中匹配的数据。读取邮件模板，遍历数据(替换邮件模板对应字段并调用阿里云邮件推送 api 发送邮件)。

### 配置说明

隐私配置在脚本仓库的`Repository secrets`中，其中

| 设置的 secret          | 说明                            |
| ---------------------- | ------------------------------- |
| **AL_ACCESSID**        | 阿里云`AccessKey ID`            |
| **AL_ACCESSKEYSECRET** | 阿里云`AccessKey Secret`        |
| **BARK_KEY**           | ios 信息推送 `bark`app 的身份码 |
| **MONGODB_URL**        | 携带身份权限的数据库地址        |

## 用户数据管理平台（免费）

如果我的朋友不想再次收到邮件，或者想修改生日的日期，他可以通过邮件里的 **退订** 链接来修改信息。这里就是那个平台。

### 简要

该页面主要功能验证用户的身份及填写的表单是否合法。包括昵称效验，邮箱效验，日期效验，身份码效验等。效验通过后调用后端 api 完成数据的更新（感觉数据效验应该放在后端比较好，算了，做都做了）。

为了方便我就直接部署在静态 docs 站点了。由`docsify`构建静态页面，`vue`提供数据交互，`js`实现表单验证及后端请求。

该页面地址在[https://docs.anyfan.top/#/unsubscribe](https://docs.anyfan.top/#/unsubscribe)。整个 docs 站点部署在[https://vercel.com/](https://vercel.com/)，因为 vercel 在国内的访问速度还不错。

## 用户数据管理后端 api（免费）

这个功能主要是为退订功能服务的。主要功能是通过唯一码查找数据，并修改数据。

### 简要

由于无服务器不能连接数据库，所以实际的数据库操作是请求数据库服务商提供的 api 完成的。不在前端直接请求该 api 是考虑到数据的安全性，该 api 有数据库的最高权限。别有用心之人总喜欢干些坏事 😠。

由 nodejs 构建，部署在 [vercel](https://vercel.com/)。vercel 不仅可以部署静态站点，也可以部署一些轻量的无服器函数(Serverless)。

### 配置说明

在项目管理里`Settings`-`Environment Variables`配置了环境变量`API_KEY`，其是[https://www.mongodb.com/](https://www.mongodb.com/)的`Data API`的`key`

在更新代码时，会遇到构建失败的情况，需要手动清除缓存部署。
