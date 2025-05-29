package main

import (
	"ToDoList/controller"
	"ToDoList/initalizers"
	"github.com/gin-gonic/gin"
	"github.com/itsjamie/gin-cors"
	"time"
)

// Load in credentials and database
func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func main() {
	router := gin.Default()

	// CORS config
	router.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     false,
		ValidateHeaders: false,
	}))

	// Creates a task
	router.POST("/api", controller.TasksCreate)

	// Outputs all tasks
	router.GET("/api", controller.TasksList)

	// Deletes specific task
	router.DELETE("/api/:id", controller.TasksDelete)

	// Updates specific task
	router.PUT("/api/:id", controller.TasksUpdate)

	router.Run()
}
