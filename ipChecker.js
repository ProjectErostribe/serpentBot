const Puppeteer = require(`puppeteer`);
const iPhone = Puppeteer.devices[`iPhone 6`];
const request = require('request');

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

const userIP = document.querySelector('#insertIP').value;

 async function getmyIp() {
    const browser = await Puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.emulate(iPhone, {isMobile: true, userAgent: ''});
    await page.goto('https://httpbin.org/ip');

    const getIP = await page.$(`body > pre`);
    const seeIP = await getIP.evaluate(el => el.textContent);

    var cleanupIP = seeIP.replace(/[^0-9\.]+/g, "");
    //console.log('Your IP:'+" "+cleanupIP);
    document.querySelector('#myIP').textContent = 'Your IP:' +" "+ cleanupIP;
    browser.close();
};

function ipCheck() {

    request({
        'url': 'https://www.whatsmyip.org',
        'method': 'GET',
        'proxy': `${userIP}`//Needs User Input
    }, function (error, Response, body) {
        if (!error && Response.statusCode == 200) {
            console.log('Good IP');
            document.querySelector('#ipResult').textContent = 'Good IP';
            document.querySelector('#ipResult').style.color = 'green';
        } else {
            console.log('bad IP')
            document.querySelector('#ipResult').textContent = 'Bad IP'
            document.querySelector('#ipResult').style.color = 'red';
        }
    });
}