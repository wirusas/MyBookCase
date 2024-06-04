package lt.chomicenko.bookcase_api.dto;

import lombok.Data;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@Data
public class BookDto {

    private String id;
    private String bookName;
    private String description;
    private String ISBN;
    private String imageUrl;
    private String numberOfPages;
    private String category;
    private Map<String, String> comment;
    private List<Integer> rating;
    private ZonedDateTime createdAt;
    private List<UserDto> users;

    public BookDto(String id, String bookName, String description, String ISBN, String imageUrl, String numberOfPages, String category, Map<String, String> comment, List<Integer> rating, ZonedDateTime createdAt, List<UserDto> users) {
        this.id = id;
        this.bookName = bookName;
        this.description = description;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.numberOfPages = numberOfPages;
        this.category = category;
        this.comment = comment;
        this.rating = rating;
        this.createdAt = createdAt;
        this.users = users;
    }

    @Data
    public static class UserDto {
        private String username;

        public UserDto(String username) {
            this.username = username;
        }
    }
}
