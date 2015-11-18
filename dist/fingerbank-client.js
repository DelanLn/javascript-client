
function Endpoint(result){
  var self = this;
  self.name = result['device']['name'];
  self.version = result['version'];
  self.score = result['score'];

  self.parents = [];
  for(var i in result['device']['parents']){  
    self.parents.push(result['device']['parents'][i]['name']);
  }
}

Endpoint.prototype.hasParent = function(name){
  var self = this;
  return self.parents.indexOf(name) > -1;
}

Endpoint.prototype.is = function(name){
  var self = this;
  return (self.name == name || self.hasParent(name));
}

Endpoint.prototype.isAndroid = function(){
  var self = this;
  return self.is("Generic Android");
}

Endpoint.prototype.isIos = function(){
  var self = this;
  return self.is("Apple iPod, iPhone or iPad");
}

Endpoint.prototype.isWindows = function(){
  var self = this;
  return self.is("Windows");
}

Endpoint.prototype.isMac = function(){
  var self = this;
  return self.is("Macintosh");
}

Endpoint.prototype.isWindowsPhone = function(){
  var self = this;
  return self.is("Windows Phone");
}

Endpoint.prototype.isBlackberry = function(){
  var self = this;
  return self.is("RIM BlackBerry");
}

// Tests run through node so we need to export it
if("requireGlobal" in window) exports.Endpoint = Endpoint;

function FingerbankClient(key){
  var self = this;
  self.key = key;
}

FingerbankClient.prototype.resultFromCurrentUserAgent = function(callback){
  var self = this;
  return self.resultFromUserAgent(navigator.userAgent, callback);
}

FingerbankClient.prototype.resultFromUserAgent = function(userAgent, callback){
  var self = this;
  $.get("http://127.0.0.1:3000/api/v1/combinations/interogate",
    {
      user_agent: userAgent,
      key: self.key,
    },
    function(data){
      callback(new Endpoint(data));
    }
  );
}

// Tests run through node so we need to export it
if("requireGlobal" in window) exports.FingerbankClient = FingerbankClient;