package users

import (
	"os"
	"testing"

	usersSvc "github.com/cagodoy/tenpo-challenge/lib/clients-go/users"
	users "github.com/cagodoy/tenpo-users-api"
	"github.com/google/uuid"
)

// TestCreate ...
func TestCreate(t *testing.T) {
	usersHost := os.Getenv("USERS_HOST")
	if usersHost == "" {
		t.Errorf("TestCreate: missing env variable USERS_HOST, failed with %s value", usersHost)
		return
	}

	usersPort := os.Getenv("USERS_PORT")
	if usersPort == "" {
		t.Errorf("TestCreate: missing env variable USERS_PORT, failed with %s value", usersPort)
		return
	}

	us := usersSvc.NewService(usersHost + ":" + usersPort)

	randomUUID := uuid.New()

	// Test create with empty values for new user
	user := users.User{}
	newUser, err := us.Create(user)
	if err == nil {
		t.Errorf("TestCreate: UserSvc.Create(invalid name user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "name is not valid" {
		t.Errorf("TestCreate: UserSvc.Create(invalid name user) failed: %s", err.Error())
	}

	// Test create with invalid name new user
	user = users.User{
		Name: "",
	}
	newUser, err = us.Create(user)
	if err == nil {
		t.Errorf("TestCreate: UserSvc.Create(invalid name user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "name is not valid" {
		t.Errorf("TestCreate: UserSvc.Create(invalid name user) failed: %s", err.Error())
	}

	// Test create invalid email new user
	user = users.User{
		Name:  "fake_user",
		Email: "",
	}
	newUser, err = us.Create(user)
	if err == nil {
		t.Errorf("TestCreate: UserSvc.Create(invalid email user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "email is not valid" {
		t.Errorf("TestCreate: UserSvc.Create(invalid email user) failed: %s", err.Error())
	}

	// Test create invalid password new user
	user = users.User{
		Name:     "fake_user",
		Email:    "fake_email_" + randomUUID.String(),
		Password: "",
	}
	newUser, err = us.Create(user)
	if err == nil {
		t.Errorf("TestCreate: UserSvc.Create(invalid password user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "password is not valid" {
		t.Errorf("TestCreate: UserSvc.Create(invalid password user) failed: %s", err.Error())
	}

	// Test create valid new user
	user = users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	newUser, err = us.Create(user)
	if err != nil {
		t.Errorf("TestCreate: UserSvc.Create(valid user) failed: %s", err.Error())
		return
	}

	expected := newUser.ID
	if expected == "" {
		t.Errorf("TestCreate: newUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = newUser.Email
	if user.Email != expected {
		t.Errorf("TestCreate: newUser.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = newUser.Password
	if user.Password == expected {
		t.Errorf("TestCreate: newUser.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = newUser.Name
	if user.Name != expected {
		t.Errorf("TestCreate: newUser.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.
}

// TestGet ...
func TestGet(t *testing.T) {
	usersHost := os.Getenv("USERS_HOST")
	if usersHost == "" {
		t.Errorf("TestGet: missing env variable USERS_HOST, failed with %s value", usersHost)
		return
	}

	usersPort := os.Getenv("USERS_PORT")
	if usersPort == "" {
		t.Errorf("TestGet: missing env variable USERS_PORT, failed with %s value", usersPort)
		return
	}

	us := usersSvc.NewService(usersHost + ":" + usersPort)

	randomUUID := uuid.New()

	// Test create new user
	user := users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	newUser, err := us.Create(user)
	if err != nil {
		t.Errorf("TestGet: UserSvc.Create(user) failed: %s", err.Error())
		return
	}

	expected := newUser.ID
	if expected == "" {
		t.Errorf("TestGet: newUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = newUser.Email
	if user.Email != expected {
		t.Errorf("TestGet: newUser.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = newUser.Password
	if user.Password == expected {
		t.Errorf("TestGet: newUser.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = newUser.Name
	if user.Name != expected {
		t.Errorf("TestGet: newUser.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.

	// Test Get with invalid param
	getUser, err := us.Get("")
	if err == nil {
		t.Errorf("TestGet: UserSvc.Create(invalid ID param) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "userID is not valid" {
		t.Errorf("TestGet: UserSvc.Create(invalid ID param) failed: %s", err.Error())
	}

	// Test Get new user
	getUser, err = us.Get(newUser.ID)
	if err != nil {
		t.Errorf("TestGet: UserSvc.Get(id) failed: %s", err.Error())
		return
	}

	expected = getUser.ID
	if newUser.ID != expected {
		t.Errorf("TestGet: getnewUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = getUser.Email
	if newUser.Email != expected {
		t.Errorf("TestGet: getUser.Email(\"\") failed, expected %v, got %v", expected, newUser.Email)
		return
	}

	expected = getUser.Password
	if newUser.Password != expected {
		t.Errorf("TestGet: getUser.Password(\"\") failed, expected %v, got %v", expected, newUser.Password)
		return
	}

	expected = getUser.Name
	if newUser.Name != expected {
		t.Errorf("TestGet: getUser.Name(\"\") failed, expected %v, got %v", expected, newUser.Name)
		return
	}
}

// TestGetByEmail ...
func TestGetByEmail(t *testing.T) {
	usersHost := os.Getenv("USERS_HOST")
	if usersHost == "" {
		t.Errorf("TestGetByEmail: missing env variable USERS_HOST, failed with %s value", usersHost)
		return
	}

	usersPort := os.Getenv("USERS_PORT")
	if usersPort == "" {
		t.Errorf("TestGetByEmail: missing env variable USERS_PORT, failed with %s value", usersPort)
		return
	}

	us := usersSvc.NewService(usersHost + ":" + usersPort)

	randomUUID := uuid.New()

	// Test create new user
	user := users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	newUser, err := us.Create(user)
	if err != nil {
		t.Errorf("TestGetByEmail: UserSvc.Create(user) failed: %s", err.Error())
		return
	}

	expected := newUser.ID
	if expected == "" {
		t.Errorf("TestGetByEmail: newUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = newUser.Email
	if user.Email != expected {
		t.Errorf("TestGetByEmail: newUser.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = newUser.Password
	if user.Password == expected {
		t.Errorf("TestGetByEmail: newUser.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = newUser.Name
	if user.Name != expected {
		t.Errorf("TestGetByEmail: newUser.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.

	// Test TestGetByEmail with invalid param
	getByEmailUser, err := us.GetByEmail("")
	if err == nil {
		t.Errorf("TestGetByEmail: UserSvc.Create(invalid email param) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "email is not valid" {
		t.Errorf("TestGetByEmail: UserSvc.Create(invalid email param) failed: %s", err.Error())
	}

	// Test TestGetByEmail new user
	getByEmailUser, err = us.GetByEmail(newUser.Email)
	if err != nil {
		t.Errorf("TestGetByEmail: UserSvc.GetByEmail(email) failed: %s", err.Error())
		return
	}

	expected = getByEmailUser.ID
	if newUser.ID != expected {
		t.Errorf("TestGetByEmail: getnewUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = getByEmailUser.Email
	if newUser.Email != expected {
		t.Errorf("TestGetByEmail: getByEmailUser.Email(\"\") failed, expected %v, got %v", expected, newUser.Email)
		return
	}

	expected = getByEmailUser.Password
	if newUser.Password != expected {
		t.Errorf("TestGetByEmail: getByEmailUser.Password(\"\") failed, expected %v, got %v", expected, newUser.Password)
		return
	}

	expected = getByEmailUser.Name
	if newUser.Name != expected {
		t.Errorf("TestGetByEmail: getByEmailUser.Name(\"\") failed, expected %v, got %v", expected, newUser.Name)
		return
	}
}

// TestVerifyPassword ...
func TestVerifyPassword(t *testing.T) {
	usersHost := os.Getenv("USERS_HOST")
	if usersHost == "" {
		t.Errorf("TestVerifyPassword: missing env variable USERS_HOST, failed with %s value", usersHost)
		return
	}

	usersPort := os.Getenv("USERS_PORT")
	if usersPort == "" {
		t.Errorf("TestVerifyPassword: missing env variable USERS_PORT, failed with %s value", usersPort)
		return
	}

	us := usersSvc.NewService(usersHost + ":" + usersPort)

	randomUUID := uuid.New()

	// Test create new user
	user := users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	newUser, err := us.Create(user)
	if err != nil {
		t.Errorf("TestVerifyPassword: UserSvc.Create(user) failed: %s", err.Error())
		return
	}

	expected := newUser.ID
	if expected == "" {
		t.Errorf("TestVerifyPassword: newUser.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = newUser.Email
	if user.Email != expected {
		t.Errorf("TestVerifyPassword: newUser.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = newUser.Password
	if user.Password == expected {
		t.Errorf("TestVerifyPassword: newUser.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = newUser.Name
	if user.Name != expected {
		t.Errorf("TestVerifyPassword: newUser.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.

	// Test verifyPasswordUser with invalid email param
	verifyPasswordUser, err := us.VerifyPassword("", user.Password)
	if err == nil {
		t.Errorf("TestVerifyPassword: UserSvc.Create(invalid email param) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "email is not valid" {
		t.Errorf("TestVerifyPassword: UserSvc.Create(invalid email param) failed: %s", err.Error())
	}

	// Test verifyPasswordUser with invalid password param
	verifyPasswordUser, err = us.VerifyPassword(user.Email, "")
	if err == nil {
		t.Errorf("TestVerifyPassword: UserSvc.Create(invalid password param) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "password is not valid" {
		t.Errorf("TestVerifyPassword: UserSvc.Create(invalid password param) failed: %s", err.Error())
	}

	// Test verifyPasswordUser with new user
	verifyPasswordUser, err = us.VerifyPassword(newUser.Email, user.Password)
	if err != nil {
		t.Errorf("TestVerifyPassword: UserSvc.VerifyPassword(email, password) failed: %s", err.Error())
		return
	}

	if verifyPasswordUser != true {
		t.Errorf("TestVerifyPassword: getnewUser.ID(\"\") failed, expected %v, got %v", verifyPasswordUser, true)
		return
	}
}

// TODO(ca): implements UserList() method
