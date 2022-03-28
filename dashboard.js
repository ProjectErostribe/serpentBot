const {app, Menu, ipcMain, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

/* Clear session on closing  */
const { Connection, Request } = require("tedious"); //Cloud
var sqlite3 = require('sqlite3').verbose(); //Local


let save = new sqlite3.Database('./sql/savekey.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Serpent Actions Initiated!')
});

const config = {
  authentication: {
    options: {
      userName: "ceorazan", // update me
      password: "@T070aubk1" // update me
    },
    type: "default"
  },
  server: "raiserver.database.windows.net", // update me
  options: {
    database: "mimik_licenseKeys", //update me
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


//Software Build
//const isMac = process.platform === 'darwin'
//let win;
//
///* Set Menu */
////var force_quit = false;
//const template = [
//    ...(isMac ? [{
//        label: app.name,
//        submenu: [
//            { role: 'About'},   
//        ]
//        
//
//        
//    }] : [])
//]
//
//const menu = Menu.buildFromTemplate(template)
//Menu.setApplicationMenu(menu);

function createWindow(){
    //Creates the Window
    win = new BrowserWindow({width:1280, height:800, icon: '', autoHideMenuBar: true ,webPreferences: {nodeIntegration: true,  contextIsolation: false, devTools: true}});
    win.resizable = false;
    //win.minimizable = false;
    win.maximizable = false;
    //win.setMenuBarVisibility(false);
 
    
    
    //Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'serpentbotui.html'),
        protocol: 'file',
        icon: 'serpenticon.jpg',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
        //if(!force_quit)
        //implement end program logic here
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
             app.exit();
            
             
        });
        
    });
}


process.on('uncaughtException', function (error) {
    console.log(error);

    //if(!force_quit)
    //implement end program logic here
    save.each('SELECT keys FROM l_key WHERE k_id = 1', function(err, row){
        if(err){
            return console.error(err.message);
        }
        /* GET ENTERED KEY */
        
        var key_in_sesh = row.keys;
        console.log(key_in_sesh);
        var sql = `UPDATE [customerRealm_1] SET activeStatus = 'False' WHERE [licenseKey] = '${key_in_sesh}'`;
    
        const request2 = new Request(sql, (err, rowCount) => {
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
    
            connection.execSql(request2);
            app.exit();
        
            
    });
        
    

})
//Runs the createWindow function
app.on('ready', createWindow);

//Gets Icon
app.getFileIcon('serpenticon.jpg')


//Quit when all windows are closed - Also check to see if you're NOT on a MAC OS. MAC = darwin, Windows = win32
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.exit();
    }
    
    
});


