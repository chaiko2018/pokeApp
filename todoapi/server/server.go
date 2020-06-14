package main

import (
	"fmt"
	"log"
	"net"
	"google.golang.org/grpc"
	"context"
	gtodo "../proto"
)

type server struct{}

func (s *server) Hello() {
	fmt.Println("test")
}



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
	todos := []*gtodo.Todo{
		{
			Title: "grpc_list_title_1",
			Doing: false,
		},
		{
			Title: "grpc_list_title_2",
			Doing: true,
		},
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
