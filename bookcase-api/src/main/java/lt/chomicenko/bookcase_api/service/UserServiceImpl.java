package lt.chomicenko.bookcase_api.service;


import lombok.RequiredArgsConstructor;
import lt.chomicenko.bookcase_api.exception.UserNotFoundException;
import lt.chomicenko.bookcase_api.model.User;
import lt.chomicenko.bookcase_api.repositorie.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
       return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUserName(username)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

}
