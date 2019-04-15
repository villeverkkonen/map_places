package map_places.controller;

import map_places.domain.Place;
import map_places.repository.PlaceRepository;
import map_places.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class MapPlacesController {

    @Autowired
    private PlaceService placeService;

    @PostMapping("/add_place")
    public Place addPlace(@RequestBody Place placeParams) throws Exception {
        Place place = new Place();
        place.setTitle(placeParams.getTitle());
        place.setDescription(placeParams.getDescription());
        place.setLatitude(placeParams.getLatitude());
        place.setLongitude(placeParams.getLongitude());
        place.setOpeningHours(placeParams.getOpeningHours());
        this.placeService.save(place);

        return place;
    }

    @GetMapping("/get_places")
    public String getPlaces(Model model) {
        model.addAttribute("places", this.placeService.findAll());
        return "index :: placesList";
    }
}
