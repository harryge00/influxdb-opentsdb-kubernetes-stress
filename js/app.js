var http = require('http');
var postData = "cpu_load_short,host=server01,region=ap-southeast-1 value=7641160050240560044 ";
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
function genPostData() {
  var host = hosts[Math.floor(Math.random() * hosts.length)];
  var region = regions[Math.floor(Math.random() * regions.length)];
  return "cpu_load_short,host=" + host + ",region=" + region +" value=" +Math.random() + " " + Date.now();
}

var rate = process.env.RATE;
var interval = 1000/rate;

var count = 0;
var success = 0;
var fail = 0;
var refreshIntervalId = setInterval(function() {
  var postData = genPostData();
  count++;
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
  var req = http.request(options, (res) => {
    if(res.statusCode != 204) {
      console.log(`${res.statusCode} ${JSON.stringify(res.headers)}`);
      fail++;
    } else {
      success++;
    }
    if(success + fail == count) {
      console.log("success:", success, "fail:", fail);
    }
  });
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
}, interval);

setTimeout(function() {
  clearInterval(refreshIntervalId);
  console.log("total:", count);
}, 1000 * process.env.RUNTIME + interval);
//graceful termination
