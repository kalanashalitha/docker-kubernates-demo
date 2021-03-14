/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package demo.controller;

import demo.model.Job;
import demo.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void saveJobs(@RequestBody List<Job> jobs) {
        System.out.println("controller called"+ jobs.toString());
        jobService.saveJobs(jobs);
    }

    @GetMapping(value = "/api/job/all-jobs")
    public List<Job> getAllJobs() {
        return jobService.getAllActiveJobs();
    }

}
