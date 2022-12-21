import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

contactSchema.path('email').validate(async (email)=>{
    const emailCount = await mongoose.models.Contact.countDocuments({email})
    return !emailCount
}, 'Email already exists');

//create contact model
const Contact = mongoose.model("Contact",contactSchema);

export default Contact