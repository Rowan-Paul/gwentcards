interface IButtonProps {
  onClick: any;
  title: string;
}

const Button = ({ onClick, title }: IButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="block text-center text-white p-4 bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid"
    >
      {title}
    </div>
  );
};

export default Button;
