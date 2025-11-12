interface TaskDueDateProps {
    date: string;
    onChangeDueDate: (e: string) => void;
}

export default function TaskDueDateCard({ date, onChangeDueDate }: TaskDueDateProps) {
    return (
        <div className="task-title-card-container">
            <div className="task-title-label">Due Date</div>
            <input
                type="text"
                value={date}
                onChange={(e) => onChangeDueDate(e.target.value)}
                placeholder="Enter a date..."
                style={{ width: "250px"}}
            />
        </div>
    );
}
