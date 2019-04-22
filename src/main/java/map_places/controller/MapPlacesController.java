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

    @PostMapping("/places/create")
    public String addPlace(@RequestBody Place placeParams, Model model) throws Exception {
        this.placeService.save(placeParams);
        model.addAttribute("places", this.placeService.findAll());
        return "fragments/places_list::placesList";
    }

    @GetMapping("/places/edit/{id}")
    public String editPlace(@PathVariable("id") Long id, Model model) throws Exception {
        Place place = this.placeService.findById(id);
        model.addAttribute("place", place);
        return "fragments/edit_place::editPlace";
    }

    @PutMapping("/places/update/{id}")
    public String updatePlace(@RequestBody Place placeParams, @PathVariable("id") Long id, Model model) throws Exception {
        this.placeService.update(placeParams, id);
        model.addAttribute("places", this.placeService.findAll());
        return "fragments/places_list::placesList";
    }

    @DeleteMapping("/places/delete/{id}")
    public String deletePlace(@PathVariable("id") Long id, Model model) throws Exception {
        Place place = this.placeService.findById(id);
        this.placeService.delete(place);
        model.addAttribute("places", this.placeService.findAll());
        return "fragments/places_list::placesList";
    }
}
