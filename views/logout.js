document.addEventListener("DOMContentLoaded", (event) => {
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      fetch("/logout", { method: "POST" })
        .then((response) => {
          if (response.ok) {
            window.location.href = "/login";
          } else {
            console.error("Logout failed");
          }
        })
        .catch(console.error);
    });
});
