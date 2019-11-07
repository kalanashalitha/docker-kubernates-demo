package demo.repo;

import demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository<Entity extends User, ID extends String> extends MongoRepository<Entity, String> {

}
