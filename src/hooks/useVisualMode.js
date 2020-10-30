import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    if (replace === true) {
      const newHistory = [...history]
      newHistory.splice(history.length - 1, 1, newMode)
      setHistory(newHistory);
      setMode(newMode);
    } else if (replace === false) {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {
      const newMode = history[history.length - 2];
      const newHistory = history.slice(0, history.length - 1);
      setMode(newMode);
      setHistory(newHistory);
    }
  }

  return { mode, transition, back, history };
}