package demo.service.impl;

import demo.dto.EntityDTO;
import demo.model.Entity;
import demo.model.Photo;
import demo.repo.EntityRepository;
import demo.repo.PhotoRepository;
import demo.repo.UserRepository;
import demo.service.EntityService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class EntityServiceImpl implements EntityService {

    private final static Logger LOGGER = Logger.getLogger(EntityServiceImpl.class.getName());

    @Autowired
    private EntityRepository entityRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveEntities(List<Entity> jobs) {
        List<Entity> jobList = entityRepository.saveAll(jobs);
    }

    @Override
    public Entity saveEntity(EntityDTO entityDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Entity entity = modelMapper.map(entityDTO, Entity.class);
        entityDTO.getPhotoList().stream().filter(photo -> null == photo.getId()).collect(Collectors.toList()).forEach(photoData -> {
            Photo photo = modelMapper.map(photoData, Photo.class);
            photo.setEntityId(entity.getId());
            photoRepository.save(photo);
        });
        return entityRepository.save(entity);
    }

    @Override
    public void deleteEntity(Entity job) {
        entityRepository.delete(job);
    }

    @Override
    public List<Entity> getJobsByUserId(String userId) {
        return null;
    }

    @Override
    public List<EntityDTO> getAllActiveEntities() {
        List<EntityDTO> entityDTOList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        List<Entity> all = entityRepository.findAll();
        all.forEach(entity -> {
            EntityDTO entityDTO = modelMapper.map(entity, EntityDTO.class);
            List<Photo> byEntityId = photoRepository.findByEntityId(entity.getId());
            entityDTO.setPhotoList(byEntityId);
            entityDTOList.add(entityDTO);
        });
        return entityDTOList;
    }
}
