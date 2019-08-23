package main

import (
    //"fmt"
	//"io/ioutil"
	"log"
	"net/http"
	"os"
	//"strconv"
	"bytes"
	//"html/template"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Println("REQUEST:", r.Method, r.URL, r.Body)
		http.ServeFile(w, r, "reg.html")
		
	}).Methods("GET")
	
	r.PathPrefix("/serve/").Handler(http.StripPrefix("/serve/", http.FileServer(http.Dir("."))))

  	log.Println("LISTENING:80")
	http.ListenAndServe(":80", r)
}

func readfByte(path string) []byte {
	f, _ := os.Open(path)
	buf := new(bytes.Buffer)
    buf.ReadFrom(f)
	f.Close()
	return buf.Bytes()
}


