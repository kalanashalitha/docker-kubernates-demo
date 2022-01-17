/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo.service;
import demo.model.Job;

import java.util.List;

/**
 *
 * @author Kalana Shalitha
 */
public interface JobService {
    void saveJobs(List<Job> job);
    Job saveJob(Job job);
    List<Job> getJobsByUserId (String userId);
    List<Job> getAllActiveJobs();
}
