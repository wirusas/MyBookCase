package lt.chomicenko.bookcase_api.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CreateBookRequest {

    @Schema(example = "Sample Book")
    @NotBlank
    private String bookName;

    @Schema(example = "This is a sample book description.")
    @NotBlank
    private String description;

    @Schema(example = "1234567890")
    @NotBlank
    private String ISBN;

    @Schema(example = "http://example.com/image.jpg")
    @NotBlank
    private String imageUrl;

    @Schema(example = "300")
    @NotBlank
    private String numberOfPages;

    @Schema(example = "Fiction")
    @NotBlank
    private String category;

    @Schema(example = "{\"user1\": \"Great book!\", \"user2\": \"Loved it!\"}")
    private Map<String, String> comment;

    @Schema(example = "[5, 4]")
    private List<Integer> rating;
}
