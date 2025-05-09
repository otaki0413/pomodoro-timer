import { useEffect, useRef, useState } from "react";
import { useAudio } from "./useAudio";
import { TIMER_OPTIONS } from "../constants";

// タイマー関連のカスタムフック
export const useTimer = () => {
  // タイマーのモード（作業・休憩）を管理
  const [mode, setMode] = useState<"work" | "break">("work");
  // タイマーの状態（実行中・停止中）を管理
  const [isRunning, setIsRunning] = useState(false);
  // タイマーの開始時間を管理
  const [startTime, setStartTime] = useState<number | null>(null);
  // 現在時刻を管理
  const [now, setNow] = useState<number | null>(null);
  // タイマーの経過時間を管理
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState<number | null>(
    null
  );

  // タイマーのインターバルIDを管理
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { audioRef, playChime } = useAudio();

  // タイマー完了時の処理
  useEffect(() => {
    if (startTime && now) {
      const timePassed = now - startTime;
      const totalTime = TIMER_OPTIONS[mode].minutes * 60 * 1000;

      if (timePassed >= totalTime) {
        playChime();
        handleChangeMode();
        handleStart();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now, startTime, mode]);

  // モード切り替え
  const handleChangeMode = () => {
    handleReset();
    setMode(mode === "work" ? "break" : "work");
  };

  // タイマー開始
  const handleStart = () => {
    // オーディオコンテキストが存在しない場合は新規作成
    if (audioRef.current) {
      audioRef.current.resume();
    }

    // 現在時間を格納
    const currentTime = Date.now();
    // タイマー停止中、かつ一時停止時の経過時間が存在する場合
    if (!isRunning && pausedTimeRemaining) {
      // 一時停止していた時間を引いて、開始時間を補正
      setStartTime(currentTime - pausedTimeRemaining);
      setPausedTimeRemaining(null);
    } else {
      setStartTime(currentTime);
    }
    setNow(Date.now());
    // 古いタイマー初期化
    clearInterval(intervalRef.current);
    // 1秒毎にインターバルIDを更新（現在時刻も更新）
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    setIsRunning(true);
  };

  // タイマー停止
  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    // 停止時点の経過時間を格納
    if (startTime != null && now != null) {
      setPausedTimeRemaining(now - startTime);
    }
  };

  // タイマーリセット
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setStartTime(null);
    setNow(null);
    setIsRunning(false);
    setPausedTimeRemaining(null);
  };

  // 経過時間（秒）・・・ミリ秒を秒単位に換算
  const secondsPassed =
    startTime != null && now != null ? Math.floor((now - startTime) / 1000) : 0;
  // 残り時間の秒数（設定時間 - 経過時間）
  const calculateTime = TIMER_OPTIONS[mode].minutes * 60 - secondsPassed;
  // 表示時間（分・秒）
  const displayMinutes = Math.floor(calculateTime / 60);
  const displaySeconds =
    calculateTime % 60 < 10 ? "0" + (calculateTime % 60) : calculateTime % 60;

  return {
    mode,
    isRunning,
    handleChangeMode,
    handleStart,
    handleStop,
    handleReset,
    displayMinutes,
    displaySeconds,
  };
};
