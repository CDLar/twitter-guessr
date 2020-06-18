import React from 'react';
import Twit from 'twit'

const T = new Twit({
    consumer_key: '6TOvo2guLcifmiedGbkcaBJin',
    consumer_secret: 'TXhoJPOKPK8s6CzjJJzTM9nlr5h8mvDupE5dCXq4Azvnl71iqj',
    access_token: '1263436539058515970-NV3Cmc1MOIPyiJurui7YZMKSg1QLTd',
    access_token_secret: '5u7njKasQESZf3VvGxc7U5Gw4qfYny8TLMqhjaCZoQtU1',
})

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    console.log(data)
  })

const Test = () => {
    return (
        <div>
            Hi
        </div>
    );
}

export default Test;