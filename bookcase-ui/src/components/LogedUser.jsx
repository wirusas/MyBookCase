export const LogedUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return <h4>{username}</h4>
}