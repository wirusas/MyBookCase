package lt.chomicenko.bookcase_api.runner;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lt.chomicenko.bookcase_api.model.BookCategory;
import lt.chomicenko.bookcase_api.service.BookCategoryService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class BookCategoryDatabaseInitializer implements CommandLineRunner {

    private final BookCategoryService bookCategoryService;

    @Override
    public void run(String... args) {
        if (!bookCategoryService.getAllCategories().isEmpty()) {
            return;
        }
        CATEGORIES.forEach(category -> {
            bookCategoryService.createCategory(category);
        });
        log.info("Database initialized with book categories");
    }

    private static final List<BookCategory> CATEGORIES = Arrays.asList(
            new BookCategory("Programming"),
            new BookCategory("Adventure"),
            new BookCategory("Science"),
            new BookCategory("Horror")
    );
}
