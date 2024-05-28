import qr from 'qr-image';
import path from 'path';
import os from 'os';
import fs from 'fs';
import printer from 'pdf-to-printer';
import PDFDocument from 'pdfkit';

export const generateQR = async (req, res) => {
    try {
        const { post } = req.body;

        // Crear el documento PDF
        const doc = new PDFDocument();
        
        // Generar el código QR como imagen PNG
        const codigoQR = qr.image(post, { type: 'png' });

        // Ruta al escritorio del usuario
        const escritorio = path.join(os.homedir(), 'Desktop');

        // Generar un nombre de archivo único basado en un timestamp
        const timestamp = new Date().getTime();
        const nombreArchivo = path.join(escritorio, `codigo-qr-${timestamp}.png`);
        
        // Guardar la imagen QR en el escritorio
        const writeStream = fs.createWriteStream(nombreArchivo);
        codigoQR.pipe(writeStream);

        // Esperar a que se termine de escribir la imagen antes de proceder
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        // Guardar el PDF en el escritorio
        const pdfPath = path.join(escritorio, 'output.pdf');
        doc.pipe(fs.createWriteStream(pdfPath));

        // Añadir la imagen QR al PDF
        doc.image(nombreArchivo, {
            fit: [250, 250],
            align: 'center',
            valign: 'center'
        });
        doc.end();

        // Esperar a que se termine de escribir el PDF antes de proceder
        await new Promise((resolve, reject) => {
            doc.on('end', resolve);
            doc.on('error', reject);
        });

        // Enviar el archivo QR como descarga al navegador
        await res.download(nombreArchivo, () => {
            console.log("Descarga exitosa");
        });

        // Imprimir el PDF
        await printer.print(pdfPath, { printer: 'ZDX' });
        console.log("Conexión exitosa");
    } catch (error) {
        console.error(error);
    }
};
