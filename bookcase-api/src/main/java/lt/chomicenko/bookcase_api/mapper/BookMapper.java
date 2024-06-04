package lt.chomicenko.bookcase_api.mapper;

import lt.chomicenko.bookcase_api.dto.BookDto;
import lt.chomicenko.bookcase_api.dto.CreateBookRequest;
import lt.chomicenko.bookcase_api.dto.EditBookRequest;
import lt.chomicenko.bookcase_api.model.Book;

public interface BookMapper {
    Book toBook(CreateBookRequest createBookRequest);
    Book toBook(EditBookRequest editBookRequest);

    BookDto toBookDto(Book book);
}
