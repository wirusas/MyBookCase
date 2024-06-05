package lt.chomicenko.bookcase_api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.chomicenko.bookcase_api.model.BookCategory;
import lt.chomicenko.bookcase_api.model.User;
import lt.chomicenko.bookcase_api.security.CustomUserDetails;
import lt.chomicenko.bookcase_api.service.BookCategoryService;
import lt.chomicenko.bookcase_api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lt.chomicenko.bookcase_api.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories")
public class BookCategoryController {

    private final BookCategoryService bookCategoryService;
    private final UserService userService;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public BookCategory createBookCategory(@AuthenticationPrincipal CustomUserDetails currentUser,
                                           @RequestBody BookCategory newBookCategory) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        return bookCategoryService.createCategory(newBookCategory);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/{categoryId}")
    public BookCategory updateBookCategory(@AuthenticationPrincipal CustomUserDetails currentUser,
                                           @Valid @RequestBody BookCategory newBookCategory,
                                           @PathVariable Long categoryId) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        return bookCategoryService.updateCategory(categoryId, newBookCategory);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{categoryId}")
    public void deleteBookCategory(@AuthenticationPrincipal CustomUserDetails currentUser,
                                   @PathVariable Long categoryId) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        bookCategoryService.deleteCategory(categoryId);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping()
    public List<BookCategory> getAllCategories(){
      return   bookCategoryService.getAllCategories();
    }

}

