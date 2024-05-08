import app from './app.js'

app.listen(app.get('port'));

console.log('Servidor corriendo por el puerto ' + app.get('port'));