
import {  group, check } from 'k6'
import http from 'k6/http'
import { SharedArray } from "k6/data"
import { getRandomCity } from './constants.js'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// const departCitydata =  new SharedArray('get cityDepart', function(){
//   const file = JSON.parse(open('./depart.json'))
//   return file.cityDepart
// })

// const arriveCitydata =  new SharedArray('get cityArrive', function(){
//   const file = JSON.parse(open('./arrive.json'))
//   return file.cityArrive
// })


const BASE_URL = 'http://webtours.load-test.ru:1080'

const options = {}

let numFlight

export default function () {
getRoot();
postLogin();
getFlights();
postFindFlight();
postSelectFlight();
postPayment();
getHome();
};
  
export function getRoot () {

  const result = group('rootPage', () => {
    http.get(`${BASE_URL}/webtours/`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        Cookie: 'MSO=SID&1687039161',
        Host: 'webtours.load-test.ru:1080',
        'If-Modified-Since': 'Mon, 27 May 2013 12:20:22 GMT',
        'If-None-Match': '"900000001a214-16e-4ddb22c2e6d80"',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/webtours/header.html`, {
      headers: {
        Referer: 'http://webtours.load-test.ru:1080/webtours/',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/welcome.pl?signOff=true`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie: 'MSO=SID&1687039161',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/webtours/`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/webtours/images/hp_logo.png`, {
      headers: {
        Referer: `${BASE_URL}/webtours/header.html`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/webtours/images/webtours.png`, {
      headers: {
        Referer: `${BASE_URL}/webtours/header.html`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    const response = http.get(`${BASE_URL}/cgi-bin/nav.pl?in=home`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie: 'MSO=SID&1687039173',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?signOff=true`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    const template = response.body
    const rx = /name="userSession" value="([^"]+)"/
    const userSessionNum = template.match(rx)[1]

    http.get(`${BASE_URL}/WebTours/home.html`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?signOff=true`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/mer_login.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    return userSessionNum

  })

   return result
 }

 export function postLogin(){
  const userSessionNum = getRoot()
  
  group('Login', ()=> {

    http.post(
      `${BASE_URL}/cgi-bin/login.pl`,
      {
        userSession: userSessionNum,
        username: 'libin',
        password: '1234',
        'login.x': '66',
        'login.y': '9',
        JSFormSubmit: 'off',
      },
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: 'MSO=SID&1687039173',
          Host: 'webtours.load-test.ru:1080',
          Origin: `${BASE_URL}`,
          Referer: `${BASE_URL}/cgi-bin/nav.pl?in=home`,
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        },
      }
    )
    console.log(userSessionNum, 'postLogin')

    http.get(`${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/login.pl`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/login.pl?intro=true`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/login.pl`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/flights.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/itinerary.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/in_home.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/signoff.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })
 }

 export function getFlights(){
  group('Flights', ()=> {
    http.get(`${BASE_URL}/cgi-bin/welcome.pl?page=search`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?page=search`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/reservations.pl?page=welcome`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?page=search`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/in_flights.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/itinerary.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/home.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/signoff.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/button_next.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/reservations.pl?page=welcome`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })
 } 

const getOutboundFlights = () => {
  const response = http.post(
    `${BASE_URL}/cgi-bin/reservations.pl`,
    `
      TESTadvanceDiscount=0&depart=${getRandomCity()}&departDate=06%2F21%2F2023&arrive=${getRandomCity()}
      &returnDate=06%2F22%2F2023&numPassengers=1
      &seatPref=None&seatType=Coach&findFlights.x=68
      &findFlights.y=10&.cgifields=roundtrip%2CseatType%2CseatPref
    `,
    {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie:
            'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
          Host: 'webtours.load-test.ru:1080',
          Origin: `${BASE_URL}`,
          Referer: `${BASE_URL}/cgi-bin/reservations.pl?page=welcome`,
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    }
  )

  const template = response.body
  const regexp = /name="outboundFlight" value="(.*?)"/g;
  const result = [...template.matchAll(regexp)]
  const mappedResult = result.map(item => item[1])

  const outboundFlight = getRandomElement(mappedResult)

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

 // const randomOutboundFlights = 
 // console.error(randomOutboundFlights)

 
  return outboundFlight

}

 export function postFindFlight(){
  group('findFlight', ()=> {
  numFlight = getOutboundFlights()

    http.get(`${BASE_URL}/WebTours/images/button_next.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/reservations.pl`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })
 }



 export function postSelectFlight(){
  group('selectFlight', ()=> {
    console.warn(numFlight)
    http.post(
      `${BASE_URL}/cgi-bin/reservations.pl`,
      {
        outboundFlight: numFlight,
        numPassengers: '1',
        advanceDiscount: '0',
        seatType: 'Coach',
        seatPref: 'None',
        'reserveFlights.x': '29',
        'reserveFlights.y': '14',
      },
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie:
            'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
          Host: 'webtours.load-test.ru:1080',
          Origin: `${BASE_URL}`,
          Referer: `${BASE_URL}/cgi-bin/reservations.pl`,
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        },
      }
    )

    http.get(`${BASE_URL}/WebTours/images/button_next.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/reservations.pl`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })
 }

 export function postPayment(){ 
  group('Payment', ()=> {
    http.post(
      `${BASE_URL}/cgi-bin/reservations.pl`,
      {
        firstName: 'libin',
        lastName: 'seregey',
        address1: 'papanina',
        address2: 'Moskow',
        pass1: 'libin+seregey',
        creditCard: '',
        expDate: '',
        oldCCOption: '',
        numPassengers: '1',
        seatType: 'Coach',
        seatPref: 'None',
        outboundFlight: numFlight,
        advanceDiscount: '0',
        returnFlight: '',
        JSFormSubmit: 'off',
        'buyFlights.x': '34',
        'buyFlights.y': '7',
        '.cgifields': 'saveCC',
      },
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'max-age=0',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie:
            'MSO=SID&1687039173; MTUserInfo=firstName&libin&address2&Moskow&username&libin&hash&78&lastName&seregey%0A&address1&papanina&creditCard&&expDate&%0A',
          Host: 'webtours.load-test.ru:1080',
          Origin: `${BASE_URL}`,
          Referer: `${BASE_URL}/cgi-bin/reservations.pl`,
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        },
      }
    )

    http.get(`${BASE_URL}/WebTours/images/bookanother.gif`, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&username&libin&address2&Moskow&hash&78&address1&papanina&lastName&seregey%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/reservations.pl`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })
 }

 export function getHome(){
  group('inHome', ()=> {
  http.get(`${BASE_URL}/cgi-bin/welcome.pl?page=menus`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&username&libin&address2&Moskow&hash&78&address1&papanina&lastName&seregey%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=flights`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&username&libin&address2&Moskow&hash&78&address1&papanina&lastName&seregey%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?page=menus`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/cgi-bin/login.pl?intro=true`, {
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        Connection: 'keep-alive',
        Cookie:
          'MSO=SID&1687039173; MTUserInfo=firstName&libin&username&libin&address2&Moskow&hash&78&address1&papanina&lastName&seregey%0A',
        Host: 'webtours.load-test.ru:1080',
        Referer: `${BASE_URL}/cgi-bin/welcome.pl?page=menus`,
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/flights.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

    http.get(`${BASE_URL}/WebTours/images/itinerary.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

   http.get(`${BASE_URL}/WebTours/images/in_home.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })

   http.get(`${BASE_URL}/WebTours/images/signoff.gif`, {
      headers: {
        Referer: `${BASE_URL}/cgi-bin/nav.pl?page=menu&in=home`,
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      },
    })
  })  
 }


