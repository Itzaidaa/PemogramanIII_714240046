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

	// Create dummy data
	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	inserted, err := repository.InsertMahasiswa(&model.Mahasiswa{
		NPM:    npm,
		Nama:   "Find Test",
		Prodi:  "Informatika",
		Alamat: "Jakarta",
		Email:  "findtest@mail.com",
		NoHP:   "089876543210",
		Hobi:   []string{"Reading"},
	})
	if err != nil {
		t.Fatalf("Insert for GetTest failed: %v", err)
	}

	mhs, err := repository.GetMahasiswaByNPM(inserted.NPM)
	if err != nil {
		t.Errorf("GetByNPM failed: %v", err)
	}

	if mhs.NPM != inserted.NPM {
		t.Errorf("Expected %s, got %s", inserted.NPM, mhs.NPM)
	}
	fmt.Printf("DATA DITEMUKAN: %+v\n", mhs)
}

func TestUpdateMahasiswa(t *testing.T) {
	setupTest(t)

	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	inserted, err := repository.InsertMahasiswa(&model.Mahasiswa{
		NPM:    npm,
		Nama:   "Before Update",
		Prodi:  "Informatika",
		Alamat: "Bandung",
		Email:  "before@mail.com",
		NoHP:   "081111111111",
		Hobi:   []string{"Coding"},
	})
	if err != nil {
		t.Fatalf("Insert for UpdateTest failed: %v", err)
	}

	_, err = repository.UpdateMahasiswa(inserted.NPM, &model.Mahasiswa{
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
}

func TestDeleteMahasiswa(t *testing.T) {
	setupTest(t)

	npm := strconv.FormatInt(time.Now().UnixNano(), 10)
	inserted, err := repository.InsertMahasiswa(&model.Mahasiswa{
		NPM:    npm,
		Nama:   "To Delete",
		Prodi:  "Informatika",
		Alamat: "Depok",
		Email:  "delete@mail.com",
		NoHP:   "083333333333",
		Hobi:   []string{"Music"},
	})
	if err != nil {
		t.Fatalf("Insert for DeleteTest failed: %v", err)
	}

	err = repository.DeleteMahasiswa(inserted.NPM)
	if err != nil {
		t.Errorf("Delete failed: %v", err)
	}
}
