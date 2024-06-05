package lt.chomicenko.bookcase_api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.chomicenko.bookcase_api.dto.BookDto;
import lt.chomicenko.bookcase_api.dto.CreateBookRequest;
import lt.chomicenko.bookcase_api.dto.EditBookRequest;
import lt.chomicenko.bookcase_api.exception.NoBooksFoundException;
import lt.chomicenko.bookcase_api.exception.UserNotFoundException;
import lt.chomicenko.bookcase_api.mapper.BookMapper;
import lt.chomicenko.bookcase_api.model.Book;
import lt.chomicenko.bookcase_api.model.User;
import lt.chomicenko.bookcase_api.security.CustomUserDetails;
import lt.chomicenko.bookcase_api.service.BookService;
import lt.chomicenko.bookcase_api.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static lt.chomicenko.bookcase_api.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/books")
public class BookController {
    private final UserService userService;
    private final BookService bookService;
    private final BookMapper bookMapper;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BookDto createBook(@AuthenticationPrincipal CustomUserDetails currentUser,
                              @Valid @RequestBody CreateBookRequest createBookRequest) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Book book = bookMapper.toBook(createBookRequest);
        book.setId(UUID.randomUUID().toString());

        return bookMapper.toBookDto(bookService.saveBook(book));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public BookDto editBook(@AuthenticationPrincipal CustomUserDetails currentUser,
                            @Valid @RequestBody EditBookRequest editBookRequest,
                            @PathVariable UUID id) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Book book = bookMapper.toBook(editBookRequest);
        return bookMapper.toBookDto(bookService.editBook(id, book));
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{id}")
    public BookDto deleteBook(@PathVariable UUID id) {
        Book book = bookService.validateAndGetBook(id.toString());
        bookService.deleteBook(book);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/allBooks")
    public List<BookDto> getAllBooks() {
        List<Book> books = bookService.getBooks();
        return books.stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/allPagedBooks")
    public List<BookDto> getAllPagedBooks(@RequestParam(defaultValue = "0") int page) {
        Page<Book> bookPage = bookService.getAllPagedBooks(PageRequest.of(page, 9));
        return bookPage.getContent().stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{bookId}/favourite")
    public BookDto addToFavourite(@AuthenticationPrincipal CustomUserDetails currentUser,
                                  @PathVariable UUID bookId) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        Book book = bookService.validateAndGetBook(bookId.toString());
        bookService.addUserToBook(user.getEmail(), bookId);
        return bookMapper.toBookDto(book);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{bookId}/favourite")
    public ResponseEntity<?> removeFromFavourite(@AuthenticationPrincipal CustomUserDetails currentUser,
                                                 @PathVariable UUID bookId) {
        try {
            User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
            Book updatedBook = bookService.removeUserFromBook(user.getEmail(), bookId);
            return ResponseEntity.ok(updatedBook);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove user from book");
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/myFavouriteBooks")
    public ResponseEntity<List<BookDto>> getMyFavouriteBooks(@AuthenticationPrincipal CustomUserDetails currentUser) {
        try {
            User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
            List<Book> favouriteBooks = bookService.getBooksByUser(user);
            List<BookDto> favouriteBookDtos = favouriteBooks.stream()
                    .map(bookMapper::toBookDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(favouriteBookDtos);
        } catch (NoBooksFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/bookName")
    public List<BookDto> getBookByName(@RequestParam String bookName) {
        List<Book> books = bookService.findByNameContaining(bookName);
        return books.stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/bookCategory")
    public List<BookDto> getBookByCategory(@RequestParam String category) {
        List<Book> books = bookService.findByCategory(category);
        return books.stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{bookId}/comments")
    public BookDto addCommentToBook(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable String bookId, @RequestParam String comment) {
        Book updatedBook = bookService.addComentToBook(bookId, currentUser.getId(), comment);
        return bookMapper.toBookDto(updatedBook);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{bookId}/ratings")
    public BookDto addRatingToBook(@AuthenticationPrincipal CustomUserDetails currentUser, @PathVariable String bookId, @RequestParam Integer rating) {
        Book updatedBook = bookService.addRatingToBook(bookId, currentUser.getId(), rating);
        return bookMapper.toBookDto(updatedBook);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{bookId}/averageRating")
    public ResponseEntity<Double> getAverageRating(@PathVariable String bookId) {
        Book book = bookService.validateAndGetBook(bookId);
        Double averageRating = bookService.calculateRatingAverage(bookId, book.getRating());
        return ResponseEntity.ok(averageRating);
    }

}


