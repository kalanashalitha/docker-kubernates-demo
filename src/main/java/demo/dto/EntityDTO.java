package demo.dto;

import demo.enums.Type;
import demo.model.Marker;
import demo.model.Photo;
import demo.model.VehicleInfo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter@Setter
public class EntityDTO {
    private String id;
    private String userId;
    private Marker marker;
    private String title;
    private String description;
    private VehicleInfo vehicleInfo;
    private Type type;
    private List<Photo> photoList;
}
