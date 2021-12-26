type ButtonTypes = "start" | "stop";

interface IProps {
  type: ButtonTypes;
  action: any;
}

const buttonOptions = {
  start: {
    color: "bg-green",
    hover: "hover:bg-green-hover",
    text: "Start",
  },
  stop: {
    color: "bg-red",
    hover: "hover:bg-red-hover",
    text: "Stop",
  },
};

export default function ButtonStart({ type, action }: IProps) {
  const button = buttonOptions[type];

  return (
    <div
      className={`container cursor-pointer rounded-xl grid place-items-center max-w-[9rem] ${button.color} ${button.hover}`}
      onClick={action}
    >
      <div className="p-2">
        <span className="font-medium text-white select-none">{button.text}</span>
      </div>
    </div>
  );
}
