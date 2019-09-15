package demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class DemoApplication {
    private StudentRepository studentRepository;

    public DemoApplication(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @RequestMapping("/")
    public String home() {
        System.out.println("root");
        //System.exit(1);
        return "Hello Docker World";
    }

    @RequestMapping("/save")
    public void saveStudent() {
        Student student = new Student(
                "docker-1", "John Doe", Student.Gender.MALE, 1);
        Student save = studentRepository.save(student);
        System.out.println(save.getId());
    }

    @RequestMapping("/get")
    public String getStudent() {
        Student retrievedStudent =
                studentRepository.findById("docker-1").get();
        System.out.println(retrievedStudent.getName());
        return retrievedStudent.getName();
    }

    @GetMapping("/data")
    public String getData() {
        Example example = new Example();
        return example.getData("one")+"----"+example.getData("two");
    }

}
