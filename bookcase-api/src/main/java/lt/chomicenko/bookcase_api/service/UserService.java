package lt.chomicenko.bookcase_api.service;

import lt.chomicenko.bookcase_api.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();

    Optional<User> getUserByUserName(String username);

    boolean hasUserWithEmail(String email);

    boolean hasUserWithUsername(String username);

    User validateAndGetUserByUsername(String username);

    User saveUser(User user);

    void deleteUser(User user);

    User findUserByEmail(String email);
}
