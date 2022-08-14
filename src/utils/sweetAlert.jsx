import Swal from "sweetalert2";

export const sweetAlert = () => {
    Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "Por favor introduzca un nombre de usuario y contraseña válidos.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#FF452B",
        confirmButtonBorderColor: "#FF452B",
        timer: 10000,
        timerProgressBar: true
    })
}
