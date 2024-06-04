package lt.chomicenko.bookcase_api.mapper;

import lt.chomicenko.bookcase_api.dto.BookDto;
import lt.chomicenko.bookcase_api.dto.CreateBookRequest;
import lt.chomicenko.bookcase_api.dto.EditBookRequest;
import lt.chomicenko.bookcase_api.model.Book;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BookMapperImpl implements BookMapper {
    @Override
    public Book toBook(CreateBookRequest createBookRequest) {
        if (createBookRequest == null) {
            return null;
        }
        return new Book(
                createBookRequest.getBookName(),
                createBookRequest.getDescription(),
                createBookRequest.getISBN(),
                createBookRequest.getImageUrl(),
                createBookRequest.getNumberOfPages(),
                createBookRequest.getCategory(),
                createBookRequest.getComment(),
                createBookRequest.getRating()


        );
    }

    @Override
    public Book toBook(EditBookRequest editBookRequest) {
        if (editBookRequest == null) {
            return null;
        }
        return new Book(
                editBookRequest.getBookName(),
                editBookRequest.getDescription(),
                editBookRequest.getISBN(),
                editBookRequest.getImageUrl(),
                editBookRequest.getNumberOfPages(),
                editBookRequest.getCategory(),
                editBookRequest.getComment(),
                editBookRequest.getRating()

        );
    }

    @Override
    public BookDto toBookDto(Book book) {
        if (book == null) {
            return null;
        }
        String id = book.getId() != null ? book.getId() : "";
        String bookName = book.getBookName() != null ? book.getBookName() : "";
        String description = book.getDescription() != null ? book.getDescription() : "";
        String ISBN = book.getISBN() != null ? book.getISBN() : "";
        String imageUrl = book.getImageUrl() != null ? book.getImageUrl() : "";
        String numberOfPages = book.getNumberOfPages() != null ? book.getNumberOfPages() : "";
        String category = book.getCategory() != null ? book.getCategory() : "";
        Map<String, String> comment = book.getComment() != null ? book.getComment() : Map.of();
        List<Integer> rating = book.getRating() != null ? book.getRating() : List.of();
        ZonedDateTime createdAt = book.getCreatedAt() != null ? book.getCreatedAt() : ZonedDateTime.now();

        List<BookDto.UserDto> userDtos = book.getUsers().stream()
                .map(user -> new BookDto.UserDto(user.getUsername()))
                .collect(Collectors.toList());

        return new BookDto(id, bookName, description, ISBN, imageUrl, numberOfPages, category, comment, rating, createdAt, userDtos);
    }
}
