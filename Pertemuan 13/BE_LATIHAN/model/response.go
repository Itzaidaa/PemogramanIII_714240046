package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}

// Structs for Swagger example responses (Latihan Mandiri 1 & 2)
type ResponseSuccess200 struct {
	Message string      `json:"message" example:"berhasil memproses data"`
	Data    interface{} `json:"data,omitempty"`
}

type ResponseCreated201 struct {
	Message string      `json:"message" example:"berhasil menambahkan data"`
	Data    interface{} `json:"data,omitempty"`
}

type ResponseBadRequest400 struct {
	Message string `json:"message" example:"payload tidak valid"`
	Error   string `json:"error,omitempty" example:"detail error validation"`
}

type ResponseUnauthorized struct {
	Message string `json:"message" example:"authorization header wajib diisi / token tidak valid"`
}

type ResponseForbidden struct {
	Message string `json:"message" example:"user tidak memiliki akses untuk fitur ini"`
}

type ResponseNotFound404 struct {
	Message string `json:"message" example:"data tidak ditemukan"`
}

type ResponseInternalServerError500 struct {
	Message string `json:"message" example:"terjadi kesalahan pada server"`
	Error   string `json:"error,omitempty" example:"detail error database"`
}
