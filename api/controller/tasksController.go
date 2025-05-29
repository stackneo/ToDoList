package controller

import (
	"ToDoList/entity"
	"ToDoList/initalizers"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

func init() {
	initalizers.LoadEnv()
	initalizers.ConnectToDB()
}

func TasksCreate(c *gin.Context) {
	// Creates struct for JSON body
	var body struct {
		Name        string
		Description string
		StartDate   time.Time
		EndDate     time.Time
		Status      string
	}

	// Serialises it as JSON
	if err := c.ShouldBind(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Creates new struct for the task
	task := entity.Task{Name: body.Name, Description: body.Description, StartDate: body.StartDate, EndDate: body.EndDate, Status: body.Status}

	// Store it in DB
	result := initalizers.DB.Create(&task)

	if result.Error != nil {
		c.Status(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"task": task,
	})
}

func TasksList(c *gin.Context) {
	// Create list to store tasks
	var tasks []entity.Task
	// Queries DB to find and store them
	initalizers.DB.Find(&tasks)

	c.JSON(http.StatusOK, gin.H{
		"tasks": tasks,
	})
}

func TasksDelete(c *gin.Context) {
	// Grab ID
	id := c.Param("id")

	// Get task
	var task entity.Task

	// Delete task
	initalizers.DB.Delete(&task, id)

	c.JSON(http.StatusOK, gin.H{
		"Task deleted successfully": task,
	})

}

func TasksUpdate(c *gin.Context) {
	// Creates struct for JSON body
	var body struct {
		Name        string
		Description string
		StartDate   time.Time
		EndDate     time.Time
		Status      string
	}

	// Serialises it as JSON
	c.Bind(&body)

	// Grab Task ID
	id := c.Param("id")

	// Finds task to update
	var task entity.Task
	initalizers.DB.First(&task, id)

	// Updates task
	initalizers.DB.Model(&task).Updates(entity.Task{
		Name:        body.Name,
		Description: body.Description,
		StartDate:   body.StartDate,
		EndDate:     body.EndDate,
		Status:      body.Status})

	c.JSON(http.StatusOK, gin.H{
		"Task updated": task,
	})
}
