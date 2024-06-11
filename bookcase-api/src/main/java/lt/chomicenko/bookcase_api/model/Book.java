package lt.chomicenko.bookcase_api.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@Entity
@Table(name = "books")
public class Book {
    @Id
    private String id;
    private String bookName;
    private String description;
    private String ISBN;
    private String imageUrl;
    private String numberOfPages;
    private String category;
    @ElementCollection
    private Map<String, String> comment = new HashMap<>();
    private List<Integer> rating = new ArrayList<>();

    @ManyToMany(mappedBy = "followedBooks")
    private List<User> users = new ArrayList<>();

    private ZonedDateTime createdAt;

    public Book(String bookName, String description, String ISBN, String imageUrl, String numberOfPages, String category, Map<String, String> comment, List<Integer> rating) {
        this.bookName = bookName;
        this.description = description;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.numberOfPages = numberOfPages;
        this.category = category;
        this.comment = comment != null ? comment : new HashMap<>();
        this.rating = rating != null ? rating : new ArrayList<>();
    }

    public Book(String id, String bookName, String description, String ISBN, String imageUrl, String numberOfPages, String category) {
        this.id = id;
        this.bookName = bookName;
        this.description = description;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.numberOfPages = numberOfPages;
        this.category = category;
    }


    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }

    public void addUser(User user) {
        users.add(user);
        user.getFollowedBooks().add(this);
    }

    public void removeUser(User user) {
        users.remove(user);
        user.getFollowedBooks().remove(this);
    }
}
