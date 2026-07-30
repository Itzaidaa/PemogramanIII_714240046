package repository

import (
	"be_latihan/config"
	"be_latihan/model"
	"strconv"
)

// Ambil semua data mahasiswa
func GetAllMahasiswa() ([]model.Mahasiswa, error) {
	var data []model.Mahasiswa
	result := config.GetDB().Find(&data)
	return data, result.Error
}

// Insert mahasiswa baru
func InsertMahasiswa(mhs *model.Mahasiswa) (*model.Mahasiswa, error) {
	result := config.GetDB().Create(mhs)
	return mhs, result.Error
}

// Ambil satu data mahasiswa berdasarkan NPM
func GetMahasiswaByNPM(npm string) (model.Mahasiswa, error) {
	var mhs model.Mahasiswa
	npmInt, err := strconv.ParseInt(npm, 10, 64)
	if err != nil {
		return mhs, err
	}
	result := config.GetDB().First(&mhs, "npm = ?", npmInt)
	return mhs, result.Error
}

// Update data mahasiswa berdasarkan NPM
func UpdateMahasiswa(npm string, newData *model.Mahasiswa) (*model.Mahasiswa, error) {
	var mhs model.Mahasiswa
	db := config.GetDB()

	npmInt, err := strconv.ParseInt(npm, 10, 64)
	if err != nil {
		return nil, err
	}

	if err := db.First(&mhs, "npm = ?", npmInt).Error; err != nil {
		return nil, err
	}

	if err := db.Model(&mhs).Updates(newData).Error; err != nil {
		return nil, err
	}

	return &mhs, nil
}

// Hapus data mahasiswa berdasarkan NPM
func DeleteMahasiswa(npm string) error {
	npmInt, err := strconv.ParseInt(npm, 10, 64)
	if err != nil {
		return err
	}
	result := config.GetDB().Where("npm = ?", npmInt).Delete(&model.Mahasiswa{})
	return result.Error
}
