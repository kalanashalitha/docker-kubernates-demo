/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.service;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author Kalana Shalitha
 */
public interface BaseService<Entity, ID> extends Service {
    Optional<Entity> getEntity(ID id);
    Entity createEntity(Entity entity);
    void modifyEntity(Entity entity);
    void deleteEntity(Entity entity);
    Optional<List<Entity>> getAllEntities();
    Optional<List<Entity>> getAllActiveEntities();
    Optional<List<Entity>> getAllInactiveEntities();
    
}
