package auth

import (
	"context"
	"errors"
	"log"

	pb "github.com/cagodoy/tenpo-challenge/lib/proto"
	users "github.com/cagodoy/tenpo-users-api"
	"google.golang.org/grpc"
)

// Service ...
type Service struct {
	Client pb.AuthServiceClient
}

// NewService ...
func NewService(address string) *Service {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatal("couldn't connect to auth server", err)
	}

	c := pb.NewAuthServiceClient(conn)

	return &Service{
		Client: c,
	}
}

// MetaResponse ...
type MetaResponse struct {
	Token string `json:"token"`
}

// Response ...
type Response struct {
	Data  *users.User `json:"data"`
	Meta  *MetaResponse
	Error *struct {
		Code    string `json:"code"`
		Message string `json:"message"`
	}
}

// SignUp ...
func (c *Service) SignUp(user users.User) (*Response, error) {
	if user.Name == "" {
		return nil, errors.New("name is not valid")
	}

	if user.Email == "" {
		return nil, errors.New("email is not valid")
	}

	if user.Password == "" {
		return nil, errors.New("password is not valid")
	}

	gr, err := c.Client.SignUp(context.Background(), &pb.AuthSignupRequest{
		User: user.ToProto(),
	})
	if err != nil {
		return nil, err
	}

	u := &users.User{}
	meta := &MetaResponse{
		Token: gr.GetMeta().GetToken(),
	}
	res := &Response{
		Data: u.FromProto(gr.GetData()),
		Meta: meta,
	}

	return res, nil
}

// Login ...
func (c *Service) Login(email, password string) (*Response, error) {
	if email == "" {
		return nil, errors.New("email is not valid")
	}

	if password == "" {
		return nil, errors.New("password is not valid")
	}

	gr, err := c.Client.Login(context.Background(), &pb.AuthLoginRequest{
		Email:    email,
		Password: password,
	})
	if err != nil {
		return nil, err
	}

	u := &users.User{}
	meta := &MetaResponse{
		Token: gr.GetMeta().GetToken(),
	}
	res := &Response{
		Data: u.FromProto(gr.GetData()),
		Meta: meta,
	}

	return res, nil
}

// VerifyPassword ...
func (c *Service) VerifyPassword(token string) (bool, error) {
	if token == "" {
		return false, errors.New("token is not valid")
	}

	gr, err := c.Client.VerifyToken(context.Background(), &pb.AuthVerifyTokenRequest{
		Token: token,
	})
	if err != nil {
		return false, err
	}

	valid := gr.GetValid()
	if valid == false {
		msg := gr.GetError().GetMessage()
		return false, errors.New(msg)
	}

	return valid, nil
}
