curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary '
cpu_load_short,host=server04,region=us-east-1 value=0.1280695479363203
cpu_load_short,host=server01,region=us-west-1 value=0.5068533029407263
cpu_load_short,host=server03,region=ap-northeast-2 value=0.9188421193975955
cpu_load_short,host=server05,region=sa-east-1 value=0.5269973808899522
cpu_load_short,host=server05,region=ap-south-1 value=0.07632671296596527
cpu_load_short,host=server02,region=us-west-1 value=0.828203929355368
cpu_load_short,host=server03,region=eu-west-1 value=0.9835116614121944
cpu_load_short,host=server04,region=us-west-1 value=0.13584625837393105
cpu_load_short,host=server01,region=ap-south-1 value=0.24171787896193564
cpu_load_short,host=server02,region=ap-southeast-1 value=0.28473223140463233
cpu_load_short,host=server04,region=us-west-1 value=0.14444771059788764
cpu_load_short,host=server02,region=us-west-1 value=0.521618356462568
cpu_load_short,host=server04,region=us-east-1 value=0.8511193490121514
cpu_load_short,host=server03,region=ap-south-1 value=0.48784308903850615
cpu_load_short,host=server05,region=us-east-1 value=0.03257040702737868
cpu_load_short,host=server01,region=us-east-1 value=0.4404618660919368
cpu_load_short,host=server03,region=ap-south-1 value=0.14014597423374653
cpu_load_short,host=server05,region=ap-northeast-2 value=0.5042100343853235
cpu_load_short,host=server05,region=ap-south-1 value=0.15361327980645
cpu_load_short,host=server05,region=sa-east-1 value=0.2025724076665938 1474271999234'

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
function genPostData(n) {
  var host;
  var region;
  for(var i = 0; i < n; i++) {
    host = hosts[Math.floor(Math.random() * hosts.length)];
    region = regions[Math.floor(Math.random() * regions.length)];
    console.log("cpu_load_short,host=" + host + ",region=" + region +" value=" + Math.random() + " " + Date.now());
  }
}
