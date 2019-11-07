/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.service.impl;

import java.util.List;
import java.util.Optional;

import demo.model.User;
//import demo.repo.Repository;
import demo.repo.UserRepository;
import demo.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Kalana Shalitha
 */
@Service
@Transactional
public class BaseServiceImpl<Entity extends User, ID extends String> implements BaseService<Entity, ID> {

    public BaseServiceImpl(UserRepository<Entity, ID> repository) {
        this.repository = repository;
    }
    public BaseServiceImpl() {
    }

    //private Repository<Entity,ID> repository;
    @Autowired
    private UserRepository<Entity,ID> repository;
    
    @Override
    public Optional<Entity> getEntity(ID id) {
        System.out.println("gggggggggggg"+id);
        System.out.println(repository);
        Optional<Entity> byId = repository.findById(id);
        System.out.println(byId);return byId;
    }

    @Override
    public Entity createEntity(Entity entity) {
        return repository.save(entity);
    }

    @Override
    public void modifyEntity(Entity entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void deleteEntity(Entity entity) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Optional<List<Entity>> getAllEntities() {
        List<Entity> all = repository.findAll();
        return Optional.of(all);
    }

    @Override
    public Optional getAllActiveEntities() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Optional getAllInactiveEntities() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
