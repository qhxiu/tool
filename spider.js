const originRequest = require('request');
// server端的jquery
const cheerio = require('cheerio');
// 
const iconv = require('iconv-lite');

function request(url, callback) {
    const options = {
        url: url,
        encoding: null
    };
    originRequest(url, options, callback);
}

const url = `https://school.jledu.com/h5/studyGuidePC.jsp`;
request(url, function (err, res, body) {
    const html = iconv.decode(body, 'utf-8');
    // 用服务端的jquery把内容解析出来
    const $ = cheerio.load(html);
    console.log($(".study-container").html());
})

/* for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    // 通过request发http请求把html拿过来
    request(url, function (err, res, body) {
        const html = iconv.decode(body, 'gb2312');
        // 用服务端的jquery把内容解析出来
        const $ = cheerio.load(html);
        console.log($(".title_all h1").text());
    })
} */