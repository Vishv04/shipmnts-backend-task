import sampleModel from "../models/sampleModel";

const sampleController = {
    getSample: async (req, res) => {
        const sample = await sampleModel.find();
        res.status(200).json(sample);
    },
};

export default sampleController;