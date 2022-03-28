const sqlite3 = require('sqlite3').verbose();

//Instantiate new SQL DB Connection - Run Program to create DB
let database = new sqlite3.Database('./sql/serpent_node.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connection established')
});

//Create Table - DONE - Use rowid to get the a certain value at a certain ID
//database.run('CREATE TABLE checkouts(handler INTEGER PRIMARY KEY AUTOINCREMENT, setupname TEXT, fname TEXT, lname TEXT, address TEXT, address2 TEXT, city TEXT, zip TEXT, country TEXT, phonenumber TEXT, email TEXT, cardnumber TEXT, exp_mm TEXT, exp_yy TEXT, cvc TEXT, proxy Text, increments TEXT)');

let actions = new sqlite3.Database('./sql/attempts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Serpent Actions Initiated!')
});

var zipPo = parseInt('0');

//database.run(`UPDATE checkouts SET increments = 0 WHERE handler = 1`, function(err){
//    if (err) {
//        return console.error(err.message);
//    }
//});

let save = new sqlite3.Database('./sql/savekey.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Serpent Actions Initiated!')
});

let semtex = new sqlite3.Database('./sql/temp_store.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Semtex Primed')
});


//save.run('CREATE TABLE l_key(k_id INTEGER PRIMARY KEY AUTOINCREMENT, keys TEXT)');
save.each('SELECT * FROM l_key', function(err, row) {
    if (err) {
        return console.error(err.message);
    }
    console.log(row.keys)
});
//semtex.run('CREATE TABLE sticky(temp_id INTEGER PRIMARY KEY AUTOINCREMENT, retail_site TEXT)');



//database.run('ALTER TABLE checkouts ADD COLUMN exp_yy TEXT', function(err) {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Column Added!');
//});

//database.run('ALTER TABLE checkouts RENAME COLUMN handler TO handler INT PRIMARY KEY', function(err) {
//    if (err) {
//        return console.error(err.message);
//    }
//    console.log('Column Modified!');
//}); 

//var numberCo = parseInt('0');
//var merk = numberCo + 1;
//console.log(merk);