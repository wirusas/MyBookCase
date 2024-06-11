package lt.chomicenko.bookcase_api.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lt.chomicenko.bookcase_api.exception.BookNotFoundException;
import lt.chomicenko.bookcase_api.exception.NoBooksFoundException;
import lt.chomicenko.bookcase_api.exception.UserExistsInTheBook;
import lt.chomicenko.bookcase_api.exception.UserNotFoundException;
import lt.chomicenko.bookcase_api.mapper.BookMapper;
import lt.chomicenko.bookcase_api.model.Book;
import lt.chomicenko.bookcase_api.model.User;
import lt.chomicenko.bookcase_api.repositorie.BookRepository;
import lt.chomicenko.bookcase_api.repositorie.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final BookMapper bookMapper;

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book validateAndGetBook(String id) {
        return bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + id));
    }

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    @Transactional
    public Book editBook(String id, Book updatedBook) {
        Book existingBook = bookRepository.findById(id.toString())
                .orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + id));

        existingBook.setBookName(updatedBook.getBookName());
        existingBook.setDescription(updatedBook.getDescription());
        existingBook.setISBN(updatedBook.getISBN());
        existingBook.setImageUrl(updatedBook.getImageUrl());
        existingBook.setNumberOfPages(updatedBook.getNumberOfPages());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setComment(updatedBook.getComment());
        existingBook.setRating(updatedBook.getRating());


        return bookRepository.save(existingBook);
    }

    @Override
    @Transactional
    public void deleteBook(Book book) {
        List<User> users = book.getUsers();

        for (User user : users) {
            user.getFollowedBooks().remove(book);
            userRepository.save(user);
        }

        bookRepository.delete(book);
    }


    @Override
    public List<Book> getBooksByUser(User user) {
        List<Book> books = user.getFollowedBooks();
        if (books.isEmpty()) {
            throw new NoBooksFoundException("No books found for user: " + user.getUsername());
        }
        return books;
    }

    @Override
    public Optional<Book> getBookById(String id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return bookRepository.findById(id.toString());
    }


    @Override
    public Page<Book> getAllPagedBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }


    @Override
    @Transactional
    public Book addUserToBook(String userEmail, String bookId) {
        Book existingBook = validateAndGetBook(bookId.toString());
        User user = userRepository.findUserByEmail(userEmail);

        if (user == null) {
            throw new UserNotFoundException(String.format("User with email %s not found", userEmail));
        } else if (existingBook.getUsers().contains(user)) {
            throw new UserExistsInTheBook("User is already a member of the book.");
        }

        existingBook.addUser(user);
        return bookRepository.save(existingBook);
    }


    @Override
    @Transactional
    public Book removeUserFromBook(String userEmail, String bookId) {
        Book existingBook = validateAndGetBook(bookId.toString());
        User user = userRepository.findUserByEmail(userEmail);

        if (user == null) {
            throw new UserNotFoundException(String.format("User with email %s not found", userEmail));
        } else if (!existingBook.getUsers().contains(user)) {
            throw new UserNotFoundException(String.format("User with email %s is not a member of the book", userEmail));
        }

        existingBook.removeUser(user);
        return bookRepository.save(existingBook);
    }


    @Override
    public Page<Book> findBookByName(String bookName, Pageable pageable) {
        return bookRepository.findByBookNameContainingIgnoreCase(bookName, pageable);
    }


    public Page<Book> findAllBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public List<Book> findByNameContaining(String bookName) {
        if (bookName == null) {
            throw new BookNotFoundException("Book you searched was not found");
        }
        return bookRepository.findByBookNameContainingIgnoreCase(bookName);
    }

    @Override
    public List<Book> findByCategory(String category) {
        if (category == null) {
            throw new BookNotFoundException("Book you searched was not found");
        }
        return bookRepository.findByCategoryContainingIgnoreCase(category);
    }

    @Override
    public Book addComentToBook(String bookId, Long userId, String comment) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + bookId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));

        Map<String, String> existingComments = book.getComment();

        if (existingComments.containsKey(user.getUsername())) {

            String existingComment = existingComments.get(user.getUsername());
            String newComment = existingComment + "\n" + comment;
            existingComments.put(user.getUsername(), newComment);
        } else {

            existingComments.put(user.getUsername(), comment);
        }

        book.setComment(existingComments);

        return bookRepository.save(book);
    }

    @Override
    public Book addRatingToBook(String bookId, Long userId, Integer rating) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + bookId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BookNotFoundException("User not found with ID: " + userId));
        book.getRating().add(rating);

        return bookRepository.save(book);
    }

    @Override
    public Double calculateRatingAverage(String bookId, List<Integer> ratings) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new BookNotFoundException("Book not found with ID: " + bookId));

        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }


        return ratings.stream()
                .mapToDouble(Integer::doubleValue)
                .average()
                .orElse(0.0);
    }


}
