import qr from 'qr-image'
import path from 'path'
import os from 'os'
import fs from 'fs'

export const generateQR = async (req, res) => {
    let { post } = req.body

    const codigoQR = qr.image(post, { type: 'png' });

    // Ruta al escritorio del usuario
    const escritorio = path.join(os.homedir(), 'Desktop');

    const timestamp = new Date().getTime();
    const nombreArchivo = path.join(escritorio, `codigo-qr-${timestamp}.png`);
    codigoQR.pipe(fs.createWriteStream(nombreArchivo));

    
    // Enviar el archivo como descarga al navegador
    res.download(nombreArchivo, () => {
        console.log("Descarga exitosa")
    });
};
