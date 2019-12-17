package auth

import (
	"os"
	"testing"

	authSvc "github.com/cagodoy/tenpo-challenge/lib/clients-go/auth"
	users "github.com/cagodoy/tenpo-users-api"
	"github.com/google/uuid"
)

// TestSignUp ...
func TestSignUp(t *testing.T) {
	authHost := os.Getenv("AUTH_HOST")
	if authHost == "" {
		t.Errorf("TestSignUp: missing env variable AUTH_HOST, failed with %s value", authHost)
		return
	}

	authPort := os.Getenv("AUTH_PORT")
	if authPort == "" {
		t.Errorf("TestSignUp: missing env variable AUTH_PORT, failed with %s value", authPort)
		return
	}

	as := authSvc.NewService(authHost + ":" + authPort)

	// Test sign up user with empty values
	user := users.User{}
	_, err := as.SignUp(user)
	if err == nil {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid name user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "name is not valid" {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid name user) failed: %s", err.Error())
	}

	// Test create with invalid name new user
	user = users.User{
		Name: "",
	}
	_, err = as.SignUp(user)
	if err == nil {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid name user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "name is not valid" {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid name user) failed: %s", err.Error())
	}

	// Test create invalid email new user
	user = users.User{
		Name:  "fake_user",
		Email: "",
	}
	_, err = as.SignUp(user)
	if err == nil {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid email user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "email is not valid" {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid email user) failed: %s", err.Error())
	}

	randomUUID := uuid.New()

	// Test create invalid password new user
	user = users.User{
		Name:     "fake_user",
		Email:    "fake_email_" + randomUUID.String(),
		Password: "",
	}
	_, err = as.SignUp(user)
	if err == nil {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid password user) failed: %s", err.Error())
	}
	if err != nil && err.Error() != "password is not valid" {
		t.Errorf("TestSignUp: AuthSvc.SignUp(invalid password user) failed: %s", err.Error())
	}

	// Test create valid new user
	user = users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	auth, err := as.SignUp(user)
	if err != nil {
		t.Errorf("TestSignUp: AuthSvc.SignUp(valid user) failed: %s", err.Error())
		return
	}

	expected := auth.Data.ID
	if expected == "" {
		t.Errorf("TestSignUp: auth.Data.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = auth.Data.Email
	if user.Email != expected {
		t.Errorf("TestSignUp: auth.Data.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = auth.Data.Password
	if user.Password == expected {
		t.Errorf("TestSignUp: auth.Data.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = auth.Data.Name
	if user.Name != expected {
		t.Errorf("TestSignUp: auth.Data.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	expected = auth.Meta.Token
	if expected == "" {
		t.Errorf("TestSignUp: auth.Meta.Token(\"\") failed, expected %v", expected)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.
}

// TestLogin ...
func TestLogin(t *testing.T) {
	authHost := os.Getenv("AUTH_HOST")
	if authHost == "" {
		t.Errorf("TestLogin: missing env variable AUTH_HOST, failed with %s value", authHost)
		return
	}

	authPort := os.Getenv("AUTH_PORT")
	if authPort == "" {
		t.Errorf("TestLogin: missing env variable AUTH_PORT, failed with %s value", authPort)
		return
	}

	as := authSvc.NewService(authHost + ":" + authPort)

	randomUUID := uuid.New()

	// After: signup user
	user := users.User{
		Email:    "fake_email_" + randomUUID.String(),
		Password: "fake password",
		Name:     "fake name",
	}

	signup, err := as.SignUp(user)
	if err != nil {
		t.Errorf("TestLogin: AuthSvc.SignUp(valid user) failed: %s", err.Error())
		return
	}

	// Test login user
	auth, err := as.Login(signup.Data.Email, user.Password)
	if err != nil {
		t.Errorf("TestLogin: AuthSvc.SignUp(valid user) failed: %s", err.Error())
		return
	}

	expected := auth.Data.ID
	if expected == "" {
		t.Errorf("TestLogin: auth.Data.ID(\"\") failed, expected %v, got %v", expected, user.ID)
		return
	}

	expected = auth.Data.Email
	if user.Email != expected {
		t.Errorf("TestLogin: auth.Data.Email(\"\") failed, expected %v, got %v", expected, user.Email)
		return
	}

	expected = auth.Data.Password
	if user.Password == expected {
		t.Errorf("TestLogin: auth.Data.Password(\"\") failed, expected %v, got %v", expected, user.Password)
		return
	}

	expected = auth.Data.Name
	if user.Name != expected {
		t.Errorf("TestLogin: auth.Data.Name(\"\") failed, expected %v, got %v", expected, user.Name)
		return
	}

	expected = auth.Meta.Token
	if expected == "" {
		t.Errorf("TestLogin: auth.Meta.Token(\"\") failed, expected %v", expected)
		return
	}

	// TODO(ca): should implements code for validate createdAt and updateAt attrs values.
}
