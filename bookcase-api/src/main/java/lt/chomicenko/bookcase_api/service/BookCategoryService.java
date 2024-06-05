package lt.chomicenko.bookcase_api.service;

import lt.chomicenko.bookcase_api.model.BookCategory;

import java.util.List;

public interface BookCategoryService {

    BookCategory createCategory(BookCategory bookCategory);

    void deleteCategory(Long categoryId);

    BookCategory updateCategory(Long categoryId, BookCategory updatedBookCategory);

    List<BookCategory> getAllCategories();
}
