package demo.service.impl;

import demo.model.User;
import demo.repo.UserRepository;
import demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service@Transactional
public class UserServiceImpl<Entity extends User,ID extends String> extends BaseServiceImpl<User,String> implements UserService<Entity,ID> {

    private UserRepository<Entity,ID> userRepository;

    @Override
    public boolean isUserExist(ID userId) {
        //return userRepository.existsById(userId);
        return true;
    }

    @Override
    public Optional<User> getUser(ID userId) {
        System.out.println("ccccccccccccccccccccccccccccccccccccc"+userId);
        Optional<User> entity = super.getEntity(userId);
        System.out.println(entity);
        return entity;
    }

    @Override
    public User createUser(Entity user) {
        return super.createEntity(user);
    }
}
