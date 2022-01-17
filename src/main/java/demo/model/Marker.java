package demo.model;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;

/**
 * Created by Kalana Shalitha on 8/15/2017.
 */
@Setter@Getter
public class Marker {
    @Id
    private String id;
    private Position position;
    private String title;
    private String name;
    @Setter@Getter
    static class Position {
        private double lat;
        private double lng;
    }
}
