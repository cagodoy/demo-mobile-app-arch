package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

func main() {
	loop := true

	postgresDSN := os.Getenv("POSTGRES_DSN")

	if postgresDSN == "" {
		postgresDSN = "postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable"
		fmt.Println("missing env variable POSTGRES_DSN, using default value")
	}

	for loop {
		log.Println("Init wait for pg")
		time.Sleep(7 * time.Second)
		database, err := sqlx.Connect("postgres", postgresDSN)
		if err == nil {
			if _, err := database.Query("SELECT NOW()"); err == nil {
				loop = false
			}
		} else {
			log.Println("PG DSN ", postgresDSN)
			log.Println("Failed connect to postgres: ", err.Error())
		}
	}
	log.Println("DB ready")
}
