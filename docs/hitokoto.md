# 一言（Hitokoto/ヒトコト）

灵感来自于https://hitokoto.cn/ 。功能模仿于https://api.imjad.cn/hitokoto.md 。

部分一言数据来源于https://github.com/hitokoto-osc/ ,其余数据来自网络。

## 调用方法

| GET | https://api.anyfan.top/hitokoto/ |
| :-- | -------------------------------: |

## 参数说明

| 参数名   | 含义                   | 默认                 |
| -------- | ---------------------- | -------------------- |
| `cat`    | `string` 一句话的类别  | 从所有数据中随机挑选 |
| `len` | `int` 一句话的长度限制 | `0`,不限制           |
| `encode` | `string` 返回数据格式  | `text`,文本          |

### 参数`cat`分类说明

| 参数值 | 含义           |
| ------ | -------------- |
| `h`    | 原一言数据库   |
| `d`    | 舔狗日记       |
| `j`    | 毒鸡汤         |
| `y`    | 社会语录       |
| `空`   | 不进行分类筛选 |

### 参数`encode`数据格式说明

| 参数值       | 含义                                |
| ------------ | ----------------------------------- |
| `json`       | 返回 JSON 格式数据                  |
| `js`         | 返回函数名为 hitokoto 的 JavaScript |
| `空`or`text` | 返回纯文本                          |

## 示列

##### 无任何参数

 * https://api.anyfan.top/hitokoto/ ⬇️

[](https://api.anyfan.top/hitokoto/ ':include :type=code text')

##### 最大长度10 + js格式

 * https://api.anyfan.top/hitokoto/?len=10&encode=js ⬇️

[](https://api.anyfan.top/hitokoto/?len=10&encode=js ':include :type=code js')

##### 舔狗日记 + 最大长度20 + json格式

 * https://api.anyfan.top/hitokoto/?cat=d&len=20&encode=json ⬇️

[](https://api.anyfan.top/hitokoto/?cat=d&len=20&encode=json ':include :type=code json')

