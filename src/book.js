// const { hideBin } = require('yargs/helpers')
// const yargs = require('yargs');
// const https = require('https')
// const fs = require('fs');

// let rp = require("request-promise")
// const cheerio = require('cheerio');
// const hostname = "orari-be.divsi.unimi.it"
// const path = "/PortaleEasyPlanning/biblio/index.php"
// rp = rp.defaults({jar: true, transform: (body) => cheerio.load(body)})

// //hour should be 10:00 or 15:00
// //service must be 26 (for normal booking) or 50 (for last-minute booking)
// async function book(infos, hour, service) {

//     infos['data_inizio'] = getDateDDMMYYYY(getWeekday(new Date()))
//     let options = {
//         uri: `https://${hostname}${path}`,
//         qs : {
//             "include": "form",
//             ...infos
//         }
//     };

//     var $ = await rp(options)
//     let form = $("#main_form")
//         .serializeArray()
//         .map(({name,value}) => ({[name]: value}))
//         .reduce((acc,curr) => Object.assign(acc,curr));
    
//     form['area'] = 25
//     form['servizio'] = 91//service
    
//     options = {
//         uri: `https://${hostname}${path}?include=timetable`,
//         method: "POST",
//         form
//     }
//     var $ = await rp(options) 
    
//     let res = $(".month-container").children().map((_,e) => e).toArray()
//     let index = res.reverse().findIndex(x => $(x).is(".interval-outer-div"))
//     var r = $(res[index]).find("p.slot_available").not(".slot_altri_impegni").map((_,e) => ({
//                 text: $(e).text().trim(),
//                 onClick: $(e).attr("onclick")
//             })).toArray()
    
//     var slot = search(hour, r)
//     if(slot == undefined || r.length == 0) {
//         console.log(infos['cognome_nome'] + ", sei già prenotato o sono finiti i posti")
//         return
//     }

//     form = {...form, ...getVals(slot['onClick'])}
//     form['durata_servizio'] = (form['end_time'] - form['timestamp']).toString()

//     form = {
//         _token: form['_token'],
//         area: 25,
//         data_inizio: '22-11-2021',
//         durata_servizio: '16200',
//         codice_fiscale: 'MDRTMS97T02F205Y',
//         cognome_nome: 'Amadori Tommaso',
//         email: 'tommi27@live.it',
//         servizio: 91,
//         timestamp: '1637676000',
//         end_time: '1637692200',
//         risorsa: '1942'
//     }
//     console.log(form)
//     options = {
//         uri: `https://${hostname}${path}?include=review`,
//         method: "POST",
//         form
//     }

//     var $ = await rp(options)
//     console.log($(".col-xs-12.form-padded").text())
//     // form = $(".col-xs-12 .col-sm-6").find("form")
//     //             .serializeArray()
//     //             .map(({name,value}) => ({[name]: value}))
//     //             .reduce((acc,curr) => Object.assign(acc,curr));
//     // options = {
//     //     uri: `https://${hostname}${path}?include=confirmed`,
//     //     method: "POST",
//     //     form
//     // }            

//     // var $ = await rp(options)

//     // console.log(infos['cognome_nome'] + ", " + $("h1.page-title").text())
// } 

// function getVals(str) {
//     var splitted = str.split("\n")

//     function getSingleVal(str) {
//         return str.substr(str.lastIndexOf('(\'') + 2, str.lastIndexOf(')') - 3 - str.lastIndexOf('(\''))
//     }

//     return {
//         'timestamp': getSingleVal(splitted[0]),
//         'end_time': getSingleVal(splitted[1]),
//         'risorsa': getSingleVal(splitted[2])
//     }
// }


// function search(key, myArray){
//     for (var i=0; i < myArray.length; i++) {
//         if (myArray[i].text === key) {
//             return myArray[i];
//         }
//     }
// }

// function getWeekday (d) {
//     let nextDay = new Date(d)
//     if(d.getDay() == 0) { //Sunday
//         nextDay.setDate(nextDay.getDate() + 1) //Monday
//     } else if(d.getDay() == 6) { //Saturday
//         nextDay.setDate(nextDay.getDate() + 2) //Monday
//     }    
//     return nextDay 
// }

// function getDateDDMMYYYY(d) {
//     let date = ("0" + d.getDate()).slice(-2);
//     let month = ("0" + (d.getMonth() + 1)).slice(-2);
//     let year = d.getFullYear();

//     return date + "-" + month + "-" + year
// }

// async function main() {
//     const argv = yargs(hideBin(process.argv)).argv
//     let paramsFile = fs.readFileSync('src/params.json')

//     let i_ragazzi = JSON.parse(paramsFile);
//     let service;

//     //SERVIZIO
//     //Piano terra = 92
//     //Piano terra, salottino = 91
//     //Last minute 1 = 50
//     //Primo piano 2 = 26
//     if (argv.lm) {
//         service = 50;
//         console.log('Last minute booking..');
//     } else {
//         service = 26;
//         console.log('Normal booking..');
//     }

//     for(const il_ragazzo of i_ragazzi) {
//         //await book(il_ragazzo, '10:00', service)
//         await book(il_ragazzo, '15:00', service)
//     }
// }

// main()