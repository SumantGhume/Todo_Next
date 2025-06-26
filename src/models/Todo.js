import mongoose,{Schema} from "mongoose";


const ToDoSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    }
})

const ToDo = mongoose.models.todo_next || mongoose.model("todo_next",ToDoSchema);

export default ToDo; 