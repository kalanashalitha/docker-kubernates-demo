package demo.service;

import java.util.List;
import java.util.Optional;

/**
 * Created by Kalana Shalitha on 8/19/2017.
 */
public interface BaseObjectService {
    Optional<Object> getEntity(Object id);
    void createEntity(Object entity);
    void modifyEntity(Object entity);
    void deleteEntity(Object entity);
    Optional<List<Object>> listAllEntities();
    Optional<List<Object>> listAllActiveEntities();
    Optional<List<Object>> listAllInactiveEntities();

}
