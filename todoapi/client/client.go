package main

import(
	"fmt"
	"log"
	"context"

	"google.golang.org/grpc"
	gtodo "../proto"
)

var greq = &gtodo.ListTodosRequest{}

func main() {
	fmt.Println("Hello grpc client")
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}
	defer conn.Close()
	client := gtodo.NewTodoAPIClient(conn)

	gres, err := client.ListTodos(context.Background(), greq)
	if err != nil {
		log.Fatalf("error")
	}
	fmt.Println(gres)
}
