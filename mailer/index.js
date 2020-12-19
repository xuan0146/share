const nodemailer = require('nodemailer');
const { default: Axios } = require('axios');
const schedule = require('node-schedule')

// 获取文案
const getMsg = () => {
    let url = 'https://du.shadiao.app/api.php';
    return Axios.get(url);
}

// 发送邮件函数
const sendEmail = async msg => {
    let myEmail = "xxx@163.com";  // 用户(自己)邮箱
    let passCode = "xxx";  // 用户(自己)邮箱授权码
    let mailTo = "xxx@xx.xxx";    // 对方邮箱
    // 用户账号信息
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',   // 服务器地址
        port: 25,   // 协议端口号
        auth: {
            user: myEmail,  // 用户邮箱
            pass: passCode  // 授权码
        }
    });
    // 发送内容编辑
    let mailMsg = await transporter.sendMail({
        from: myEmail,   // 发件人(自己)
        to: mailTo,   // 收件人
        subject: 'mailer测试：毒鸡汤文案',   // 标题
        text: msg
    })
    // 成功后打印下~
    console.log(`发送成功，发送内容为：${msg}`);
}

// 定时发送
// schedule.scheduleJob({
//     hour: 16,
//     minute: 23
// }, () => {
//     console.log(`启动任务：${new Date()}`);
//     getMsg().then(res => {
//         sendEmail(res.data);    // 发送邮件
//     })
// })

// 测试
console.log(`启动任务：${new Date()}`);
getMsg().then(res => {
    sendEmail(res.data);    // 发送邮件
})

