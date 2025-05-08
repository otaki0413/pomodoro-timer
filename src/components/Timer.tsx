import { useState } from "react";
import { ModeTypeButton } from "./ModeTypeButton";
import { ControlButton } from "./ControlButton";
import { Pause, Play, RefreshCcw } from "lucide-react";

const Timer = () => {
  // 作業モードと休憩モードの状態を管理
  const [mode, setMode] = useState<"work" | "break">("work");
  // タイマーの状態を管理
  const [isRunning, setIsRunning] = useState(false);

  // ダミーコード（分と秒を表示）
  const displayMinutes = "25";
  const displaySeconds = "00";
  const handleStart = () => {};
  const handleStop = () => {};
  const handleReset = () => {};

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
              onClick={() => {}}
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
