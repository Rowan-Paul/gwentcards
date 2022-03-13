interface IButtonProps {
  onClick: any;
  title: string;
  selected?: boolean;
}

const Button = ({ onClick, title, selected }: IButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`text-center text-white p-4 bg-purple-500 drop-shadow-lg my-2 cursor-pointer hover:bg-indigo-600 select-none ${
        selected && 'bg-purple-800'
      }`}
      tabIndex={0}
      onKeyPress={(e) => e.code === 'Enter' && onClick()}
    >
      {title}
    </div>
  );
};

export default Button;
