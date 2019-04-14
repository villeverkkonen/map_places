package map_places.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapPlacesController {

    @GetMapping("/")
    public String home() {
        return "index";
    }
}
