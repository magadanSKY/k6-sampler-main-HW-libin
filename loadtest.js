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

export default function() {
    getYandex();
}

const BASE_URL_ya = 'https://ya.ru'
const BASE_URL_google = 'http://google.com'

const yaTagRps = new Trend('my_yaTagRps')
const googleTagRps = new Trend('my_googleTagRps')

export function getYandex (){
    group('getYandex', () => {
        http.get(`${BASE_URL_ya}/`)

        yaTagRps.add(getYandex.rps, {my_yaTagRps: "yaRPS"})
    })
}

export function getGoogle (){
    group('getGoogle', () => {
        http.get(`${BASE_URL_google}/`)
        googleTagRps.add(getGoogle.rps, {my_googleTagRps: "googleRPS"})
    })
}