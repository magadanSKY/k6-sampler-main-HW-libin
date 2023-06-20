import http from 'k6/http';
import { group , check } from 'k6'
import { Trend } from 'k6/metrics'
import { SharedArray } from "k6/data"

const data =  new SharedArray('get users', function(){
    const file = JSON.parse(open('./users.json'));
    return file.users;
})

export const options = {
    //vus: 10,
    //duration: '5s',
    //iterations: 20,
    // discardResponseBodies: true, 
    scenarios: {
        first: {
            executor: 'ramping-arrival-rate',
            startRate: 11,
            exec: 'getBase',
            // rate: 10, 
            // duration:'10s',
            preAllocatedVUs: 50,
            maxVUs: 100,
            timeUnit: '1s',
             stages: [
                {duration: '5s', target: 20},
                // {duration: '10s', target: 20},
            ],
        },
            // second: {
            //     executor: 'ramping-arrival-rate',
            //     startRate: 11,
            //     exec: 'getFeatures',
            //     // rate: 10, 
            //     // duration:'10s',
            //     preAllocatedVUs: 50,
            //     maxVUs: 100,
            //     timeUnit: '1s',
            //      stages: [
            //         {duration: '20s', target: 10},

            //     ],
            // }
    },

    // stages: [
    //     {duration: '5s', target: 20},
    //     {duration: '10s', target: 20},
    //     {duration: '5s', target: 30},
    //     {duration: '5s', target: 30},
    //     {duration: '6s', target: 5},
    // ],


    // thresholds:{
    //     http_req_duration: ['p(95) < 200'],
    //     http_req_failed: ['rate<0.01'],
    // }
};

const BASE_URL = `https://${__ENV.MY_HOST}`

// const BASE_URL = 'https://test.k6.io/'


export default function() {

//     http.get(BASE_URL + '/contacts.php');

//    // console.log('Hello World!');

// const payload = {name: "Max"}

// let header = {
//     header: {'Content-Type' : 'application/json'}
getBase();
getFeatures();
};


// let resPost = http.post(BASE_URL + '/flip_coin.php', JSON.stringify(payload), header);
// check(resPost,{'status code is 200': (resPost) => resPost.status === 200})

// const title = resPost.html().find('head title').text();

// console.warn(title)

// };

export function getBase(){
    let resPost = http.get(BASE_URL + '/contacts.php');
    check(resPost,{'status 1 code is 200': (resPost) => resPost.status === 200})


    let random = Math.floor(Math.random()*data.length)
    let user = data[random]

    console.error(user)

    const payload = {name: "Max", second : user}

    let header = {
      header: {'Content-Type' : 'application/json'}
    }

    resPost = http.post(BASE_URL + '/flip_coin.php', JSON.stringify(payload), header);
check(resPost,{'status 2 code is 200': (resPost) => resPost.status === 200})
};

const myTrend = new Trend('my_trend');

export function getFeatures(){
    group('Login', () => {



       let resPost = http.get(BASE_URL + '/news.php', {tags:{my_tag: "API"}});
       check(resPost,{'status 3 code is no 300': (resPost) => resPost.status !== 300}, {my_tag: "my check news tag"})

       resPost = http.get(BASE_URL + '/browser.php');
       check(resPost,{'status /browser.php code is 200': (resPost) => resPost.status === 200})

      myTrend.add(resPost.timings.connecting, {my_tag: "timing connecting"})
    })
};