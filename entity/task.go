package entity

import "gorm.io/gorm"

type Task struct {
	gorm.Model
	Name        string
	Description string
	StartDate   string
	EndDate     string
	Status      string
}
