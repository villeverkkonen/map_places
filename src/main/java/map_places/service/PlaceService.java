package map_places.service;

import map_places.domain.Place;
import map_places.repository.PlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public PlaceService() {
    }

    public List<Place> findAll() {
        return this.placeRepository.findAll();
    }

    public void save(Place place) {
        this.placeRepository.save(place);
    }
}
