import mongoose from "mongoose";


const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
   },
    { timestamps: true }
);

const Crud = mongoose.model("Crud", crudSchema);

export default Crud;