interface TaskTypeCardProps {
    type: string;
    onChangeType: (e: string) => void;
    error?: string;
    predefinedTypes: string[];           // provided by AddTaskScreen
    isCustomType: boolean;               // provided by AddTaskScreen
    onChangeCustomFlag: (flag: boolean) => void; // provided by AddTaskScreen
}

export default function TaskTypeCard({
    type,
    onChangeType,
    error,
    predefinedTypes,
    isCustomType,
    onChangeCustomFlag
}: TaskTypeCardProps) {

    return (
        <div className="task-title-card-container">
            <div className="task-title-label">
                Type <span style={{ color: '#999', fontSize: '0.9em' }}>(required)</span>
            </div>

            {/* SHOW DROPDOWN WHEN NOT IN CUSTOM MODE */}
            {!isCustomType && (
                <select
                    value={predefinedTypes.includes(type) ? type : ""}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (v === "__custom") {
                            // tell parent to switch to custom mode (do not overwrite custom text)
                            onChangeType("");          // clear current type so input is empty
                            onChangeCustomFlag(true);
                        } else {
                            onChangeType(v);
                        }
                    }}
                    style={{
                        width: "250px",
                        marginBottom: "8px",
                        border: error ? '2px solid #e74c3c' : undefined,
                        backgroundColor: error ? '#ffe6e6' : undefined
                    }}
                >
                    <option value="">Select a type...</option>
                    {predefinedTypes.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                    <option value="__custom">Other (create new)</option>
                </select>
            )}

            {/* SHOW ONLY THE TEXT INPUT WHEN IN CUSTOM MODE */}
            {isCustomType && (
                <div style={{ position: "relative", width: "250px" }}>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => onChangeType(e.target.value)}
                        placeholder="Enter custom type..."
                        style={{
                            width: "100%",
                            border: error ? '2px solid #e74c3c' : undefined,
                            backgroundColor: error ? '#ffe6e6' : undefined,
                            paddingRight: "28px"
                        }}
                        required
                    />

                    {/* arrow that switches back to dropdown (parent-controlled) */}
                    <div
                        role="button"
                        aria-label="Choose from presets"
                        title="Choose from presets"
                        style={{
                            position: "absolute",
                            right: "6px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "0.9em",
                            userSelect: "none"
                        }}
                        onClick={() => {
                            // switch back to dropdown mode (parent will render select)
                            onChangeCustomFlag(false);
                        }}
                    >
                        ▼
                    </div>
                </div>
            )}

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
