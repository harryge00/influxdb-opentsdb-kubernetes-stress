curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server03,region=ap-south-1 value=0.3498742086812854 1474272475790
cpu_load_short,host=server02,region=us-west-1 value=0.22319625574164093 1474272475790
cpu_load_short,host=server01,region=us-west-1 value=0.7890060131903738 1474272475790
cpu_load_short,host=server04,region=ap-southeast-2 value=0.034692715387791395 1474272475790
cpu_load_short,host=server03,region=ap-south-1 value=0.108591896481812 1474272475790
cpu_load_short,host=server05,region=eu-west-1 value=0.11920397845096886 1474272475790
cpu_load_short,host=server02,region=ap-northeast-1 value=0.6284228716976941 1474272475790
cpu_load_short,host=server03,region=ap-south-1 value=0.02083365060389042 1474272475790
cpu_load_short,host=server04,region=ap-northeast-1 value=0.31384131661616266 1474272475790
cpu_load_short,host=server03,region=us-west-1 value=0.24967908998951316 1474272475790
cpu_load_short,host=server03,region=ap-northeast-1 value=0.8257630062289536 1474272475790
cpu_load_short,host=server04,region=eu-central-1 value=0.29163114610128105 1474272475790
cpu_load_short,host=server01,region=ap-northeast-1 value=0.8769013993442059 1474272475790
cpu_load_short,host=server03,region=ap-south-1 value=0.8215741007588804 1474272475790
cpu_load_short,host=server01,region=us-east-1 value=0.09058736707083881 1474272475790
cpu_load_short,host=server01,region=sa-east-1 value=0.7414173686411232 1474272475790
cpu_load_short,host=server05,region=ap-southeast-2 value=0.3486824259161949 1474272475790
cpu_load_short,host=server05,region=ap-northeast-2 value=0.6675882295239717 1474272475790
cpu_load_short,host=server05,region=us-west-2 value=0.8559318464249372 1474272475790
cpu_load_short,host=server02,region=us-east-1 value=0.09476191573776305 1474272475790
'

--data-urlencode "db=mydb" --data-urlencode "epoch=s" --data-urlencode "q=SELECT count(value) FROM \"cpu_load_short\""

# var hosts = ["server01", "server02", "server03", "server04", "server05"];
# var regions = ["us-east-1",
# "us-west-2",
# "us-west-1",
# "eu-west-1",
# "eu-central-1",
# "ap-southeast-1",
# "ap-northeast-1",
# "ap-southeast-2",
# "ap-northeast-2",
# "ap-south-1",
# "sa-east-1"];
# //curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'
# function genPostData(n) {
#   var host;
#   var region;
#   for(var i = 0; i < n; i++) {
#     host = hosts[Math.floor(Math.random() * hosts.length)];
#     region = regions[Math.floor(Math.random() * regions.length)];
#     console.log("cpu_load_short,host=" + host + ",region=" + region +" value=" + Math.random() + " " + Date.now());
#   }
# }
