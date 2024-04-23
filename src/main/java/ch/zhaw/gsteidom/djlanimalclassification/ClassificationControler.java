package ch.zhaw.gsteidom.djlanimalclassification;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassificationControler {
    @GetMapping("/ping")
    public String ping() {
        return "Classification app is up and running!";
    }
}
