interface TaskTitleCardProps {
    title: string;
    onChangeTitle: (e: string) => void;
}

export default function TaskTitleCard({ title, onChangeTitle }: TaskTitleCardProps) {
    return (
        <div className="task-title-card-container">
            <div className="task-title-label">Title</div>
            <input
                type="text"
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
                placeholder="Enter a title..."
                style={{ width: "250px"}}
            />
        </div>
    );
}
