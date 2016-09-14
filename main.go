package main

import (
  "log"
  "bytes"
  "os"
  _url "net/url"
	"io/ioutil"
	"net/http"
  "math/rand"
  "time"
  "strconv"
)

var (
  hosts = []string{"server01", "server02", "server03", "server04", "server05"}
  hostNum = 5
  region = []string{
    "us-east-1",
    "us-west-2",
    "us-west-1",
    "eu-west-1",
    "eu-central-1",
    "ap-southeast-1",
    "ap-northeast-1",
    "ap-southeast-2",
    "ap-northeast-2",
    "ap-south-1",
    "sa-east-1",
  }
  regionNum = 11
)


func getBody() string{
  // "cpu_load_short,host=server01,region=us-east value=0.89 1434055562000000000"
  str := "cpu_load_short,host=" + hosts[rand.Intn(hostNum)] +",region=" + region[rand.Intn(regionNum)] + " value=" + strconv.Itoa(rand.Int()) + " " + strconv.FormatInt(time.Now().UTC().UnixNano(), 10)
  log.Println(str)
  return str
}

func query() {
  url := "http://" + os.Getenv("URL") + "/query"
  v := _url.Values{}
  v.Set("db", os.Getenv("DB"))
  v.Add("q", "SELECT \"value\" FROM \"cpu_load_short\" WHERE \"region\"='us-west';SELECT count(\"value\") FROM \"cpu_load_short\" WHERE \"region\"='us-west'")
  client := &http.Client{}
  resp, err := client.PostForm(url, v)
  if err != nil {
      panic(err)
  }
  log.Println("response Status:", resp.Status)
  log.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  log.Println("response Body:", string(body))
}

func write() {
  url := "http://" + os.Getenv("URL") + "/write?db=" + os.Getenv("DB")
  var bodyBytes = []byte(getBody())
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(bodyBytes))

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
      log.Println(err)
  }
  defer resp.Body.Close()
  if resp.StatusCode != 204 {
    log.Println("response Status:", resp.Status)
    log.Println("response Headers:", resp.Header)
    body, _ := ioutil.ReadAll(resp.Body)
    log.Println("response Body:", string(body))
  }
}

func main() {
  log.SetFlags(log.LstdFlags | log.Lshortfile)
  runtime, _ := strconv.Atoi(os.Getenv("RUNTIME"))
  rate, _ := strconv.Atoi(os.Getenv("RATE"))
  ticker := time.NewTicker(time.Duration(1000000000/rate) * time.Nanosecond)
  for i := 0; i < runtime; i++ {
    for j := 0; j < rate; j++ {
      go write()
      <- ticker.C
    }
  }
}
