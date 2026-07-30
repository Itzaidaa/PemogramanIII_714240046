package main

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/router"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: strings.Join(config.GetAllowedOrigins(), ","),
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	}))

	config.InitDB()

	config.GetDB().AutoMigrate(&model.Mahasiswa{})

	router.SetupRoutes(app)

	app.Listen(":3000")
}