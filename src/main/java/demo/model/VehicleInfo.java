package demo.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class VehicleInfo {
    private String brand;
    private String model;
    private String year;
    private String transmission;
    private String price;
}
