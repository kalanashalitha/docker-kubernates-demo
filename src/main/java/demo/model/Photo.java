package demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;

@Setter
@Getter
public class Photo {
    @Id
    private String id;
    private String base64String;
    private String entityId;
}
