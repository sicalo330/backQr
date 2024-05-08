import { Router } from "express";
import { generateQR } from "../Controller/qrController.js";

const router = Router()

router.post('/generateQr', generateQR)

export default router