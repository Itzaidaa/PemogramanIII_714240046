package handler

import (
	"be_latihan/config/middleware"
	"be_latihan/model"
	"be_latihan/pkg/password"
	"be_latihan/repository"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Register godoc
// @Summary Register user baru
// @Description Membuat akun user baru. Role dapat diisi admin atau user. Jika role kosong, backend akan memakai default admin.
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body model.AuthRequest true "Payload register user"
// @Success 201 {object} model.ResponseCreated201
// @Failure 400 {object} model.ResponseBadRequest400
// @Failure 409 {object} model.ResponseBadRequest400
// @Failure 500 {object} model.ResponseInternalServerError500
// @Router /register [post]
func Register(c *fiber.Ctx) error {
	var payload model.AuthRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	payload.Username = strings.TrimSpace(payload.Username)
	payload.Role = strings.TrimSpace(payload.Role)
	if payload.Role == "" {
		payload.Role = "admin"
	}

	if payload.Username == "" || payload.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "username dan password wajib diisi",
		})
	}

	hashedPassword, err := password.HashPassword(payload.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal membuat hash password",
			Error:   err.Error(),
		})
	}

	user := model.User{
		Username: payload.Username,
		Password: hashedPassword,
		Role:     payload.Role,
	}

	data, err := repository.InsertUser(&user)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(model.ResponseBadRequest400{
			Message: "username sudah digunakan atau data tidak valid",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.ResponseCreated201{
		Message: "register berhasil",
		Data: model.AuthUserResponse{
			ID:       data.ID,
			Username: data.Username,
			Role:     data.Role,
		},
	})
}

// Login godoc
// @Summary Login user
// @Description Melakukan login dan mengembalikan JWT jika username dan password valid.
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body model.AuthRequest true "Payload login user"
// @Success 200 {object} model.LoginResponse
// @Failure 400 {object} model.ResponseBadRequest400
// @Failure 401 {object} model.ResponseUnauthorized
// @Failure 500 {object} model.ResponseInternalServerError500
// @Router /login [post]
func Login(c *fiber.Ctx) error {
	var payload model.AuthRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	user, err := repository.FindUserByUsername(strings.TrimSpace(payload.Username))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusUnauthorized).JSON(model.ResponseUnauthorized{
				Message: "username atau password salah",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal mencari user",
			Error:   err.Error(),
		})
	}

	if !password.CheckPasswordHash(payload.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(model.ResponseUnauthorized{
			Message: "username atau password salah",
		})
	}

	token, err := middleware.GenerateJWT(user, 2*time.Hour)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal membuat token",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "login berhasil",
		Data: model.LoginResponse{
			Token: token,
			User: model.AuthUserResponse{
				ID:       user.ID,
				Username: user.Username,
				Role:     user.Role,
			},
		},
	})
}

// ChangePassword godoc
// @Summary Ubah password user
// @Description Mengubah password user yang sedang login berdasarkan token JWT.
// @Tags Auth
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body model.ChangePasswordRequest true "Payload ubah password"
// @Success 200 {object} model.ResponseSuccess200
// @Failure 400 {object} model.ResponseBadRequest400
// @Failure 401 {object} model.ResponseUnauthorized
// @Failure 404 {object} model.ResponseNotFound404
// @Failure 500 {object} model.ResponseInternalServerError500
// @Router /change-password [put]
func ChangePassword(c *fiber.Ctx) error {
	username, ok := c.Locals("username").(string)
	if !ok || username == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(model.ResponseUnauthorized{
			Message: "user tidak terautentikasi",
		})
	}

	var payload model.ChangePasswordRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	if payload.OldPassword == "" || payload.NewPassword == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "old_password dan new_password wajib diisi",
		})
	}

	user, err := repository.FindUserByUsername(username)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.ResponseNotFound404{
				Message: "user tidak ditemukan",
			})
		}
		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal mencari user",
			Error:   err.Error(),
		})
	}

	if !password.CheckPasswordHash(payload.OldPassword, user.Password) {
		return c.Status(fiber.StatusBadRequest).JSON(model.ResponseBadRequest400{
			Message: "password lama tidak sesuai",
		})
	}

	newHashedPassword, err := password.HashPassword(payload.NewPassword)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal membuat hash password baru",
			Error:   err.Error(),
		})
	}

	if err := repository.UpdateUserPassword(user.ID, newHashedPassword); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.ResponseInternalServerError500{
			Message: "gagal memperbarui password",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.ResponseSuccess200{
		Message: "berhasil mengubah password",
	})
}
