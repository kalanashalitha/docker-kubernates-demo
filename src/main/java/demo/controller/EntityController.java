/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.controller;

import demo.model.Entity;
import demo.service.EntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 *
 * @author Kalana Shalitha
 */
@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class EntityController {

    @Autowired
    private EntityService entityService;

    @PostMapping(value = "/api/job/save-vehicles")
    public ResponseEntity saveVehicles(@RequestBody List<Entity> jobs) {
        System.out.println("controller called"+ jobs.toString());
        entityService.saveEntities(jobs);
        return ResponseEntity.ok("success");
    }

    @PutMapping(value = "/api/job/save-vehicle")
    public ResponseEntity saveVehicle(@RequestBody Entity job) {
        System.out.println("controller called"+ job.toString());
        if(null == job.getId()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(entityService.saveEntity(job));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(entityService.saveEntity(job));
        }
    }

    @DeleteMapping(value = "/api/job/delete-vehicle")
    public ResponseEntity deleteVehicle(@RequestBody Entity job) {
        System.out.println("controller called"+ job.toString());
        if(null != job.getId()) {
            entityService.deleteEntity(job);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/api/job/all-vehicles")
    public ResponseEntity<List<Entity>> getAllVehicles() {
        return ResponseEntity.ok(entityService.getAllActiveEntities());
    }

}
