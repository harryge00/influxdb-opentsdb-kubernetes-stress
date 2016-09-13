package main

import (
  "fmt"
  "bytes"
  "os"
	"io/ioutil"
	"net/http"
)

func getJsonBody() string{
  return "not implemented"
}

func doRequest() {
  url := "http://" + os.Getenv("DB")
  fmt.Println("URL:>", url)

  var jsonStr = []byte(getJsonBody())
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
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
  doRequest()
}
