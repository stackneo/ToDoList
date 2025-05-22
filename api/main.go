package main

import (
	"ToDoList/controller"
	"ToDoList/initalizers"
	"github.com/gin-gonic/gin"
)

// Load in credentials and database
func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	router := gin.Default()

	// Creates a task
	router.POST("/tasks", controller.TasksCreate)

	// Outputs all tasks
	router.GET("/tasks", controller.TasksList)

	// Deletes specific task
	router.DELETE("/tasks/:id", controller.TasksDelete)

	// Updates specific task
	router.PUT("/tasks/:id", controller.TasksUpdate)

	router.Run()
}
