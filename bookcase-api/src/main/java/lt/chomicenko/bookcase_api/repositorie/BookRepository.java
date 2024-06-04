package lt.chomicenko.bookcase_api.repositorie;

import lt.chomicenko.bookcase_api.model.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, String> {

    Page<Book> findByBookNameContainingIgnoreCase(String projectName, Pageable pageable);

    Page<Book> findAll(Pageable pageable);
}
