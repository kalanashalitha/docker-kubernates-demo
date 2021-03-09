package demo.dto;

import demo.model.Marker;

import java.util.List;

public class MarkersDTO {
    private String userId;
    private List<Marker> markers;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Marker> getMarkers() {
        return markers;
    }

    public void setMarkers(List<Marker> markers) {
        this.markers = markers;
    }
}
