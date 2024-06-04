package lt.chomicenko.bookcase_api.exception;

public class NoBooksFoundException extends RuntimeException {
    public NoBooksFoundException(String message) {
        super(message);
    }
}
