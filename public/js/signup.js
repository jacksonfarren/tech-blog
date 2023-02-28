const requestSignup = async () => {
    try {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("signupPassword").value.trim();

        if (username && password) {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                body: JSON.stringify({
                    username, 
                    password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                document.location.replace("/home");
            }
        }
    } catch (error) {
        console.error(error);
    }
};

const validateInput = (event) => {
    event.preventDefault();

    const password = document.getElementById("signupPassword").value.trim();
    const reenterPassword = document.getElementById("reenterPassword").value.trim();

    if (password !== reenterPassword) {
        alert("Passwords must match");
        return;
    }

    const inputs = document.querySelectorAll(".needs-validation");

    Array.from(inputs).forEach((form) => {
        form.addEventListner(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
    requestSignup();
};

document.getElementById("signupForm").addEventListener("submit", validateInput);