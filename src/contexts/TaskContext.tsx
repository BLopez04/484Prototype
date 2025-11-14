import type { Task } from "../types"
import { createContext, type ReactNode, useContext, useState } from "react";

interface TaskContextType {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    addTask: (task: Task) => void;
    updateTask: (id: number, updatedTask: Task) => void;
    deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Morning Routine',
            time: '10:00 AM',
            type: 'Daily Routine',
            steps: ['Wake up at 8am', 'Exercise for 20 mins', 'Healthy breakfast'],
            flag: false,
            xp: 100
        },
        {
            id: 2,
            title: 'Walk Dog',
            time: 'Noon',
            type: 'Household',
            steps: ['Get leash', 'Walk around the block', 'Give treats'],
            flag: true,
            xp: 50
        },
        {
            id: 3,
            title: 'Calc HW',
            time: 'Midnight',
            type: 'School',
            steps: ['Review chapter 5', 'Complete problems 1-20', 'Check answers'],
            flag: false,
            xp: 500
        },
        {
            id: 4,
            title: 'Team Meeting',
            time: '2:00 PM',
            type: 'Work',
            steps: [],
            flag: false,
            xp: 100
        }
    ]);

    const addTask = (task: Task) => {
        const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) : 0;

        const newTask = { ...task, id: maxId + 1 };
        setTasks([...tasks, newTask]);
    };

    const updateTask = (id: number, updatedTask: Task) => {
        setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    // this should never occur, I wrapped TaskProvider around App in main.tsx
    if (!context) {
        throw new Error('useTaskContext must be used within TaskProvider');
    }
    return context;
}