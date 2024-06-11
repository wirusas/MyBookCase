package lt.chomicenko.bookcase_api.service;

import lt.chomicenko.bookcase_api.exception.NoBooksFoundException;
import lt.chomicenko.bookcase_api.model.Book;
import lt.chomicenko.bookcase_api.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.Writer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookService {

    List<Book> getBooks();

    Book validateAndGetBook(String id);

    Book saveBook(Book book);

    Book editBook(String id, Book book);

    void deleteBook(Book book);

    List<Book> getBooksByUser(User user) throws NoBooksFoundException;

    Optional<Book> getBookById(String id);

    Page<Book> getAllPagedBooks(Pageable pageable);

    Book addUserToBook(String email, String id);

    Book removeUserFromBook(String email, String id);

    Page<Book> findBookByName(String bookName, Pageable pageable);

    Page<Book> findAllBooks(Pageable pageable);

    List<Book> findByNameContaining(String bookName);
    List<Book> findByCategory(String category);

    Book addComentToBook(String bookId, Long userId, String comment);

    Book addRatingToBook(String bookId, Long userId, Integer rating);

    Double calculateRatingAverage(String bookId, List<Integer> ratings);

}
