const Twit = require('twit')
const fs = require('fs');

const config = {
    consumer_key: '6TOvo2guLcifmiedGbkcaBJin',
    consumer_secret: 'TXhoJPOKPK8s6CzjJJzTM9nlr5h8mvDupE5dCXq4Azvnl71iqj',
    access_token: '1263436539058515970-NV3Cmc1MOIPyiJurui7YZMKSg1QLTd',
    access_token_secret: '5u7njKasQESZf3VvGxc7U5Gw4qfYny8TLMqhjaCZoQtU1'
}
const T = new Twit(config);

T.get('favorites/list', { count: 200, screen_name: 'CDlarsen91' }, function (err, data, response) {
    const newData = Object.values(data).map((el) => [el.id_str, el.user.screen_name, el.user.name, el.user.profile_image_url])
    fs.writeFile('historicData.js', 'export const historicData = ' + JSON.stringify(newData), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Success')
    })
})




