var sqlite3 = require('sqlite3').verbose();
const Puppeteer = require('puppeteer');
const iPhone = Puppeteer.devices['iPhone 11'];
var schedule = require('node-schedule');


/* START Global DB instantiation for UI */
let db = new sqlite3.Database('./sql/serpent_node.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connection Established')
});


let action = new sqlite3.Database('./sql/attempts.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connection Established')
});


/* END Global instantiation of values from UI */

// -- \\

/* START Adding Rows onto table */

function deleteRow(clicked_className){ /* Deletes row at this handler ID */
    var classN = clicked_className;
    var lastchar = classN.substr(classN.length - 1);

    db.run(`DELETE FROM checkouts WHERE handler = ?`, lastchar, function(err) {
        if (err) {
            return console.error(err.message);
        }
 
        //console.log(`Handler ${handler} has been created`);
 
    });

    document.location.reload(true);
}

function addprof(){
    document.querySelector('.pBox').style.display = 'block';
}
/* END Adding Rows onto table */

// -- \\

/* START Basic Button Functions */
function _profiles(){ /* Opens add profile form */
    document.querySelector('.pBox').style.display = 'flex';
}

function close_prof(){ /* Closes out of the add profile form */
    document.querySelector('.pBox').style.display = 'none';
}

function cancel_edit(){ /* Closes out the edit form */
    document.querySelector('.pBox-edit').style.display = 'none';
    document.querySelector('.crtprof').disabled = false;
    
}

function open_edit(clicked_className){ /* Shows all data on the edit form via onload method */
    document.querySelector('.pBox-edit').style.display = 'flex';
    document.querySelector('.crtprof').disabled = true;
   
    var classN = clicked_className;
    var lastchar = classN.substr(classN.length - 1);
    //document.querySelector(`#edit-btn${2}`)

    db.serialize(() => {
        db.each(`SELECT * FROM checkouts WHERE handler = ?`,lastchar, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            document.querySelector('.setupName2').value = row.setupname;
            document.querySelector('.fName2').value = row.fname;
            document.querySelector('.lName2').value = row.lname;
            document.querySelector('.email2').value = row.email;
            document.querySelector('.phonenum2').value = row.phonenumber;
            document.querySelector('.address2').value = row.address;
            document.querySelector('.address2_2').value = row.address2;
            document.querySelector('.city2').value = row.city;
            document.querySelector('.zipcode2').value = row.zip;
            document.querySelector('.country2').value = row.country;
            document.querySelector('.cardnum2').value = row.cardnumber;
            document.querySelector('.expiry_month2').value = row.exp_mm;
            document.querySelector('.expiry_year2').value = row.exp_yy;
            document.querySelector('.cvc2').value = row.cvc;
            document.querySelector('.ipproxy2').value = row.proxy;
            
        });
    });

    document.querySelector('.edit_handlerId').textContent = lastchar; /* Needed for the update function in the edit_prof() function */
 
}

function edit_prof(){ /* Updates all values on the edit form */
   //Needs an update functions

   var idHandler = document.querySelector('.edit_handlerId').textContent; /* Was instantiated in the open_edit() function. Also, opacity was dropped to 0 in the serpentBot.css Ln 51. */
   var sql = `UPDATE checkouts SET setupname = ?, fname = ?, lname = ?, email = ?, phonenumber = ?, address = ?, address2 = ?, city = ?, zip = ?, country = ?, cardnumber = ?, exp_mm = ?, exp_yy = ?, cvc = ?, proxy = ? WHERE handler = ${idHandler}`;

   var setupName = document.querySelector('.setupName2').value;
   var fName = document.querySelector('.fName2').value;
   var lName = document.querySelector('.lName2').value;
   var email = document.querySelector('.email2').value;
   var phonenum = document.querySelector('.phonenum2').value;
   var address = document.querySelector('.address2').value;
   var address2 = document.querySelector('.address2_2').value;
   var city = document.querySelector('.city2').value;
   var zipcode = document.querySelector('.zipcode2').value;
   var country = document.querySelector('.country2').value;
   var cardnum = document.querySelector('.cardnum2').value;
   var expM = document.querySelector('.expiry_month2').value;
   var expY = document.querySelector('.expiry_year2').value;
   var cvc = document.querySelector('.cvc2').value;
   var ipproxy = document.querySelector('.ipproxy2').value;
   //console.log(idHandler);
   var userData = [setupName, fName, lName, email, phonenum, address, address2, city, zipcode, country, cardnum, expM, expY, cvc, ipproxy];
   //db.run(`UPDATE checkouts SET fname = ? WHERE handler = ?`, [fName, lastchar], function(err) {
   // if (err) {
   //     return console.error(err.message);
   // }
//
   // //console.log(`Handler ${handler} has been created`);
   //});
    
   db.run(sql, userData, function(err) {
    if (err) {
        return console.error(err.message);
    }

    //console.log(`Handler ${handler} has been created`);
   });

   document.querySelector('.pBox-edit').style.display = 'none';
   
}

