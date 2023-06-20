import http from 'k6/http'
import { group } from 'k6'
import { Trend } from 'k6/metrics'


export const options = {
        // vus: 100,
        // duration: '30s',
        // iterations: 1000,
    scenarios:{
        yaLoad: {
            executor: 'ramping-arrival-rate',
            startRate: 0,
            exec: 'getYandex',
            preAllocatedVUs: 50, 
            maxVUs: 100,
            timeUnit: '1m',
             stages: [
                {duration: '5m', target: 60},
                {duration: '10m', target: 60},
                {duration: '5m', target: 72},
                {duration: '10m', target: 72}
             ]
        },
        googleLoad: {
            executor: 'ramping-arrival-rate',
            startRate: 0,
            exec: 'getGoogle',
            preAllocatedVUs: 50, 
            maxVUs: 120,
            timeUnit: '1m',
             stages: [
                {duration: '5m', target: 120},
                {duration: '10m', target: 120},
                {duration: '5m', target: 144},
                {duration: '10m', target: 144}
             ]
            
        }
    }
}

// export default function() {
//     getYandex();
//     getGoogle ();
// }

const BASE_URL_ya = 'https://ya.ru'
const BASE_URL_google = 'http://google.com'

// const myTrend = new Trend('my_trend');
// const myTrendGoogle = new Trend('my_trend2')

export function getYandex (){
    group('getYandex', () => {
        http.get(`${BASE_URL_ya}/`, {tags:{my_rps: "yandex_RPS"}})

        // myTrend.add(getYandex.rps)
    })
}

export function getGoogle (){
    group('getGoogle', () => {
        http.get(`${BASE_URL_google}/`, {tags:{my_rps: "google_RPS"}})

        // myTrendGoogle.add(getGoogle.rps)
 
   })
}