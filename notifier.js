const googlehome = require('google-home-notifier')

googlehome.ip("<GoogleHomeのIP>");
googlehome.device('ダイニング ルーム', 'ja'); 

googlehome.notify('こんにちは。私はグーグルホームです。', function(res) {
  console.log(res);
});