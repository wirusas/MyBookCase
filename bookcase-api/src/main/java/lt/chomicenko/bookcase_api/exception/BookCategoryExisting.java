package lt.chomicenko.bookcase_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class BookCategoryExisting extends RuntimeException{
    public BookCategoryExisting(String message){super(message);}
}
