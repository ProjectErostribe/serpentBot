'use strict';
var packager = require('electron-packager');
var options = {
    //'arch': 'arm64',
    'platform': 'darwin',
    'dir': './',
    'app-copyright': 'RaiT',
    'app-version': '1.1.6',
    'asar': true,
    'icon': 'serpentBt.png',
    'name': 'SerpentBot',
    'out': './mac-releases',
    'overwrite': true,
    'prune': true,
    'version': '1.3.4',
    'version-string': {
        'CompanyName': 'RaiT',
        'FileDescription': 'SerpentBot', /*This is what display windows on task manager, shortcut and process*/
        'OriginalFilename': 'SerpentBot',
        'ProductName': 'SerpentBot',
        'InternalName': 'RaiTserpent'
    }
};
packager(options, function done_callback(err, appPaths) {
    console.log("Error: ", err);
    console.log("appPaths: ", appPaths);
});