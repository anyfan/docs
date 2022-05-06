var birth_unsubsribe = function (id_key) {
    var that = this;
    var config = {
        api_url: 'https://mail-unsubscribe.vercel.app/api/',
        archive_part: '#/unsubscribe?',
        id_key: id_key,
        id_user: null
    };

    var user_data = {
        "_id": null,
        "name": null,
        "mail": null,
        "birthday": null,
        "receive_solar": null,
        "receive_lunar": null,
        "birth_y": null,
        "solar_cal": null,
        "lunar_cal": null,
        "lunar_text": null,
    };

    var checkForm = {
        birth: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
        mail: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        name: /^.{1,12}$/,
        id_user: /^[0-9a-fA-F]{24}$/
    };

    var module = {
        getQueryString: function (archive_part, name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            let url = location.hash.replace(archive_part, '');
            let r = url.match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            };
            return null;
        },
        getapi: async function (url) {
            let fetch_data = await fetch(url);
            let fetch_Json = await fetch_data.json();
            return fetch_Json;
        },
        showmsg: function (text) {
            alert(text);
        },
        getFullDate: function (key) {
            let mon = parseInt(user_data[key] / 100);
            let day = user_data[key] % 100;
            mon = (mon / 10 < 1) ? ('0' + mon) : mon;
            day = (day / 10 < 1) ? ('0' + day) : day;
            return (user_data.birth_y + '-' + mon + '-' + day);
        },
        url_Usersubmit: function () {
            let url_p = ['name', 'mail', 'birthday', 'receive_solar', 'receive_lunar'];
            let userid = 'update?id=' + user_data._id;
            let url = '';
            for (var i in url_p) {
                if (user_data[url_p[i]] != null) {
                    url += `&${url_p[i]}=${user_data[url_p[i]]}`;
                }
            }
            url = config.api_url + userid + url;
            return url;
        }
    };

    var action = {
        IntApp: async function () {
            await this.getUser();
            // console.log(user_data);
            if (config.id_user != user_data._id) {
                module.showmsg('你究竟是谁，想要干什么！！！')
            } else {
                that.action = this;
            }
        },
        UpAppData: function (app) {
            if (user_data._id != null) {
                app.solar = user_data.receive_solar;
                app.lunar = user_data.receive_lunar;
                app.name = user_data.name;
                app.mail = user_data.mail;
                app.birth_s = module.getFullDate("solar_cal");
                app.birth_l = user_data.lunar_text;
            }
        },
        getUser: async function () {
            if (config.id_user == null) {
                return;
            }
            let url = config.api_url + "?id=" + config.id_user;
            let data = await module.getapi(url);
            user_data = Object.assign(user_data, data['document']);
        },
        Usersubmit: async function (app) {
            if (user_data._id != null) {
                if (checkForm.name.test(app.name)) {
                    user_data.name = app.name;
                } else {
                    module.showmsg('名字最少1字符，最长12字符');
                    return;
                }
                if (checkForm.mail.test(app.mail)) {
                    user_data.mail = app.mail;
                } else {
                    module.showmsg('邮箱格式不对');
                    return;
                }
                if (checkForm.birth.test(app.birth_s)) {
                    user_data.birthday = app.birth_s;
                } else {
                    module.showmsg('日期格式不对');
                    return;
                }
                user_data.receive_solar = app.solar;
                user_data.receive_lunar = app.lunar;

                let url = module.url_Usersubmit();
                // console.log(url);
                await module.getapi(url);
                location.reload();


            }
        },

    };

    this.init = async function () {
        let id_user = module.getQueryString(config.archive_part, config.id_key);
        if (checkForm.id_user.test(id_user)) {
            config.id_user = id_user;
            await action.IntApp();
        } else {
            module.showmsg('无效的身份');
        }
        // console.log(config.id_user);
    };
};

async function int_m() {
    var birth_un = new birth_unsubsribe('user');
    const UnBirthApp = {
        data() {
            return {
                solar: null,
                lunar: null,
                name: null,
                mail: null,
                birth_s: null,
                birth_l: null
            }
        },
        methods: {
            updata_user() {
                birth_un.action.Usersubmit(this)
            }
        },
    };
    var vm = Vue.createApp(UnBirthApp).mount('#UnBirthApp');
    await birth_un.init();
    birth_un.action.UpAppData(vm);
};

int_m();