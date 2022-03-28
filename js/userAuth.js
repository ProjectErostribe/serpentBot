//All User Auth Information Goes Here
const { Connection, Request } = require("tedious"); //Cloud
var sqlite3 = require('sqlite3').verbose(); //Local

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
/* For key handling */
let save = new sqlite3.Database('./sql/savekey.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Serpent Actions Initiated!')
});

/* Remove Configs Before Pushing To Public GIT REPO */
const config = {
  authentication: {
    options: {
      userName: "", //For security, import string and funnel through a constant
      password: ""  //For security, import string and funnel through a constant
    },
    type: "default"
  },
  server: "raiserver.database.windows.net", 
  options: {
    database: "", 
    encrypt: true
  }
};

const connection = new Connection(config);

connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    //authEntry();
    //motd_message();
  }
}); 


connection.connect();

function authEntry(){

  //Establish Connection
  
  let license_Keys = document.querySelector('.authEnt').value;
  const sql = `SELECT licenseKey FROM [customerRealm_1] WHERE licenseKey = '${license_Keys}'`;

  const request = new Request(sql, (err, rowCount) => {
    if (err) {
      console.log('error occured!');
      throw err;
    }

    console.log('Button Clicked');
    
//Create an update database function for housing the used license key. 
//Then create an invicible label that displays the license key, so that when the user exits, you can use that label to verify the used license key to end that users session

  });
  

  //Emit Returned Value
  request.on("row", columns1 => { columns1.forEach(customerLicense => { console.log(customerLicense.value); 
  
    if(customerLicense.value == license_Keys)
    {

      request.on('requestCompleted', function () {
        // Next SQL statement.
        save.run('UPDATE l_key SET keys = ? WHERE k_id = 1', [license_Keys], function(err){
            if(err){
                return console.error(err.message);
            }
        });
        checkSesh();
        //motd_message();
      });

    } else {
      //connection.close()
      document.querySelector('#responseMat').style.display = 'block';
      document.querySelector('#responseMat').textContent = 'Invalid Code, Try Again';
      sleep(3000);
      location.reload();
    } }); });
  
  
  


    
    


  connection.execSql(request);
  //connection.close();
}

function checkSesh(){
  let license_Keys = document.querySelector('.authEnt').value;
  const sql = `SELECT activeStatus FROM [customerRealm_1] WHERE licenseKey = '${license_Keys}'`;

  const request = new Request(sql, (err, rowCount) => {
    if (err) {
      console.log('error occured!');
      throw err;
    }
    
    //console.log(`retrieved ${license_Keys}'s' license key!`)
    //connection.close();
    

  });

  //Emit Returned Value
  request.on("row", columns2 => { columns2.forEach(sesh => { console.log(sesh.value);
    
    if(sesh.value != true)
    {
      window.location.href = './serpentbotui.html';
      
      request.on('requestCompleted', function () {
        createSesh();
        //motd_message();
      });

    } else {
      document.querySelector('#responseMat').style.display = 'block';
      document.querySelector('#responseMat').textContent = 'This code is already in use';
    } });});
    

   connection.execSql(request);
}



function createSesh(){
  let license_Keys = document.querySelector('.authEnt').value;
  const sql = `UPDATE [customerRealm_1] SET activeStatus = 'True' WHERE [licenseKey] = '${license_Keys}'`;

  const request = new Request(sql, (err, rowCount) => {
    if (err) {
      console.log('error occured!');
      throw err;
    }
    //console.log(`retrieved ${license_Keys}'s' license key!`)
    //connection.close();
    

  });

  //Emit Returned Value
  request.on("row", columns2 => { columns2.forEach(createS => { createS.value;
    
    if(createS.value == true)
    {
      console.log('Session Created');
      
    } else {

    }
    
  });});

   connection.execSql(request);
}

function endSesh(){
    save.each('SELECT keys FROM l_key WHERE k_id = 1', function(err, row){
        if(err){
            return console.error(err.message);
        }
        /* GET ENTERED KEY */
        
        var key_in_sesh = row.keys;
        console.log(key_in_sesh);
        const sql = `UPDATE [customerRealm_1] SET activeStatus = 'False' WHERE [licenseKey] = '${key_in_sesh}'`;
  
        const request = new Request(sql, (err, rowCount) => {
          if (err) {
            console.log('error occured!');
            throw err;
          }

          //console.log(`listening`)
          //connection.close();
          //window.location.reload();
          save.run('UPDATE l_key SET keys = 0 WHERE k_id = 1', function(err){
            if(err){
                return console.error(err.message);
            }
            console.log('done')
            window.location.href = './serpentAuth.html';
          });
      
        });
    
        //Emit Returned Value
        //request.on("row", columns2 => { columns2.forEach(destroyS => { destroyS.value;
        //
        //  if(destroyS.value == false)
        //  {//Reload page after destroyed
        //    window.location.href = './serpentAuth';
        //
        //  }
        //});});
    
         connection.execSql(request);

    });
}

function destroySesh(){
    let license_Keys = document.querySelector('.authEnt').value;
    const sql = `UPDATE [customerRealm_1] SET activeStatus = 'False' WHERE [licenseKey] = '${license_Keys}'`;
  
    const request = new Request(sql, (err, rowCount) => {
      if (err) {
        console.log('error occured!');
        throw err;
      }
      
      //console.log(`retrieved ${license_Keys}'s' license key!`)
      //connection.close();
      window.location.reload();
  
    });
  
    //Emit Returned Value
    request.on("row", columns2 => { columns2.forEach(destroyS => { destroyS.value;
      
      if(destroyS.value == false)
      {//Reload page after destroyed

        window.location.href = './serpentAuth';
  
      }
      
    });});
  
     connection.execSql(request);
  
  
  }