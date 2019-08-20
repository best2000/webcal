package main

import (
    "fmt"
	"io/ioutil"
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
		http.ServeFile(w, r, "pub/index.html")
		
	}).Methods("GET")

	r.HandleFunc("/reg", func(w http.ResponseWriter, r *http.Request) {
		log.Println("REQUEST:", r.Method, r.URL, r.Body)
		fmt.Fprint(w, "<pre>16.05.43</pre>")
	}).Methods("GET")

	r.HandleFunc("/bol", func(w http.ResponseWriter, r *http.Request) {
		log.Println("REQUEST:", r.Method, r.URL,)
		buf := new(bytes.Buffer)
		buf.ReadFrom(r.Body)
		fmt.Fprint(w, buf.String())
		PassCode := r.Header.Get("pass")
		switch PassCode {
		case "160543":
			log.Println("POSTED:",buf)
			ioutil.WriteFile("text.txt", buf.Bytes(), 755)	
		default:
			log.Println("INVALID PASS!",PassCode)
		}
		
	}).Methods("POST")
	
	r.PathPrefix("/publicfs/").Handler(http.StripPrefix("/publicfs/", http.FileServer(http.Dir("pub"))))

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


