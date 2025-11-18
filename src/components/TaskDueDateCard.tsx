interface TaskDueDateProps {
    date: string;
    onChangeDueDate: (e: string) => void;
    error?: string;
}

export default function TaskDueDateCard({ date, onChangeDueDate, error }: TaskDueDateProps) {
    // Get today's date in YYYY-MM-DD format for min constraint
    const today = new Date().toISOString().split('T')[0];
    
    // Get max date (1 year from now) to prevent unrealistic dates
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    const maxDateStr = maxDate.toISOString().split('T')[0];

    return (
        <div className="task-title-card-container">
            <div className="task-title-label">
                Due Date <span style={{ color: '#999', fontSize: '0.9em' }}>(required)</span>
            </div>
            <input
                type="date"
                value={date}
                onChange={(e) => onChangeDueDate(e.target.value)}
                min={today}
                max={maxDateStr}
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
            <div style={{ 
                color: '#666', 
                fontSize: '0.8em', 
                marginTop: '5px',
                fontStyle: 'italic'
            }}>
                Select a date from today to {maxDateStr}
            </div>
        </div>
    );
}
