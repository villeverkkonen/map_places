package map_places.controller;

import map_places.domain.Place;
import map_places.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;

@Profile("default")
@Controller
public class ApplicationController {

    @Value("${api_key}")
    private String api_key;

    @Autowired
    private PlaceRepository placeRepository;

    @PostConstruct
    public void init() {
        Place place1 = new Place("Testi1", "Tämä on testi 1.", "60", "25", "8-10");
        this.placeRepository.save(place1);

        Place place2 = new Place("Testi2", "Tämä on testi 2.", "61", "26", "10-12");
        this.placeRepository.save(place2);
    }

    @GetMapping("/")
    public String home(Model model) {
        String map_url = "https://maps.googleapis.com/maps/api/js?key=" + this.api_key + "&callback=initMap";
        model.addAttribute("map_url", map_url);
        model.addAttribute("places", placeRepository.findAll());
        return "index";
    }
}