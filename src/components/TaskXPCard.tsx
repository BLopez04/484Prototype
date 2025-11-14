interface TaskXPCardProps {
    xp: number;
    onChangeXP: (xp: number) => void;
}

export default function TaskXPCard({ xp, onChangeXP }: TaskXPCardProps) {
    return (
        <div className="task-xp-card-container">
            <div className="task-xp-label">XP</div>
            <input
                type="number"
                value={xp}
                onChange={(e) => onChangeXP(Number(e.target.value))}
                placeholder="Enter XP amount..."
                style={{ width: "250px" }}
            />
        </div>
    );
}
