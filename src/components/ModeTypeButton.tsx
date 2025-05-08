import { TIMER_OPTIONS } from "../constants";

type ModeTypeButtonProps = {
  modeType: "work" | "break";
  currentMode: "work" | "break";
  onClick: () => void;
};

export const ModeTypeButton: React.FC<ModeTypeButtonProps> = ({
  modeType,
  currentMode,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-3xl h-16 w-16 rounded-full flex justify-center items-center hover:bg-zinc-700 ${
        currentMode === modeType ? "border border-white" : ""
      }`}
    >
      {TIMER_OPTIONS[modeType].label}
    </button>
  );
};
