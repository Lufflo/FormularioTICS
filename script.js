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
      },
      mode: 'no-cors' // Prueba con esto temporalmente
  })
  .then(response => {
      console.log('Respuesta:', response);
      return response.json();
  })
  .then(result => {
      console.log('Resultado:', result);
      if (result.status === 'success') {
          document.getElementById('mensaje').textContent = '¡Inscripción enviada con éxito!';
          document.getElementById('inscripcionForm').reset();
      } else {
          document.getElementById('mensaje').textContent = 'Error al enviar la inscripción. Inténtalo de nuevo.';
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('mensaje').textContent = 'Error: ' + error.message;
  });
});