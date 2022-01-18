/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.controller;

import demo.model.Job;
import demo.service.JobService;
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
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping(value = "/api/job/save-jobs")
    public ResponseEntity saveJobs(@RequestBody List<Job> jobs) {
        System.out.println("controller called"+ jobs.toString());
        jobService.saveJobs(jobs);
        return ResponseEntity.ok("success");
    }

    @PutMapping(value = "/api/job/save-job")
    public ResponseEntity saveJob(@RequestBody Job job) {
        System.out.println("controller called"+ job.toString());
        if(null == job.getId()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(jobService.saveJob(job));
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(jobService.saveJob(job));
        }
    }

    @DeleteMapping(value = "/api/job/delete-job")
    public ResponseEntity deleteJob(@RequestBody Job job) {
        System.out.println("controller called"+ job.toString());
        if(null != job.getId()) {
            jobService.deleteJob(job);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/api/job/all-jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllActiveJobs());
    }

}
