package handler

import (
	"be_latihan/model"
	"be_latihan/repository"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GET ALL MAHASISWA
func GetAllMahasiswa(c *fiber.Ctx) error {
	data, err := repository.GetAllMahasiswa()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengambil data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "berhasil mengambil semua data mahasiswa",
		Data:    data,
	})
}

// GET BY NPM
func GetMahasiswaByNPM(c *fiber.Ctx) error {
	npm := c.Params("npm") // ✅ langsung string (FIX)

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "data mahasiswa tidak ditemukan",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengambil data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "berhasil mengambil data mahasiswa",
		Data:    mhs,
	})
}

// INSERT
func InsertMahasiswa(c *fiber.Ctx) error {
	var payload model.Mahasiswa

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	data, err := repository.InsertMahasiswa(&payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal menambahkan data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.Response{
		Message: "berhasil menambahkan data mahasiswa",
		Data:    data,
	})
}