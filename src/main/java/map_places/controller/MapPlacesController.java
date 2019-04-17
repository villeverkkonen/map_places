package map_places.controller;

import map_places.domain.Place;
import map_places.repository.PlaceRepository;
import map_places.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class MapPlacesController {

    @Autowired
    private PlaceService placeService;

    @PostMapping("/add_place")
    public String addPlace(@RequestBody Place placeParams, Model model) throws Exception {
        Place place = new Place();
        place.setTitle(placeParams.getTitle());
        place.setDescription(placeParams.getDescription());
        place.setLatitude(placeParams.getLatitude());
        place.setLongitude(placeParams.getLongitude());
        place.setOpeningHours(placeParams.getOpeningHours());
        this.placeService.save(place);

        model.addAttribute("places", this.placeService.findAll());

        return "fragments/places_list::placesList";
    }

    @PostMapping("/delete_place/{id}")
    public String deletePlace(@PathVariable("id") Long id, Model model) throws Exception {
        Place place = this.placeService.findById(id);
        this.placeService.delete(place);

        model.addAttribute("places", this.placeService.findAll());

        return "fragments/places_list::placesList";
    }
}
