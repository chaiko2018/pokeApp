package db

import(
	"database/sql"
	"os"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var Conn *sql.DB

func init() {
	user := os.Getenv("MYSQL_USER")
	pass := os.Getenv("MYSQL_PASSWORD")
	name := os.Getenv("MYSQL_DATABASE")

	dbconf := user + ":" + pass + "@/" + name
	conn, err := sql.Open("mysql", dbconf)
	if err != nil {
		log.Fatal(err)
	}
	Conn = conn
}
