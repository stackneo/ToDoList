package main

import (
	"ToDoList/entity"
	"ToDoList/initalizers"
)

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

// Creates tasks table with fields from struct
func main() {
	initalizers.DB.AutoMigrate(&entity.Task{})
}
