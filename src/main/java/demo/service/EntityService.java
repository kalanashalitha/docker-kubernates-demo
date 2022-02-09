/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.service;
import demo.dto.EntityDTO;
import demo.model.Entity;

import java.util.List;

/**
 *
 * @author Kalana Shalitha
 */
public interface EntityService {
    void saveEntities(List<Entity> job);
    Entity saveEntity(EntityDTO job);
    List<Entity> getJobsByUserId (String userId);
    List<EntityDTO> getAllActiveEntities();
    void deleteEntity(Entity job);
}
