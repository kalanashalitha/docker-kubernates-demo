/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.service;
import demo.model.Marker;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Kalana Shalitha
 */
public interface MarkerService<Entity extends Marker, ID extends String> {
    Optional<Marker> getMarker(ID id);
    void saveMarker(Marker marker);
    Optional<List<Marker>> getAllMarkers();
}
