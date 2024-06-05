package lt.chomicenko.bookcase_api.repositorie;

import lt.chomicenko.bookcase_api.model.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
    void deleteById(Long categoryId);

    boolean existsByBookCategoryContainingIgnoreCase(String categoryName);
}
