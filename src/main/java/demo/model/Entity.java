package demo.model;

import demo.enums.Type;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document
@Getter@Setter
public class Entity {
    @Id
    private String id;
    private String userId;
    private Marker marker;
    private String title;
    private String description;
    private VehicleInfo vehicleInfo;
    private Type type;
}
