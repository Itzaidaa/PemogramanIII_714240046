package repository_test

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"fmt"
	"strconv"
	"testing"
	"time"
)

func setupTest(t *testing.T) {
	config.InitDB()

	// Auto migrate biar tabel pasti ada
	err := config.GetDB().AutoMigrate(&model.Mahasiswa{})
	if err != nil {
		t.Fatalf("Migration failed: %v", err)
	}
}

func TestInsertMahasiswa(t *testing.T) {
	setupTest(t)

	npm := strconv.FormatInt(time.Now().UnixNano(), 10)

	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Test User",
		Prodi:  "Informatika",
		Alamat: "Bandung",
		Email:  "testuser@mail.com",
		NoHP:   "081234567890",
		Hobi:   []string{"Coding"},
	}

	_, err := repository.InsertMahasiswa(&mhs)
	if err != nil {
		t.Errorf("Insert failed: %v", err)
	}
	fmt.Printf("INSERTED NPM: %s\n", npm)
}

func TestGetAllMahasiswa(t *testing.T) {
	setupTest(t)

	data, err := repository.GetAllMahasiswa()
	if err != nil {
		t.Errorf("GetAll failed: %v", err)
	}

	if len(data) == 0 {
		t.Errorf("Expected data, got empty")
	}
	fmt.Printf("DATA DI TABLE: %+v\n", data)
}

func TestGetMahasiswaByNPM(t *testing.T) {
	setupTest(t)

	// Insert dulu biar ada data
	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Find Test",
		Prodi:  "Informatika",
		Alamat: "Jakarta",
		Email:  "findtest@mail.com",
		NoHP:   "089876543210",
		Hobi:   []string{"Reading"},
	}
	repository.InsertMahasiswa(&mhs)

	// Cari berdasarkan NPM
	result, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		t.Errorf("GetByNPM failed: %v", err)
	}

	if result.NPM != npm {
		t.Errorf("Expected %s, got %s", npm, result.NPM)
	}
	fmt.Printf("DATA DITEMUKAN: %+v\n", result)
}

func TestUpdateMahasiswa(t *testing.T) {
	setupTest(t)

	// Insert dulu biar ada data
	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Before Update",
		Prodi:  "Informatika",
		Alamat: "Bandung",
		Email:  "before@mail.com",
		NoHP:   "081111111111",
		Hobi:   []string{"Coding"},
	}
	repository.InsertMahasiswa(&mhs)

	// Update data
	_, err := repository.UpdateMahasiswa(npm, &model.Mahasiswa{
		Nama:   "After Update",
		Prodi:  "Sistem Informasi",
		Alamat: "Jakarta",
		Email:  "after@mail.com",
		NoHP:   "082222222222",
		Hobi:   []string{"Gaming"},
	})

	if err != nil {
		t.Errorf("Update failed: %v", err)
	}

	// Verifikasi update
	updated, _ := repository.GetMahasiswaByNPM(npm)
	fmt.Printf("DATA SETELAH UPDATE: %+v\n", updated)
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)

	// Insert dulu biar ada data
	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "To Delete",
		Prodi:  "Informatika",
		Alamat: "Surabaya",
		Email:  "delete@mail.com",
		NoHP:   "083333333333",
		Hobi:   []string{"Sleeping"},
	}
	repository.InsertMahasiswa(&mhs)

	// Hapus data
	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		t.Errorf("Delete failed: %v", err)
	}
	fmt.Printf("DATA DENGAN NPM %s BERHASIL DIHAPUS\n", npm)
}