function save_prof(){ /* Saves all data on the add row form */
   //let handler =  document.querySelector('') Need to create a handler element in the UI
   let setupName = document.querySelector('.setupName').value;
   let fName = document.querySelector('.fName').value;
   let lName = document.querySelector('.lName').value;
   let email = document.querySelector('.email').value;
   let phonenum = document.querySelector('.phonenum').value;
   let address = document.querySelector('.address').value;
   let address2 = document.querySelector('.addresstwo').value;
   let city = document.querySelector('.city').value;
   let zipcode = document.querySelector('.zipcode').value;
   let country = document.querySelector('.country').value;
   let cardnum = document.querySelector('.cardnum').value;
   let expiryM = document.querySelector('.expiry_month').value;
   let expiryY = document.querySelector('.expiry_year').value;
   let cvc = document.querySelector('.cvc').value;
   let ipproxy = document.querySelector('.ipproxy').value;

   

   db.run(`INSERT INTO checkouts(setupname, fname, lname, email, phonenumber, address, address2, city, zip, country, cardnumber, exp_mm, exp_yy, cvc, proxy) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [setupName, fName, lName, email, phonenum, address, address2, city, zipcode, country, cardnum, expiryM, expiryY, cvc, ipproxy], function(err) {
       if (err) {
           return console.error(err.message);
       }

       //console.log(`Handler ${handler} has been created`);

   });
   document.querySelector('.pBox').style.display = 'none';
   document.location.reload(true);

}
/* END Basic Button Functions */

// -- \\

/* START On Load Functions */

function dataLoad(){ /* Loads all user data on page entry */
    db.serialize(() => {
        db.each(`SELECT * FROM checkouts`, (err, row) => {
            if (err) {
                console.error(err.message);
            }

            var rHandler = row.handler;
            var rSetup = row.setupname;
            var rProxy = row.proxy;
            
            const hlr = [rHandler];
            const setup = [rSetup];
            const prox = [rProxy];
            
            
            hlr.forEach(function(handle, index){
                const hlr_setup = setup[index];
                const hlr_proxy = prox[index];
                let tblHtml = '<tr>'+ `<td id="tdHandler${handle}">`+handle+'</td>'+'<td>' + `<span id="tdSetup${handle}">${hlr_setup}</span>` + '</td>'+`<td id="tdProxy${handle}">${hlr_proxy}</td>`+ `<td><input class="edit-Btn${handle}" type="button" value="Edit" onclick="open_edit(this.className);"><input class="delete-Btn${handle}" type="button" value="- Remove" onclick="deleteRow(this.className);"></td>` + '</tr>';
                let block = document.getElementById('wholeTable').getElementsByClassName('tableBod')[0];
                //New Row
                var newRow = block.insertRow(block.rows.length);
                newRow.innerHTML = tblHtml;
            });


        });
    });
}
/* END On Load Functions */



/* On Load Function START */
function bootup(){
    var _botspeed = document.querySelector('#paceSelect');
    var sltBotspeed = ['slow','normal','fast'];

    var _size = document.querySelector('#sizeSelect');
    var sltSize = ['7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','14'];

    var _profiles = document.querySelector('#accountSelect');
    var sltProf = [];

    var _sch = document.querySelector('#taskSched');
    var sltTime = ['1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm'];

    //Bot Speed
    for(var i = 0; i < sltBotspeed.length; i++){
        var pace = sltBotspeed[i];
        var speedOp = document.createElement('option');
        speedOp.textContent = pace;
        speedOp.value = pace;
        _botspeed.appendChild(speedOp);
    }


    //Item Size
    for(var i = 0; i < sltSize.length; i++){
        var gtsize = sltSize[i];
        var shwsize = document.createElement('option');
        shwsize.textContent = gtsize;
        shwsize.value = gtsize;
        _size.appendChild(shwsize);
    }

    //Profiles
    db.serialize(() => {
        db.each(`SELECT * FROM checkouts`, (err, row) => {
            if (err) {
                console.error(err.message);
            }

            var rSetup_ = row.setupname
            document.querySelector('.incrementId').textContent = 0; //This is for the attempt content management in each attempt ID.
            //console.log(row.increment);
            var setup_ = [rSetup_];
            
            for(var i = 0; i < setup_.length; i++){
                var gtprof = setup_[i];
                var shwprof = document.createElement('option');
                shwprof.textContent = gtprof;
                shwprof.value = gtprof;
                _profiles.appendChild(shwprof);
            }


        });
        
    });

    

    //RA History
    action.serialize(() => {
        action.each(`SELECT * FROM attempts`, (err, row) => {
            if (err) {
                console.error(err.message);
            }

            var rAttempt = row.a_id;
            var rSite = row.retail_site;
            var rDate = row.a_date;
            var rTask = row.task_stat;
            var rItem = row.a_item;
            var rTotal = row.order_total;
            
            const att = [rAttempt];
            const site = [rSite];
            const date = [rDate];
            const task = [rTask];
            const items = [rItem];
            const totals = [rTotal];
            
            
            att.forEach(function(attempt, index){
                const att_site = site[index];
                const att_date = date[index];
                const att_task = task[index];
                const att_items = items[index];
                const att_totals = totals[index];
                let tblHtml = `<tr>`+`<td id="attId${attempt}">${attempt}</td>`+`<td><div class="order-owner${attempt}"><span>${att_site}</span></div></td>`+`<td id='tdDate${attempt}'>${att_date}</td>`+`<td><span class="bot-status${attempt}">${att_task}</span></td>`+`<td><div class="target-item${attempt}"><span>${att_items}</span></div></td>`+`<td class="total-counter${attempt}">${att_totals}</td>`+`</tr>`
                let block = document.getElementById('ra-table').getElementsByClassName('at-bod')[0];
                //New Row
                var newRow = block.insertRow(block.rows.length);
                newRow.innerHTML = tblHtml;
            });


        });
    });

    //Schedular
    for(var i = 0; i < sltTime.length; i++){
        var gttime = sltTime[i];
        var shwTime = document.createElement('option');
        shwTime.textContent = gttime;
        shwTime.value = gttime;
        _sch.appendChild(shwTime);
    }

}
/* Dropdown Options END */



// -- \\

/* On Change Functions START */
function speedChange(){
    if (document.querySelector('#paceSelect').value === 'fast'){
        document.querySelector('.serpentResponse').style.display = 'block';
    } else {
        if (document.querySelector('#paceSelect').value !== 'fast'){
            document.querySelector('.serpentResponse').style.display = 'none';
        }
    }
    console.log(document.querySelector('#paceSelect').selectedIndex);
}


function sizeChange(){
    //onchange funcs
}

function profileChange(){
    //onchange funcs
}
/* On Change Functions END */

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function taskHold(){
    var x = parseInt(document.querySelector('.theClock').textContent);
    var intervalID = setInterval(function() {
        
        //console.log('This is code');
        x -= 1;
        console.log(x)
        
        if (x === 0) {
            //clearInterval(intervalID);
            document.querySelector('.refreshBtn').style.display = 'block';
        }
    }, 1000);
}

// -----------------BOT ATTACHMENT START------------------- \\


async function awakenBot(){
    document.querySelector('.serpentResponse').value = 'Bot is now awakened, closing/changing this screen will cancel all /n tasks'
    var _setup;
    var _fname;
    var _lname;
    var _address;
    var _address2;
    var _city;
    var _zip;
    var _country; //This needs to be state
    var _phonenum;
    var _email;
    var _cardnum;
    var _expiryM;
    var _expiryY;
    var _cvc;
    var _proxy;

    var profSel = document.querySelector('#accountSelect').value;
    var sizeSel = document.querySelector('#sizeSelect').selectedIndex;
    var speedSel = document.querySelector('#paceSelect').value;
    var timeSel = document.querySelector('#taskSched').selectedIndex;
    var itemLink = document.querySelector('.linkInput').value;
    var stat;
    var speed;
    if(speedSel == 'slow'){
       speed = 1000; 
    }

    if(speedSel == 'normal'){
        speed = 400;
    }

    if(speedSel == 'fast'){
        speed = 0;
    }
    

    db.each(`SELECT * FROM checkouts WHERE setupname = ?`,profSel, async function(err, row) {
        if (err) {
            console.error(err.message);
        }
    
        _setup = row.setupname;
        _fname = row.fname;
        _lname = row.lname;
        _address = row.address;
        _address2 = row.address2;
        _city = row.city;
        _zip = row.zip;
        _country = row.country; //This needs to be state
        _phonenum = row.phonenumber;
        _email = row.email;
        _cardnum = row.cardnumber;
        _expiryM = row.exp_mm;
        _expiryY = row.exp_yy;
        _cvc = row.cvc;
        _proxy = row.proxy;
        var incId = row.increments;
        
        // BOT PREREQUISITES \\

     /* Attempt Data Initiation */
     var retail_ = 'Foot Locker'; //Create UI Dropdown in future developments
     var dateStamp = new Date().toISOString().slice(0,10)
        
     action.run(`INSERT INTO attempts(retail_site, a_date) VALUES(?,?)`, [retail_, dateStamp], function(err) {
         if (err) {
             return console.error(err.message);
         }
        
     });
    
     if (document.querySelector(`.incrementId`).textContent == '0'){
         incId = parseInt(document.querySelector(`.incrementId`).textContent) + 1; //Used to help scraped data to correspond with the proper attempt
     } else {
         incId = parseInt(document.querySelector(`.incrementId`).textContent) + 1; //Used to help scraped data to correspond with the proper attempt
     }
    
    
     db.run(`UPDATE checkouts SET increments = ? WHERE handler = 1`, [incId], function(err){
         if (err) {
             return console.error(err.message);
         }
     });
     
     document.querySelector(`.incrementId`).textContent = incId;
    
     // BOTTING PROCESS BEGINS \\
    
     let ipProx = '';
     const browser = await Puppeteer.launch({headless: false, slowMo:speed, ignoreDefaultArgs: ["--enable-automation"],args: ['--disable-infobars',`--proxy-server=${_proxy}`]});
     const page = await browser.newPage();
     await page.emulate(iPhone, {isMobile: true, userAgent: ''});

     //Start Cron Scheduling here
     schedule.scheduleJob(`0 ${timeSel} * * *`, async function(){
     //Need an if else statement for "Please Don't Refresh" Pop up screen. here
     if(document.querySelector('.waiting').style.display == 'none'){
        document.querySelector('.waiting').style.display == 'block';
        taskHold();
     }   
     await page.goto(`${itemLink}`); //needs to be placed inside of a variable
     //page.waitForNavigation({waitUntil: 'networkidle0'}); //Good for when the page navigates to a cart or something similar
     /* Closing the policy updates and cookie tracker */
     await page.setJavaScriptEnabled(true);
     page.setDefaultTimeout(2000000);
     
     try{
        /* Read sneaker name and store it into database */
     let _sneakername = await page.$('#pageTitle > span.ProductName-primary')
     let _getsneakername = await _sneakername.evaluate(el => el.textContent);
    
     /* Saves sneaker name to the libary */
     action.run(`UPDATE attempts SET a_item = ? WHERE a_id = ${incId}`, [_getsneakername], function(err) {
         if (err) {
             return console.error(err.message);
         }
     });
     }
     catch{
        stat = 'Warning:20';
        //document.querySelector('.bot-status').style.background = 'yellow';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
     }

     try{
       /* Select size and click add to cart */
     await page.tap(`#ProductDetails > div.ProductDetails-form__info > fieldset > div > div:nth-child(${sizeSel}) > label > span`);
     await page.tap('#ProductDetails > ul > li.col.col--secondary > button');
     
     /* Waiting in line */
     await page.waitForXPath('//*[@id="ProductDetails"]/ul/li[2]');
    }
     catch{
        stat = 'Failed:21';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        await browser.close();
    }

     try{
      /* View Cart via cart icon and clicks guest checkout */
     await page.tap('#app > div.footlocker-web-app.FL > header > nav.c-header__main.row.row--always > div.col.row.row--sm.c-header__icon-container > a');
     await page.tap('#main > div > div.Page-body.constrained > div > div > div:nth-child(2) > div > div:nth-child(2) > a')    
    }
     catch{
        stat = 'Failed:22';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        await browser.close();
    }

     try{
      /* Contact information */
     await page.type('#ContactInfo_text_firstName', `${_fname}`, {delay: 100});
     await page.type('#ContactInfo_text_lastName', `${_lname}`, {delay: 100});
     await page.type('#ContactInfo_email_email', `${_email}`, {delay: 100});
     await page.type('#ContactInfo_tel_phone', `${_phonenum}`, {delay: 100});
     await page.tap('#ContactInfo > div.Buttons.col.col-full > button'); //Continue   
    }
     catch{
        stat = 'Failed:23';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        await browser.close();
    }

     try{
     /* Package Options - Default Shipping Option 5-6 Business Days */
     await page.type('#ShippingAddress_text_line1', `${_address}`, {delay: 100});
     await page.type('#ShippingAddress_text_line2', `${_address2}`, {delay: 100});
     await page.type('#ShippingAddress_text_postalCode', `${_zip}`, {delay: 100});
     await sleep(5000); //Give time for the "When would you like this delivered text to show"
     await page.type('#step2 > div.Checkout-fulfillment > div.ButtonWrapper.gutter--flush > button'); //Continue     
    }
     catch{
        stat = 'Failed:24';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        await browser.close();
    }

     try{
     /* Payment Entry */
     await sleep(10000);
     await page.type('#encryptedCardNumber', `${_cardnum}`, {delay: 100});
     await page.type('#encryptedExpiryMonth', `${_expiryM}`, {delay: 100});
     await page.type('#encryptedExpiryYear', `${_expiryY}`, {delay: 100});
     await page.type('#encryptedSecurityCode', `${_cvc}`, {delay: 100});    
    }
     catch{
        stat = 'Failed:25';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
        await browser.close();
    }

     try{
     /* Get Order Total */       
     let _orderT = await page.$('#main > div > div.Page-body.constrained > div > div > div > div.Sticky-inner.isSticky > div > div.OrderSummary > dl > div:nth-child(4) > dd');
     let orderTotal = await _orderT.evaluate(el => el.textContent); //Store in DB
     await sleep(3000);    
    }
     catch{
        stat = 'Warning:26';
        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });
    }

     try{
     /* Place Order */
     await page.tap('#main > div > div.Page-body.constrained > div > div > div > div.Sticky-inner.isSticky > div > div.PlaceOrder.c-place-order-button > button');
     //UPDATE STATUS HERE BASED ON INCREMENT 
     await sleep(20000);

     stat = 'Success';
        //document.querySelector('.bot-status').style.background = 'green';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });

     await browser.close();    
    }
     catch{
        stat = 'Failed';

        //document.querySelector('.bot-status').style.background = 'red';
        action.run(`UPDATE attempts SET task_status = ? WHERE a_id = ${incId}`, [stat], function(err) {
            if (err) {
                return console.error(err.message);
            }
        });

        await browser.close();
    }

    });
     
     

    });

};

/* Refresh Bot */
function refreshBot(){
    location.reload();
};

/* Increment Updating */

function loadInc(){

    db.each(`SELECT increments FROM checkouts WHERE handler = 1`, function(err, row) {
        if (err) {
            console.error(err.message);
        }
    
        document.querySelector('.incrementId').textContent = row.increments;
    });

};
// -----------------BOT ATTACHMENT END------------------- \\