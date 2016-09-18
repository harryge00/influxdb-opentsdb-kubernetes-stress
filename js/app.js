var http = require('http');
var hosts = ["server01", "server02", "server03", "server04", "server05"];
var regions = ["us-east-1",
"us-west-2",
"us-west-1",
"eu-west-1",
"eu-central-1",
"ap-southeast-1",
"ap-northeast-1",
"ap-southeast-2",
"ap-northeast-2",
"ap-south-1",
"sa-east-1"];

function genPostData(n) {
  var host;
  var region;
  var res = "";
  for(var i = 0; i < n; i++) {
    host = hosts[Math.floor(Math.random() * hosts.length)];
    region = regions[Math.floor(Math.random() * regions.length)];
    res += "cpu_load_short,host=" + host + ",region=" + region +" value=" + Math.random();
    if(i != n - 1) {
      res += "\n";
    } else {
      res += " " + Date.now();
    }
  }
  return res;
}

var rate = process.env.RATE;
var workers = process.env.WORKERS;
var total = workers * process.env.RUNTIME;
var count = 0;
var success = 0;
var fail = 0;
var refreshIntervalId = setInterval(function() {
  console.log(count);
  if(count >= total) {
    return;
  }
  for(var i = 0; i < workers; i++) {
    var postData = genPostData(rate);
    console.log(postData);
    var options = {
      hostname: process.env.HOSTNAME || "localhost",
      port: process.env.PORT || "8086",
      path: '/write?db=' + process.env.DB || "mydb",
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    count++;
    var req = http.request(options, (res) => {
      if(res.statusCode != 204) {
        console.log(`${res.statusCode} ${JSON.stringify(res.headers)}`);
        fail++;
      } else {
        success++;
      }
      if(success + fail == count) {
        console.log("success:", success * rate, "fail:", fail * rate);
      }
    });
    req.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });
    req.write(postData);
    req.end();
  }
}, 1000);

setTimeout(function() {
  clearInterval(refreshIntervalId);
  console.log("total:", count * rate);
}, 1000 * process.env.RUNTIME + 3000);
