package demo.service.impl;

import demo.dto.UserResponseDto;
import demo.model.Job;
import demo.model.User;
import demo.repo.JobRepository;
import demo.repo.UserRepository;
import demo.service.JobService;
import demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class JobServiceImpl implements JobService {

    private final static Logger LOGGER = Logger.getLogger(JobServiceImpl.class.getName());

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveJobs(List<Job> jobs) {
        List<Job> jobList = jobRepository.saveAll(jobs);
    }

    @Override
    public List<Job> getJobsByUserId(String userId) {
        return null;
    }

    @Override
    public List<Job> getAllActiveJobs() {
       return jobRepository.findAll();
    }
}
