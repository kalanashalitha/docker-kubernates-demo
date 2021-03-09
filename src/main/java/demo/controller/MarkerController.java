/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.controller;
import demo.dto.MarkersDTO;
import demo.model.Marker;
import demo.service.MarkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;



/**
 *
 * @author Kalana Shalitha
 */
@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class MarkerController {

    @Autowired
    private MarkerService markerService;

    /*@RequestMapping(method = RequestMethod.POST, value = "/api/marker/save-marker")
    public void saveMarker(@RequestBody Marker marker){
        System.out.println("controller called"+marker.toString());
        markerService.saveMarker(marker);
    }*/

    @RequestMapping(method = RequestMethod.POST, value = "/api/marker/save-markers")
    public void saveMarkers(@RequestBody MarkersDTO markersDTO) {
        System.out.println("controller called"+ markersDTO.toString());
        markerService.saveMarkers(markersDTO);
    }

    /*@RequestMapping(method = RequestMethod.GET, value = "/api/marker/all-markers")
    public ResponseEntity<List<Marker>> getAllMarkers(){
        Optional<List<Marker>> allMarkers = markerService.getAllMarkers();

        System.out.println(allMarkers);
        if(!allMarkers.isPresent()) return (ResponseEntity<List<Marker>>) ResponseEntity.noContent();
        else return ResponseEntity.ok().body(allMarkers.get());

    }*/

}
