import { useQueryClient } from 'react-query';
import Button from './Button';

interface IDeckFilterProps {
  setFilter: any;
  title: string;
  filter: string[];
}

const DeckFilter = ({ setFilter, title, filter }: IDeckFilterProps) => {
  const queryClient = useQueryClient();

  const onClickAction = () => {
    if (filter.includes(title)) {
      const newArray = removeItemAll(filter, title);
      setFilter(newArray);
      queryClient.cancelQueries('cards');
      queryClient.invalidateQueries('cards');
    } else {
      setFilter([...filter, title]);
    }
  };

  return <Button onClick={onClickAction} title={title} selected={filter.includes(title)} />;
};

function removeItemAll(arr: any[], value: any) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

export default DeckFilter;
