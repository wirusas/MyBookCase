package lt.chomicenko.bookcase_api.mapper;

import lt.chomicenko.bookcase_api.dto.UserDto;
import lt.chomicenko.bookcase_api.model.User;

import java.util.List;

public interface UserMapper {
    UserDto toUserDto(User user);

    List<UserDto> toUserDtoList(List<User> users);

    }
