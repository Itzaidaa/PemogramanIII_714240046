package repository_test

import (
	"be_latihan/config"
	"be_latihan/model"
	"be_latihan/repository"
	"fmt"
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

	npm := time.Now().UnixNano()

	mhs := model.Mahasiswa{
		NPM:    npm,
		Nama:   "Test User",
		Prodi:  "Informatika",
		Alamat: "Bandung",
		Hobi:   []string{"Coding"},
	}

	_, err := repository.InsertMahasiswa(&mhs)
	if err != nil {
		t.Errorf("Insert failed: %v", err)
	}
	fmt.Printf("INSERTED NPM: %d\n", npm)
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

	npm := int64(1775410857780493700) // Gunakan NPM yang ada di DB untuk test (disesuaikan)

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		t.Errorf("GetByNPM failed: %v", err)
	}

	if mhs.NPM != npm {
		t.Errorf("Expected %d, got %d", npm, mhs.NPM)
	}
	fmt.Printf("DATA DITEMUKAN: %+v\n", mhs)
}

func TestUpdateMahasiswa(t *testing.T) {
	setupTest(t)

	npm := int64(1775410857780493700) // Gunakan NPM yang ada di DB untuk test (disesuaikan)

	_, err := repository.UpdateMahasiswa(npm, &model.Mahasiswa{
		Nama:   "New Namez",
		Prodi:  "SI",
		Alamat: "Jakarta",
		Hobi:   []string{"Gaming"},
	})

	if err != nil {
		t.Errorf("Update failed: %v", err)
	}
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)

	npm := int64(1775410857780493700) // Gunakan NPM yang ada di DB untuk test (disesuaikan)

	err := repository.DeleteMahasiswa(npm)
	if err != nil {
		t.Errorf("Delete failed: %v", err)
	}
}
