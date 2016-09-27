# Performance test for Time-Series database (opentsdb and influxdb) in Kubernetes

Simple test, writing lots of data to db.

## Data structure

`host=server01,region=us-west value=0.64 1434055562000000000`
* Value is random floating number between 0 and 1.
* Host and region is one element of the predefined array.

## Run stress-test in go

* RUNTIME: how long the test lasts
* RATE: How many writes per second
* DB: The db used. (create db first)
* Example: `RUNTIME=600 rate=10000 URL=localhost:8086 DB=mydb go run main.go`

## Run stress-test in js

 Since the stress test is IO-bound, it is more suitable using node.js
