document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector("#password").value.trim();
        const terms = document.querySelector("#terms").checked;

        // Validación básica del formulario
        if (!email || !password) {
            alert("Debes rellenar todos los campos.");
            return;
        }
        if (!terms) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        try {
            // Cargar JSON
            const response = await fetch("users.json");
            const users = await response.json();

            // Buscar usuario
            const user = users.find(
                u => u.email === email && u.password === password
            );

            if (user) {
                alert(`Bienvenido, ${user.name}!`);
                // Redirigir si quieres:
                window.location.href = "home.html";
            } else {
                alert("Credenciales incorrectas.");
            }

        } catch (error) {
            console.error("Error cargando el JSON:", error);
            alert("Error interno. Inténtalo más tarde.");
        }
    });
});
