package main

import (
  "fmt"
  "bytes"
  "os"
  _url "net/url"
	"io/ioutil"
	"net/http"
)

func getBody() string{
  return "not implemented"
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
  fmt.Println("response Status:", resp.Status)
  fmt.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
}

func write() {
  url := "http://" + os.Getenv("URL") + "/write?db=" + os.Getenv("DB")
  fmt.Println("URL:>", url)
  var bodyBytes = []byte("cpu_load_short,host=server01,region=us-east value=0.89 1434055562000000000")
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(bodyBytes))
  req.Header.Set("Content-Type", "application/json")

  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
      panic(err)
  }
  defer resp.Body.Close()

  fmt.Println("response Status:", resp.Status)
  fmt.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
}

func main() {
  write()
}
