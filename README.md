# influxdb-stress

## go version

* RUNTIME: how long the test lasts
* RATE: How many writes per second
* DB: create db first
`RUNTIME=600 rate=10000 URL=localhost:8086 DB=mydb go run main.go`

## js version

Since the stress test is IO-bound, it is more suitable using node.js
