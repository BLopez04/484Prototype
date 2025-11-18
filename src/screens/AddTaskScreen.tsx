import Header from '../components/Header';
import { useTaskContext } from "../contexts/TaskContext.tsx";
import { useToast } from "../contexts/ToastContext.tsx";
import TaskTitleCard from "../components/TaskTitleCard.tsx";
import {useState} from "react";
import TaskDescriptionCard from "../components/TaskDescriptionCard.tsx";
import TaskTypeCard from "../components/TaskTypeCard.tsx";
import TaskDueDateCard from "../components/TaskDueDateCard.tsx";
import TaskXPCard from "../components/TaskXPCard.tsx";

export function AddTaskScreen() {
    const { addTask } = useTaskContext();
    const { showToast } = useToast();
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [taskType, setTaskType] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskDueDate, setTaskDueDate] = useState<string>("");
    const [taskXP, setTaskXP] = useState<number>(50);

    const handleTitleChange = (value: string) => {
        setTaskTitle(value)
    }

    const handleDescriptionChange = (value: string) => {
        setTaskDescription(value)
    }

    const handleTypeChange = (value: string) => {
        setTaskType(value)
    }

    const handleDueDateChange = (value: string) => {
        setTaskDueDate(value)
    }

    const handleSaveTask = () => {
        addTask({title: taskTitle, type: taskType, steps: [taskDescription], time: taskDueDate, flag: false, xp: taskXP });
        showToast(`Task "${taskTitle}" created successfully!`, "success");
    }

    return (
        <div className="screen">
            <Header title="Create Task"/>
            <div className="content">
                <div className="section">
                    <TaskTitleCard title={taskTitle} onChangeTitle={handleTitleChange}/>
                </div>
                <div className="section">
                    <TaskTypeCard type={taskType} onChangeType={handleTypeChange}/>
                </div>
                <div className="section">
                    <TaskDescriptionCard desc={taskDescription} onChangeDescription={handleDescriptionChange}/>
                </div>
                <div className="section">
                    <TaskDueDateCard date={taskDueDate} onChangeDueDate={handleDueDateChange}/>
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

