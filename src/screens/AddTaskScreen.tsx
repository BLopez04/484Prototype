import Header from '../components/Header';
import { useTaskContext } from "../contexts/TaskContext.tsx";
import TaskTitleCard from "../components/TaskTitleCard.tsx";
import {useState} from "react";
import TaskDescriptionCard from "../components/TaskDescriptionCard.tsx";
import TaskTypeCard from "../components/TaskTypeCard.tsx";
import TaskDueDateCard from "../components/TaskDueDateCard.tsx";
import TaskXPCard from "../components/TaskXPCard.tsx";

export function AddTaskScreen() {
    const { addTask } = useTaskContext();
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskType, setTaskType] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<string>("");
    const [taskXP, setTaskXP] = useState<number>(50);
    const [dateError, setDateError] = useState<string>("");
    const [titleError, setTitleError] = useState<string>("");
    const [typeError, setTypeError] = useState<string>("");

    const handleTitleChange = (value: string) => {
        setTaskTitle(value);
        // Clear error when user types
        if (titleError) {
            setTitleError("");
        }
    }

    const handleDescriptionChange = (value: string) => {
        setTaskDescription(value)
    }

    const handleTypeChange = (value: string) => {
        setTaskType(value);
        // Clear error when user types
        if (typeError) {
            setTypeError("");
        }
    }

    const handleDueDateChange = (value: string) => {
        setTaskDueDate(value);
        // Clear error when user changes the date
        if (dateError) {
            setDateError("");
        }
    }

    const validateTitle = (title: string): boolean => {
        // Check if title is provided
        if (!title || title.trim() === "") {
            setTitleError("Task title is required");
            return false;
        }

        // Check if title is too short
        if (title.trim().length < 3) {
            setTitleError("Title must be at least 3 characters");
            return false;
        }

        // Check if title is too long
        if (title.trim().length > 100) {
            setTitleError("Title must be less than 100 characters");
            return false;
        }

        setTitleError("");
        return true;
    }

    const validateType = (type: string): boolean => {
        // Check if type is provided
        if (!type || type.trim() === "") {
            setTypeError("Task type is required");
            return false;
        }

        // Check if type is too short
        if (type.trim().length < 2) {
            setTypeError("Type must be at least 2 characters");
            return false;
        }

        // Check if type is too long
        if (type.trim().length > 50) {
            setTypeError("Type must be less than 50 characters");
            return false;
        }

        setTypeError("");
        return true;
    }

    const validateDate = (dateStr: string): boolean => {
        // Check if date is provided
        if (!dateStr || dateStr.trim() === "") {
            setDateError("Due date is required");
            return false;
        }

        const selectedDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);

        // Check if date is valid
        if (isNaN(selectedDate.getTime())) {
            setDateError("Please enter a valid date");
            return false;
        }

        // Check if date is in the past
        if (selectedDate < today) {
            setDateError("Due date cannot be in the past");
            return false;
        }

        // Check if date is too far in the future
        if (selectedDate > maxDate) {
            setDateError("Due date cannot be more than 1 year from now");
            return false;
        }

        setDateError("");
        return true;
    }

    const handleSaveTask = () => {
        // Validate all fields before saving
        const isTitleValid = validateTitle(taskTitle);
        const isTypeValid = validateType(taskType);
        const isDateValid = validateDate(taskDueDate);

        // Only save if all validations pass
        if (!isTitleValid || !isTypeValid || !isDateValid) {
            return;
        }

        addTask({title: taskTitle, type: taskType, steps: [taskDescription], time: taskDueDate, flag: false, xp: taskXP });
    }

    return (
        <div className="screen">
            <Header title="Create Task"/>
            <div className="content">
                <div className="section">
                    <TaskTitleCard title={taskTitle} onChangeTitle={handleTitleChange} error={titleError}/>
                </div>
                <div className="section">
                    <TaskTypeCard type={taskType} onChangeType={handleTypeChange} error={typeError}/>
                </div>
                <div className="section">
                    <TaskDescriptionCard desc={taskDescription} onChangeDescription={handleDescriptionChange}/>
                </div>
                <div className="section">
                    <TaskDueDateCard date={taskDueDate} onChangeDueDate={handleDueDateChange} error={dateError}/>
                </div>
                <div className="section">
                    <TaskXPCard xp={taskXP} onChangeXP={setTaskXP}/>
                </div>
                <div className="button-task-container">
                    <button onClick={handleSaveTask}>
                        Create Task
                    </button>
                </div>

            </div>
        </div>
    )
}

