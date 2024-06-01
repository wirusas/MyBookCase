package lt.chomicenko.bookcase_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public final class UserDto {
    private final Long id;

    @NotNull
    private final String username;

    @NotNull
    @Size(min = 3, max = 30, message = "Name must be between 3 and 30 characters!")
    private final String name;

    @NotNull
    @Email(message = "Email must be valid")
    private final String email;

    private final String role;

    public UserDto(Long id, String username, String name, String email, String role) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        var that = (UserDto) obj;
        return Objects.equals(this.id, that.id) &&
                Objects.equals(this.username, that.username) &&
                Objects.equals(this.name, that.name) &&
                Objects.equals(this.email, that.email) &&
                Objects.equals(this.role, that.role);
    }

    @Override
    public String toString() {
        return "UserDto[" +
                "id=" + id + ", " +
                "username=" + username + ", " +
                "name=" + name + ", " +
                "email=" + email + ", " +
                "role=" + role + ", " + ']';
    }

}
