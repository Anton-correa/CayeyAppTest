const electron = require('electron');
const url = require('url');
const path = require('path');
const jsdom = require('jsdom');
var $ = JQuery = require('jquery');

const {app, BrowserWindow, Menu, ipcMain} = electron;

//SET ENV
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;
let editWindow;
let loginWindow;
let analysisWindow;


// Listen for app to be ready
app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({});
    //load html into window
    mainWindow.maximize();
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});




//Handle add window
function createAddWindow(){
     //Create new window
     addWindow = new BrowserWindow({
         width: 500,
         height: 500,
         title: 'Add new Item'
     });
     //load html into window
     addWindow.loadURL(url.format({
         pathname: path.join(__dirname, 'addWindow.html'),
         protocol: 'file:',
         slashes: true
     }));
     // Garbage collection handle
     addWindow.on('close', function(){
         addWindow = null;
         mainWindow.reload();
     });
}

function createanalysisWindow(){
    //Create new window
    analysisWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Analysis'
    });
    //load html into window
    analysisWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'analysisWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    analysisWindow.on('close', function(){
        analysisWindow = null;
    });
}

function createEditWindow(){
    //Create new window
    editWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Edit Item'
    });
    //load html into window
    editWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'editWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    editWindow.on('close', function(){
        editWindow = null;
    });
}

/*function createLoginWindow(){
    //Create new window
    loginWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Login'
    });
    //load html into window
    loginWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'login.php'),
        protocol: 'file:',
        slashes: true
    }));
    // Garbage collection handle
    loginWindow.on('close', function(){
        loginWindow = null;
    });
}*/


//Catch item:add
ipcMain.on('item:Edit', function(e, item){
    editWindow.webContents.send('item:Edit', item);
    createEditWindow();
});

//create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Clear Item',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },{
                label: 'Export',
                click(){
                    fnExcelReport();
             } 
            },
                {type: 'separator'},
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]},
        
        {label:'Edit'},
        {label:'View'},
        {label:'Tools'}
    
];

// If MAC, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools if not in production
if(process.env.NODE_ENV == 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' :
                 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}

