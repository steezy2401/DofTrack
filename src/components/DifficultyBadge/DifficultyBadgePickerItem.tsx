interface IProps {
  title: string;
  img: string;
  action: () => void;
}

export default function DifficultyBadgePickerItem({ title, img, action }: IProps) {
  return (
    <div
      className="container flex row gap-2 w-full pr-7 hover:bg-grey-lighter rounded-md p-1 cursor-pointer"
      onClick={action}
    >
      <img
        className="object-scale-down w-4"
        src={`/images/${img}.png`}
        alt="icon"
      />

      <span className="text-sm text-grey-dark">{title}</span>
    </div>
  );
}
