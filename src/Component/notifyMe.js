import Swal from 'sweetalert2'

export default function notifyMe(type, title, text) {
    return Swal.fire({
        timerProgressBar: true,
        theme: "dark",
        icon: type,
        position: "center",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 4000
    });
}