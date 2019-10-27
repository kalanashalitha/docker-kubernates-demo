package demo.service;


import demo.model.User;

import java.util.Optional;

public interface UserService<Entityy extends User, ID extends String>{
    boolean isUserExist(ID userId);
    Optional<User> getUser(ID userId);
    User createUser(Entityy user);
}
