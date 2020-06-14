package main

import (
	"fmt"
	"log"
	"net"
	"google.golang.org/grpc"
	"context"
	"database/sql"
	gtodo "../proto"
)

type server struct{}

func (s *server) Hello() {
	fmt.Println("test")
}

type SqlHandler struct {
	Conn	*sql.DB
}

func NewSqlHandler() *SqlHandler {
	conn, err := sql.Open("mysql", "username:@tcp(db:3306)/DBname")
	if err != nil {
		log.Fatal(err)
	}
	sqlHandler := new(SqlHandler)
	sqlHandler.Conn = conn
	return sqlHandler
}


// TODO: use DB
func (s *server) GetTodo(ctx context.Context, req *gtodo.GetTodoRequest) (*gtodo.GetTodoResponse, error) {
	todo := &gtodo.Todo{
		Title: "grpc_get_title",
		Doing: true,
	}
	res := &gtodo.GetTodoResponse{
		Todo: todo,
	}
	return res, nil
}

func (s *server) CreateTodo(ctx context.Context, req *gtodo.CreateTodoRequest) (*gtodo.CreateTodoResponse, error) {
	res := &gtodo.CreateTodoResponse{
		Success: true,
		Id: "1000001",
	}
	return res, nil
}

func (s *server) ListTodos(ctx context.Context, req *gtodo.ListTodosRequest) (*gtodo.ListTodosResponse, error) {
	sqlhandler := NewSqlHandler()
	rows, err := sqlhandler.Conn.Query("SELECT title, doing FROM todos")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	todos := []*gtodo.Todo{}

	for rows.Next() {
		var title string
		var doing	bool

		err = rows.Scan(&title, &doing)
		if err != nil {
			log.Fatal(err)
		}

		todo := &gtodo.Todo{
			Title: title,
			Doing: doing,
		}

		todos = append(todos, todo)
	}

	res := &gtodo.ListTodosResponse{
		Todos: todos,
	}

	return res, nil

}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	gtodo.RegisterTodoAPIServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
