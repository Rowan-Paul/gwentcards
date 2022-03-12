interface IButtonProps {
  onClick: any;
  title: string;
  selected?: boolean;
}

const Button = ({ onClick, title, selected }: IButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`block text-center text-white p-4 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid hover:bg-indigo-600 select-none ${
        selected && 'border-4 border-purple-800'
      }`}
    >
      {title}
    </div>
  );
};

export default Button;
