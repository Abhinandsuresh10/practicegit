import Crud from "../models/crud.model.js";

// Create 
export const create = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ success: false, message: 'All fields are required' });
            return;
        }
        const newData = await Crud.create({ name, email, message });
        res.status(201).json({ success: true, message: "Data created successfull", data: newData })
    } catch (error) {
        console.log("Create Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

// Update
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        const updated = await Crud.findByIdAndUpdate(id, {
            name, email, message
        }, { new: true });

        res.status(200).json({ success: true, message: "Data updated succesfully", data: updated });

    } catch (error) {
        console.log("Create Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

// Delete
export const deletes = async (req, res) => {
    try {
        const { id } = req.params;
        await Crud.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Data deleted successfully' })
    } catch (error) {
        console.log("Create Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

// GetDatas

export const getDatas = async (req, res) => {
    try {
       const data = await Crud.find();
       res.status(200).json({ success: true, message: "Data fetched successfully", data})
    } catch (error) {
        console.log("Create Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}