type ControlButtonProps = {
  onClick: () => void;
  Icon: React.ElementType;
};

export const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  Icon,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 opacity-90 p-3 rounded-full hover:opacity-100 transition"
    >
      <Icon className="text-white" />
    </button>
  );
};
