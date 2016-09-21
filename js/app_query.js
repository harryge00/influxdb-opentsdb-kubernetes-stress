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
//curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'
var date = Date.now();
function getQuery() {
  var query = 'select value from cpu_load_short where ';
  query += "\"host\"='" + hosts[Math.floor(Math.random() * hosts.length)] + "' and \"region\"='" + regions[Math.floor(Math.random() * regions.length)] + "'";
  // console.log(query);
  return query;
}

var workers = process.env.WORKERS;
var total = workers * process.env.RUNTIME;
var count = 0;
var success = 0;
var fail = 0;
var refreshIntervalId = setInterval(function() {
  if(count >= total) {
    return;
  }
  for(var i = 0; i < workers; i++) {
    var options = {
      hostname: process.env.HOSTNAME || "localhost",
      port: process.env.PORT || "8086",
      path: '/query?db=' + (process.env.DB || "mydb") + "&epoch=s&q=" + encodeURIComponent(getQuery())
    };
    count++;
    var req = http.request(options, (res) => {
      if(res.statusCode != 200) {
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
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
    req.end();
  }
}, 1000);

setTimeout(function() {
  clearInterval(refreshIntervalId);
  console.log("total:", count);
}, 1000 * process.env.RUNTIME + 3000);
