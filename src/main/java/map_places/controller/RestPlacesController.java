package map_places.controller;

import map_places.domain.Place;
import map_places.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;

@RestController
public class RestPlacesController {

    @Autowired
    private PlaceService placeService;

    @RequestMapping(value = "/get_places", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Place> getPlaces() throws Exception {
        return this.placeService.findAll();
    }
}
