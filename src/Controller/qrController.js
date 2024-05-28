import qr from 'qr-image'
import path from 'path'
import os from 'os'
import fs from 'fs'
import printer from 'pdf-to-printer'
import PDFDocument from 'pdfkit'

export const generateQR = async (req, res) => {
    let { post } = req.body

    const doc = new PDFDocument();

    const codigoQR = qr.image(post, { type: 'png' });

    // Ruta al escritorio del usuario
    const escritorio = path.join(os.homedir(), 'Desktop');

    const timestamp = new Date().getTime();
    const nombreArchivo = path.join(escritorio, `codigo-qr-${timestamp}.png`);
    codigoQR.pipe(fs.createWriteStream(nombreArchivo));

    const pdfPath = await 'output.pdf';
    await doc.pipe(fs.createWriteStream(pdfPath));

    // Enviar el archivo como descarga al navegador
    await res.download(nombreArchivo, () => {
        console.log("Descarga exitosa")
    })

    /*
    
    await doc.image(`../${nombreArchivo}`)
    await doc.pipe(fs.createWriteStream(pdfPath));
    await doc.end()
    */
    console.log("Este es el pdf",pdfPath)
    await printer.print('output.pdf',{printer:'ZDX'})
    .then(console.log("conexión exitosa"))
    .catch(console.error)
};
