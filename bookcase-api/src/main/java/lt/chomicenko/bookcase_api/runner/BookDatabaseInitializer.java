package lt.chomicenko.bookcase_api.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.chomicenko.bookcase_api.model.Book;
import lt.chomicenko.bookcase_api.service.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class BookDatabaseInitializer implements CommandLineRunner {

    private final BookService bookService;

    @Override
    public void run(String... args) {
        if (!bookService.getBooks().isEmpty()) {
            return;
        }
        BOOKS.forEach(book -> {
            bookService.saveBook(book);
        });
        log.info("Database initialized with books");
    }

    private static final List<Book> BOOKS = Arrays.asList(
            new Book(
                    "1564156165",
                    "Effective Java",
                    "A comprehensive guide to best practices in Java programming.",
                    "6565",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGgxMJps3zA1ZTCzaW2a3tsirSEQnMk3dGYg&s",
                    "416",
                    "Programming"
            ),
            new Book(
                    "2554654",
                    "Clean Code",
                    "A Handbook of Agile Software Craftsmanship.",
                    "8484",
                    "https://m.media-amazon.com/images/I/61gMsOrAOtL._AC_UF1000,1000_QL80_.jpg",
                    "464",
                    "Programming"
            ),
            new Book(
                    "356564655",
                    "The Pragmatic Programmer",
                    "Your Journey to Mastery.",
                    "0202",
                    "https://pragprog.com/titles/tpp20/tpp20-large.jpg",
                    "352",
                    "Programming"
            ),
            new Book(
                    "4556416165",
                    "Harry Potter 2",
                    "Your Adventure",
                    "3232",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2akfjAdhtg0vq3wZ7webphtv7SOAoaP7KUg&s",
                    "352",
                    "Adventure"
            ),

            new Book(
                    "5546564",
                    "Scientific Discovery",
                    "Discover everything you like",
                    "8748",
                    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/science-book-cover-template-design-e657f17e348e6dcc24b858dc2d34ac0a_screen.jpg?ts=1698540130",
                    "210",
                    "Science"
            ),

            new Book(
                    "66564456565",
                    "Kiwi Project",
                    "Discover everything you like",
                    "225",
                    "https://images-platform.99static.com//yCJBb6gT4AR1JfQ54K9cee8XQew=/1121x0:3692x2571/fit-in/590x590/projects-files/50/5034/503447/618326b8-ce72-459c-a126-cb671a78c3f7.jpg",
                    "210",
                    "Science"
            ),

            new Book(
                    "956598",
                    "The Outer Space",
                    "Discover everything you like",
                    "6955",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Mwr0NRRPXM6gQrr0mPrwvEOKp4MsHuqHhQ&s",
                    "210",
                    "Science"
            ),

            new Book(
                    "9514515262",
                    "Empire of Horror",
                    "Discover everything you like",
                    "21215641",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqLke2OocU2jUgm_3C_NAuJXALGS8XnKLOzA&s",
                    "210",
                    "Horror"
            ),

            new Book(
                    "9825262",
                    "Scary Stories",
                    "Discover everything you like",
                    "965876482518",
                    "https://s26162.pcdn.co/wp-content/uploads/2017/10/Scary-Stories-to-Tell-in-the-Dark.jpg",
                    "210",
                    "Horror"
            ),
            new Book(
                    "982595626262",
                    "The Silence end",
                    "Discover everything you like",
                    "965876482518",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBB2Tl_3TTZkEllck5DS0xQlFHLQOdE09nGA&s",
                    "210",
                    "Horror"
            )




    );
}
