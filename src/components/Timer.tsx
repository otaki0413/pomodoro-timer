import { useRef, useState } from "react";
import { ModeTypeButton } from "./ModeTypeButton";
import { ControlButton } from "./ControlButton";
import { Pause, Play, RefreshCcw } from "lucide-react";
import { TIMER_OPTIONS } from "../constants";

const Timer = () => {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [pausedTimeRemaining, setPausedTimeRemaining] = useState<number | null>(
    null
  );
  // setIntervalメソッドのIDを管理
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // モード切り替え
  const handleChangeMode = () => {
    handleReset();
    setMode(mode === "work" ? "break" : "work");
  };

  // タイマー開始
  const handleStart = () => {
    // TODO: オーディオ設定

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

  return (
    <div
      className={`flex justify-center rounded-xl p-4 bg-gradient-to-br w-[740px] mx-auto ${
        mode === "work"
          ? "from-amber-500 to-red-500"
          : "from-yellow-500 to-green-500"
      }`}
    >
      <div className="bg-zinc-700 space-y-12 rounded-xl w-full min-h-96 p-8">
        {/* モード切り替えボタン */}
        <div className="flex justify-center gap-4">
          {["work", "break"].map((modeType) => (
            <ModeTypeButton
              key={modeType}
              modeType={modeType as "work" | "break"}
              currentMode={mode}
              onClick={handleChangeMode}
            />
          ))}
        </div>

        <p className="text-center font-bold text-9xl font-mono text-zinc-100">
          {displayMinutes}:{displaySeconds}
        </p>

        {/* コントロールボタン */}
        <div className="flex justify-center gap-4 mb-6">
          {!isRunning ? (
            <ControlButton onClick={handleStart} Icon={Play} />
          ) : (
            <ControlButton onClick={handleStop} Icon={Pause} />
          )}
          <ControlButton onClick={handleReset} Icon={RefreshCcw} />
        </div>
      </div>
    </div>
  );
};

export default Timer;
