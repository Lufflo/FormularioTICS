document.getElementById('inscripcionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre'),
        equipo: formData.get('equipo'),
        email: formData.get('email')
    };

    fetch('https://script.google.com/macros/s/AKfycbwILD1WEgoAKjZ8Pclfbz8U6UywNcLQqrth6twI7hZ_xg7Am47J1ruotMjszGiOwSnQtA/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Respuesta cruda:', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Obtener texto crudo primero
    })
    .then(text => {
        console.log('Texto recibido:', text);
        let result;
        try {
            result = text ? JSON.parse(text) : { status: 'error', message: 'Respuesta vacía del servidor' };
        } catch (e) {
            result = { status: 'error', message: 'Error al parsear JSON: ' + e.message };
        }
        console.log('Resultado parseado:', result);
        document.getElementById('mensaje').textContent = result.message || 'Error desconocido';
        if (result.status === 'success') {
            document.getElementById('inscripcionForm').reset();
        }
    })
    .catch(error => {
        console.error('Error completo:', error);
        document.getElementById('mensaje').textContent = 'Error de red o servidor: ' + error.message;
    });
});