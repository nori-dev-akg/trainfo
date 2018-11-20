const googlehome = require('google-home-notifier')
const client = require('cheerio-httpcli');

googlehome.ip("<GoogleHomeのIP>");
googlehome.device('ダイニング ルーム', 'ja');

const voice = [];

client.fetch('https://transit.yahoo.co.jp/traininfo/detail/22/0/') // 京浜東北線
    .then(function (result) {
        check(result);
        return client.fetch('https://transit.yahoo.co.jp/traininfo/detail/29/0/'); // 横須賀線
    })
    .then(function (result) {
        check(result);
        return client.fetch('https://transit.yahoo.co.jp/traininfo/detail/125/0/'); // 相鉄本線
    })
    .then(function (result) {
        check(result);
    })
    .catch(function (err) {
        console.log(err);
    })
    .finally(function () {
        var text = voice.join();
        if (text.length > 0) {
            googlehome.notify(text, function (res) {
                console.log(res);
            });
        }
    });

function check(result) {
    if (!result.error) {
        var $ = result.$;
        var ti = $('h1.title').text().trim();
        var sv = $('#mdServiceStatus > dl > dt').text().trim();
        var tr = $('#mdServiceStatus > dl > dd.trouble').text().trim();
        if (!sv.match('平常運転')) {
            voice.push(ti + tr);
        }
        console.log(ti);
        console.log(sv);
        console.log(tr);
    }
}
