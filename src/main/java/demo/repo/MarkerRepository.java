/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.repo;
import demo.model.Marker;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 *
 * @author Kalana Shalitha
 */

public interface MarkerRepository extends MongoRepository<Marker, String>{

}

