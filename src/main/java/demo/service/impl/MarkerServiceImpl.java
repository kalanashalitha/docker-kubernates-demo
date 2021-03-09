/* * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.*/


package demo.service.impl;
import demo.dto.MarkersDTO;
import demo.model.Marker;
import demo.model.User;
import demo.repo.MarkerRepository;
import demo.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Kalana Shalitha
 */

@Service
@Transactional
public class MarkerServiceImpl implements MarkerService{

    private final static Logger LOGGER = Logger.getLogger(MarkerServiceImpl.class.getName());

    @Autowired
    private MarkerRepository markerRepository;

    @Override //@Transactional
    public void saveMarkers(MarkersDTO markersDTO) {
        LOGGER.setLevel(Level.INFO);
        List<Marker> markers = markersDTO.getMarkers();
        markers.forEach(marker -> {
            marker.setUserId(markersDTO.getUserId());
            if(null == marker.getId()) {
                marker.setUserId(markersDTO.getUserId());
                markerRepository.save(marker);
            } else {
                Optional<Marker> byId = markerRepository.findById(marker.getId());
                byId.ifPresent(byIdMarker -> {
                    byIdMarker.setName(marker.getName());
                    markerRepository.save(byIdMarker);
                });
            }
        });
    }
}
