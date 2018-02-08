/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "blockchain Scolcoin";

//The url it will be accessed from
exports.address = "explorer.scolcoin.xyz";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Slate";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "SCOL";


//coin name, visible e.g. in the browser window
exports.coin = "Scolcoin";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "scolbduser",
  "password": "JuanPablo1*!",
  "database": "explodbscol",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { 
  "host" : "127.0.0.1",
  "port" : 4210,
  "user" : "rpc_user",
  "pass" : "8cde5e64e7297b1cb4c495d1a"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "bitcointalk": false,
  "website": false,
  "slack": false,
  "github": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 49759,
  "blockhash": "e691507a559a6ce3e69a7d336224f19190e114157dd49298ceb9a2423b504a75",
  "txhash": "bd9c50ff462d7107a53c292b85a6d517ad711272505378ba7ac2c43b2d323e1a",
  "address": "RBiXWscC63Jdn1GfDtRj8hgv4Q6Zppvpwb",
};

// markets
exports.markets = {
  "coin": "SCOL",
  "exchange": "BTC",
  "enabled": ['cryptopia'],
  "cryptopia_id": "2186",
  "default": "cryptopia"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 100,
  "low_flag": 1000,
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POS",
  "last_txs": 100
};

// twitter
exports.twitter = "scolcoin";
exports.facebook = "Socialprojectscol/";
exports.googleplus = "yourgooglepluspage";
exports.bitcointalk = "2739783";
exports.website = "scolcoin.com";
exports.slack = "yourcompleteslackinviteurlincludingtheprotocol";
exports.github = "yourgithubaccount/repo";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "efbbac66d755b85cdfaa7d47da850e2a3c6b14f7da363f7f31cf13ea8a0f8e39";
exports.genesis_block = "00000aa2ce62bac15c8b18cf24dd7b2c62c7e5d9be1d170171bffc679f9689e0";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "TXOUTSET";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
