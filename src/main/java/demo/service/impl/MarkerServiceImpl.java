/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *//*

package demo.service.impl;
import demo.model.Marker;
import demo.repo.MarkerRepository;
import demo.service.MarkerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

*/
/**
 *
 * @author Kalana Shalitha
 *//*

@Service
@Transactional
public class MarkerServiceImpl<Entity extends Marker, ID extends String> extends BaseServiceImpl<Marker, String> implements MarkerService<Entity, ID> {

    private MarkerRepository<Marker, String> markerRepository;

    @Override
    public Optional<Marker> getMarker(ID id) {
        return super.getEntity(id);
    }

    public void saveMarker(Marker marker){
        super.createEntity(marker);
    }

    @Override
    public Optional<List<Marker>> getAllMarkers() {
        return super.getAllEntities();
    }
}
*/
