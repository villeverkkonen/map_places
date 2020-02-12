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

    public Place findById(Long id) {
        Place place = this.placeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
        return place;
    }

    public void save(Place place) {
        this.placeRepository.save(place);
    }

    public void delete(Place place) {
        this.placeRepository.delete(place);
    }

    public void update(Place placeParams, Long id) {
        Place place = this.placeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));
        place.setTitle(placeParams.getTitle());
        place.setDescription(placeParams.getDescription());
        place.setLatitude(placeParams.getLatitude());
        place.setLongitude(placeParams.getLongitude());
        place.setOpeningHours(placeParams.getOpeningHours());
        this.placeRepository.save(place);
    }
}
