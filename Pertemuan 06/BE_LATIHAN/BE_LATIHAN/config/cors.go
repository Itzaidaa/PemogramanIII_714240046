package config

var allowedOrigins = []string{
	"http://localhost:5173",
	"http://localhost:5174",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}
