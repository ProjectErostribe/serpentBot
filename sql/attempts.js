const sqlite3 = require('sqlite3').verbose();

//Instantiate new SQL DB Connection - Run Program to create DB
//let db = new sqlite3.Database(':attempts', (err) => {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Connection established')
//});


//Now Connect to the new DB
let db = new sqlite3.Database('./sql/attempts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connection established')
});

