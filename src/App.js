import { useState, useEffect } from "react";

export default function TimerApp() {
  const [timers, setTimers] = useState(Array(24).fill(null));
  const [tick, setTick] = useState(0);

  // Update the component every second to refresh the timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startTimer = (index, duration) => {
    const endTime = Date.now() + duration * 1000;
    const newTimers = [...timers];
    newTimers[index] = endTime;
    setTimers(newTimers);
  };

  const resetTimer = (index) => {
    const newTimers = [...timers];
    newTimers[index] = null;
    setTimers(newTimers);
  };

  const getTimeRemaining = (endTime) => {
    // Timer hasn't been started yet
    if (!endTime) return "00:00";
    const remaining = Math.floor((endTime - Date.now()) / 1000);
    // Timer expired, so show Boss Spawn
    if (remaining <= 0) return "Boss Spawn";
    const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    gap: 0,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  };

  const cellStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    backgroundColor: "#333",
  };

  const buttonStyle = {
    margin: "2px",
    padding: "2px 4px",
    fontSize: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {timers.map((endTime, index) => {
        const remainingText = getTimeRemaining(endTime);
        const isBossSpawn = remainingText === "Boss Spawn";
        const remainingSeconds = (endTime - Date.now()) / 1000;
        const isWarning = !isBossSpawn && endTime && remainingSeconds < 60;
        const isCritical = !isBossSpawn && endTime && remainingSeconds < 30;
        return (
          <div
            key={index}
            style={{
              ...cellStyle,
              border: isBossSpawn
                ? "2px solid red"
                : isCritical && tick % 2 === 0
                ? "2px solid red"
                : isWarning && tick % 2 === 0
                ? "2px solid yellow"
                : "1px solid #ccc",
              backgroundColor: "#333",
            }}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "14px", color: "white" }}>
              Channel {index + 1}
            </h2>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: isBossSpawn ? "20px" : "16px",
                color: isBossSpawn ? "red" : "white",
              }}
            >
              {remainingText}
            </p>
            <div>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#3B82F6",
                  color: "white",
                }}
                onClick={() => startTimer(index, 300)}
              >
                Normal
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#FBBF24",
                  color: "white",
                }}
                onClick={() => startTimer(index, 480)}
              >
                Lightning
              </button>
            </div>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "#EF4444",
                color: "white",
                marginTop: "4px",
              }}
              onClick={() => resetTimer(index)}
            >
              Reset
            </button>
          </div>
        );
      })}
    </div>
  );
}
