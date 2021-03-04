package demo.service;


import demo.dto.UserResponseDto;
import demo.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService{
    boolean isUserExist(String userId);
    Optional<User> getUser(String userId);
    User createUser(User user);
    UserResponseDto login(User user);
    List<User> createUsers(List<User> users) throws Exception;
}
