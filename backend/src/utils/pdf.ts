import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { IPrescription } from '../models/prescription.model';
import { IUser } from '../models/user.model';

export const generatePrescriptionPDF = (prescription: IPrescription): Promise<string> => {
	return new Promise((resolve, reject) => {
		const doc = new PDFDocument();

		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const dirPath = path.join(__dirname, '../downloads');
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath, { recursive: true });
		}
		const filePath = path.join(dirPath, `Prescription_${prescription._id}.pdf`);

		const writeStream = fs.createWriteStream(filePath);
		doc.pipe(writeStream);

		doc.font('Helvetica-Bold').fontSize(25).text('Prescription', { align: 'center' });
		doc.moveDown(2);

		const addKeyValue = (key: string, value: string | any, nextLine: boolean = false) => {
			doc.font('Helvetica-Bold').fontSize(16).text(`${key}: `, { continued: !nextLine });
			doc.font('Helvetica').fontSize(16).text(value);
			doc.moveDown(0.5);
		};
		const doctor = prescription.doctorId as IUser;
		const patient = prescription.patientId as IUser;

		// addKeyValue('Doctor ID', doctor._id);
		addKeyValue('Doctor Name', doctor.firstName + ' ' + doctor.lastName);
		// addKeyValue('Patient ID', patient._id);
		addKeyValue('Patient Name', patient.firstName + ' ' + patient.lastName);
		addKeyValue('Date', prescription.createdAt.toUTCString());
		addKeyValue('NFT ID', prescription.nftId.toString());
		addKeyValue('Transaction Hash', prescription.transactionHash, true);
		doc.moveDown(1);
		addKeyValue('Details', prescription.details);

		doc.end();

		writeStream.on('finish', () => {
			resolve(filePath);
		});

		writeStream.on('error', (err) => {
			reject(err);
		});
	});
};
