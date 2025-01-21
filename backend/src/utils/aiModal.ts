import * as tf from '@tensorflow/tfjs';
import { loadLayersModel, LayersModel } from '@tensorflow/tfjs';
import path from 'path';
import { fileURLToPath } from 'url';

let polypharmacyModel: LayersModel;
let dosageOptimizationDbpModel: LayersModel;
let dosageOptimizationSbpModel: LayersModel;

export const loadModels = async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const basePath = path.join(__dirname, '../../ai.modals');

	// polypharmacyModel = await loadLayersModel(
	// 	path.join(basePath, 'polypharmacy_side_effects', 'saved_model.pb')
	// );
	// dosageOptimizationDbpModel = await loadLayersModel(
	// 	path.join(basePath, 'dosage_optimization_dbp', 'saved_model.pb')
	// );
	// dosageOptimizationSbpModel = await loadLayersModel(
	// 	path.join(basePath, 'dosage_optimization_sbp', 'saved_model.pb')
	// );
	polypharmacyModel = await loadLayersModel(
		`file://${path.join(basePath, 'polypharmacy_side_effects', 'saved_model.pb')}`
	);
	dosageOptimizationDbpModel = await loadLayersModel(
		`file://${path.join(basePath, 'dosage_optimization_dbp', 'saved_model.pb')}`
	);
	dosageOptimizationSbpModel = await loadLayersModel(
		`file://${path.join(basePath, 'dosage_optimization_sbp', 'saved_model.pb')}`
	);
};

export const getPolypharmacySideEffects = async (input: number[]): Promise<number[]> => {
	const inputTensor = tf.tensor([input]);
	const prediction = polypharmacyModel.predict(inputTensor) as tf.Tensor;
	return Array.from(prediction.dataSync());
};

export const getDosageOptimizationDbp = async (input: number[]): Promise<number[]> => {
	const inputTensor = tf.tensor([input]);
	const prediction = dosageOptimizationDbpModel.predict(inputTensor) as tf.Tensor;
	return Array.from(prediction.dataSync());
};

export const getDosageOptimizationSbp = async (input: number[]): Promise<number[]> => {
	const inputTensor = tf.tensor([input]);
	const prediction = dosageOptimizationSbpModel.predict(inputTensor) as tf.Tensor;
	return Array.from(prediction.dataSync());
};
