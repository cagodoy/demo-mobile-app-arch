package users

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
	Client pb.UserServiceClient
}

// NewService ...
func NewService(address string) *Service {
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatal("couldn't connect to users server", err)
	}

	c := pb.NewUserServiceClient(conn)

	return &Service{
		Client: c,
	}
}

// Get ...
func (c *Service) Get(userID string) (*users.User, error) {
	if userID == "" {
		return nil, errors.New("userID is not valid")
	}

	gr, err := c.Client.UserGet(context.Background(), &pb.UserGetRequest{
		UserId: userID,
	})
	if err != nil {
		return nil, err
	}

	var u *users.User = new(users.User)
	user := u.FromProto(gr.GetData())
	return user, nil
}

// GetByEmail ...
func (c *Service) GetByEmail(email string) (*users.User, error) {
	if email == "" {
		return nil, errors.New("email is not valid")
	}

	gr, err := c.Client.UserGetByEmail(context.Background(), &pb.UserGetByEmailRequest{
		Email: email,
	})
	if err != nil {
		return nil, err
	}

	var u *users.User = new(users.User)
	user := u.FromProto(gr.GetData())
	return user, nil
}

// Create ...
func (c *Service) Create(user users.User) (*users.User, error) {
	if user.Name == "" {
		return nil, errors.New("name is not valid")
	}

	if user.Email == "" {
		return nil, errors.New("email is not valid")
	}

	if user.Password == "" {
		return nil, errors.New("password is not valid")
	}

	gr, err := c.Client.UserCreate(context.Background(), &pb.UserCreateRequest{
		Data: user.ToProto(),
	})
	if err != nil {
		return nil, err
	}

	var u *users.User = new(users.User)
	uu := u.FromProto(gr.GetData())
	return uu, nil
}

// VerifyPassword ...
func (c *Service) VerifyPassword(email, password string) (bool, error) {
	if email == "" {
		return false, errors.New("email is not valid")
	}

	if password == "" {
		return false, errors.New("password is not valid")
	}

	gr, err := c.Client.UserVerifyPassword(context.Background(), &pb.UserVerifyPasswordRequest{
		Email:    email,
		Password: password,
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

// List ...
func (c *Service) List() ([]*users.User, error) {
	gr, err := c.Client.UserList(context.Background(), &pb.UserListRequest{})
	if err != nil {
		return nil, err
	}

	protoUsers := gr.GetData()

	data := make([]*users.User, 0)
	for _, user := range protoUsers {
		var u *users.User = new(users.User)
		data = append(data, u.FromProto(user))
	}

	return data, nil
}
