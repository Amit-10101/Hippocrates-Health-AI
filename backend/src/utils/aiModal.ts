import * as tf from '@tensorflow/tfjs';
import { loadLayersModel, LayersModel } from '@tensorflow/tfjs';

let model: LayersModel;

export const loadModel = async (modelPath: string) => {
	model = await loadLayersModel('');
};

export const validatePrescription = async (details: string): Promise<boolean> => {
	if (!model) {
		throw new Error('Model not loaded');
	}

	const inputTensor = tf.tensor([details]);
	const prediction = model.predict(inputTensor) as tf.Tensor;
	const result = prediction.dataSync()[0];

	return result > 0.5;
};
