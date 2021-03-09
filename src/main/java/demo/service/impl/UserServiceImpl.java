package demo.service.impl;

import demo.dto.UserResponseDto;
import demo.model.User;
import demo.repo.UserRepository;
import demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = Logger.getLogger(UserServiceImpl.class.getName());

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean isUserExist(String userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public Optional<User> getUser(String userId) {
        System.out.println("ccccccccccccccccccccccccccccccccccccc"+userId);
        Optional<User> one = userRepository.findById(userId);
        return one;
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserResponseDto login(User user) {
        UserResponseDto userResponseDto = new UserResponseDto();
        Optional<User> byName = userRepository.findByName(user.getName());
        if(!byName.isPresent()) return null;
        byName.ifPresent(userPresent -> {
            if(user.getPassword().equals(userPresent.getPassword())){
                userResponseDto.setUserId(userPresent.getId());
                userResponseDto.setName(userPresent.getName());
            }
        });
        return userResponseDto;
    }

    @Override //@Transactional
    public List<User> createUsers(List<User> users) throws Exception {
        LOGGER.setLevel(Level.INFO);
        List<User> savedUsers = new ArrayList<>();
        users.forEach(user -> {
                User save = userRepository.save(user);
                LOGGER.info("saved user "+save.getEmail());
                savedUsers.add(save);
        });
        LOGGER.info("method executed after the exception.................................................");
        return savedUsers;
    }
}
