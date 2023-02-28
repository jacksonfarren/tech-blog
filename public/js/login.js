if (localStorage.getItem("username")) {
    document.getElementById("username").value = localStorage.getItem("username");
}

const requestLogin = async (event) => {
    try {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const rememberMe = document.getElementById("rememberMe").checked;

        if (rememberMe && localStorage.getItem("username")) {
            localStorage.removeItem("username");
            localStorage.setItem("username", username);
        } else if (rememberMe) {
            localStorage.setItem("username", username);
        } else if (!rememberMe && localStorage.getItem("username")) {
            localStorage.removeItem("username");
        }

        if (username && password) {
            const response = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                document.location.replace("/home");
                return;
            } else {
                alert("Incorrect email or password");
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", requestLogin);