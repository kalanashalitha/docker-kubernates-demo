package demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Document
@Getter@Setter
public class Job {
    @Id
    private String id;
    private String userId;
    private Marker marker;
    private String title;
    private String description;
}
