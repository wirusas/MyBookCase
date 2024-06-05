package lt.chomicenko.bookcase_api.service;

import lombok.RequiredArgsConstructor;
import lt.chomicenko.bookcase_api.exception.BookCategoryExisting;
import lt.chomicenko.bookcase_api.model.BookCategory;
import lt.chomicenko.bookcase_api.repositorie.BookCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BookCategoryServiceImpl implements BookCategoryService {
    private final BookCategoryRepository bookCategoryRepository;

    @Override
    public BookCategory createCategory(BookCategory bookCategory) {
        String categoryName = bookCategory.getBookCategory();
        if (bookCategoryRepository.existsByBookCategoryContainingIgnoreCase(categoryName)) {
            throw new BookCategoryExisting("Category already exists: " + categoryName);
        }
        return bookCategoryRepository.save(bookCategory);
    }


    @Override
    public void deleteCategory(Long categoryId) {
        bookCategoryRepository.deleteById(categoryId);
    }


    @Override
    public BookCategory updateCategory(Long categoryId, BookCategory updatedBookCategory) {
        BookCategory existingCategory = bookCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        existingCategory.setBookCategory(updatedBookCategory.getBookCategory());
        return bookCategoryRepository.save(existingCategory);
    }

    @Override
    public List<BookCategory> getAllCategories() {
        return bookCategoryRepository.findAll();
    }
}
