/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.repo;
import demo.model.Entity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


/**
 *
 * @author Kalana Shalitha
 */

public interface EntityRepository extends MongoRepository<Entity, String>{
    List<Entity> findByUserId(String userId);
}

