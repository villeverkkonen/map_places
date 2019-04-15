package map_places.domain;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Entity;

@Entity
public class Place extends AbstractPersistable<Long> {

    private String title;
    private String description;
    private String latitude;
    private String longitude;
    private String openingHours;

    public Place() {

    }

    public Place(String title, String description, String latitude, String longitude, String openingHours) {
        this.title = title;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.openingHours = openingHours;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getOpeningHours() {
        return openingHours;
    }

    public void setOpeningHours(String openingHours) {
        this.openingHours = openingHours;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Title: " + this.title + "\n");
        sb.append("Description: " + this.description + "\n");
        sb.append("Latitude: " + this.latitude + "\n");
        sb.append("Longitude: " + this.longitude + "\n");
        sb.append("Open: " + this.openingHours + "\n");

        return sb.toString();
    }
}
