interface TaskDescriptionProps {
    desc: string;
    onChangeDescription: (e: string) => void;
}

export default function TaskDescriptionCard({ desc, onChangeDescription }: TaskDescriptionProps) {
    return (
        <div className="task-description-card-container">
            <div className="task-title-label">
                Description
            </div>
            <div className="task-description-input">
                <textarea
                    value={desc}
                    onChange={(e) => onChangeDescription(e.target.value)}
                    placeholder="Enter a description..."
                    style={{boxSizing: "border-box", resize: "vertical"}}
                />
            </div>
        </div>
    )
}