interface TaskTypeCardProps {
    type: string;
    onChangeType: (e: string) => void;
}
// basically taskTitleCard
export default function TaskTypeCard({ type, onChangeType }: TaskTypeCardProps) {
    return (
        <div className="task-title-card-container">
            <div className="task-title-label">Type</div>
            <input
                type="text"
                value={type}
                onChange={(e) => onChangeType(e.target.value)}
                placeholder="Enter a type..."
                style={{ width: "250px"}}
            />
        </div>
    );
}
