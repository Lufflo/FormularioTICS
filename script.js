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
        return response.text();
    })
    .then(text => {
        console.log('Texto recibido:', text);
        try {
            const result = text ? JSON.parse(text) : { status: 'error', message: 'Respuesta vacía' };
            console.log('Resultado parseado:', result);
            if (result.status === 'success') {
                document.getElementById('mensaje').textContent = '¡Inscripción enviada con éxito!';
                document.getElementById('inscripcionForm').reset();
            } else {
                document.getElementById('mensaje').textContent = 'Error: ' + result.message;
            }
        } catch (e) {
            document.getElementById('mensaje').textContent = 'Error al parsear: ' + e.message;
        }
    })
    .catch(error => {
        console.error('Error completo:', error);
        document.getElementById('mensaje').textContent = 'Error: ' + error.message;
    });
});