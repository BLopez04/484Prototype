interface TaskTypeCardProps {
    type: string;
    onChangeType: (e: string) => void;
    error?: string;
}

export default function TaskTypeCard({ type, onChangeType, error }: TaskTypeCardProps) {
    return (
        <div className="task-title-card-container">
            <div className="task-title-label">
                Type <span style={{ color: '#999', fontSize: '0.9em' }}>(required)</span>
            </div>
            <input
                type="text"
                value={type}
                onChange={(e) => onChangeType(e.target.value)}
                placeholder="Enter a type..."
                style={{ 
                    width: "250px",
                    border: error ? '2px solid #e74c3c' : undefined,
                    backgroundColor: error ? '#ffe6e6' : undefined
                }}
                required
            />
            {error && (
                <div style={{ 
                    color: '#e74c3c', 
                    fontSize: '0.85em', 
                    marginTop: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    ⚠️ {error}
                </div>
            )}
        </div>
    );
}
