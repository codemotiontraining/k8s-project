package main

import (
	"fmt"

	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
	ID    uint32 `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

func main() {
	fmt.Printf("hello\n\n")
	dbconn := os.Getenv("DB_CONN")
	if dbconn == "" {
		dbconn = "host=localhost user=postgres password=postgres dbname=codemotion port=5432 sslmode=disable"
	}
	db, err := gorm.Open(postgres.Open(dbconn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&User{})
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/users", func(c *gin.Context) {
		var users []User
		err := db.Find(&users).Error
		if err != nil {
			c.JSON(401, gin.H{
				"message": "error",
			})
			return
		}
		c.JSON(200, users)
	})

	r.POST("/users", func(c *gin.Context) {
		var user User
		err := c.ShouldBindJSON(&user)
		if err != nil {
			c.JSON(401, gin.H{
				"message": "error",
			})
			return
		}
		err = db.Create(&user).Error
		if err != nil {
			c.JSON(401, gin.H{
				"message": "error",
			})
			return
		}
		c.JSON(200, user)
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
