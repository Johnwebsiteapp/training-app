"use client";
import { useState, useEffect, useCallback, useRef } from "react";

const TIMER_STORAGE_KEY = "rest-timer-end";

export function useTimer(duration: number = 90) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // On mount, check if there's a running timer in localStorage
  useEffect(() => {
    const savedEnd = localStorage.getItem(TIMER_STORAGE_KEY);
    if (savedEnd) {
      const endTime = parseInt(savedEnd, 10);
      const remaining = Math.round((endTime - Date.now()) / 1000);
      if (remaining > 0) {
        setTimeLeft(remaining);
        setIsRunning(true);
      } else {
        // Timer finished while app was closed
        localStorage.removeItem(TIMER_STORAGE_KEY);
        setTimeLeft(0);
        setIsRunning(false);
        setIsFinished(true);
        playNotification();
      }
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        // Recalculate from localStorage endTime for accuracy
        const savedEnd = localStorage.getItem(TIMER_STORAGE_KEY);
        if (savedEnd) {
          const remaining = Math.round(
            (parseInt(savedEnd, 10) - Date.now()) / 1000
          );
          if (remaining <= 0) {
            setTimeLeft(0);
            setIsRunning(false);
            setIsFinished(true);
            localStorage.removeItem(TIMER_STORAGE_KEY);
            if (intervalRef.current) clearInterval(intervalRef.current);
            playNotification();
          } else {
            setTimeLeft(remaining);
          }
        }
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const start = useCallback(() => {
    const endTime = Date.now() + duration * 1000;
    localStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
    setTimeLeft(duration);
    setIsFinished(false);
    setIsRunning(true);
  }, [duration]);

  const stop = useCallback(() => {
    setIsRunning(false);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(duration);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [duration]);

  return { timeLeft, isRunning, isFinished, start, stop, reset };
}

function playNotification() {
  // Vibration
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate([200, 100, 200, 100, 200]);
  }
  // Sound
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = "sine";
    gain.gain.value = 0.3;
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch {}
}
