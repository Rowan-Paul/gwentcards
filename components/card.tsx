import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface ICardProps {
  card: {
    id: string;
    image: string;
    name: string;
    deck: "Scoia'tael";
    strength?: number;
    row: 'close' | 'agile' | 'ranged' | 'siege' | 'leader';
  };
}

interface IColumnProps {
  type: string;
  value: string | number;
  span?: number;
}

interface IButtonProps {
  id: string;
}

const Card = ({ card }: ICardProps) => {
  const { id, image, name, deck, strength, row } = card;

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 drop-shadow-md">
      <div className="hidden md:grid grid-cols-6 justify-center items-center gap-8">
        <div>
          <Image src={image} alt={`${name} card`} width="75" height="142" />
        </div>
        <Column type="Card" value={name} span={2} />
        <Column type="Deck" value={deck} />
        {strength && <Column type="Strength" value={strength} />}
        <Column type="Row" value={row} />
      </div>
      <div className="grid md:hidden grid-cols-4 justify-center items-center gap-4">
        <div>
          <Image src={image} alt={`${name} card`} width="75" height="142" />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <Column type="Card" value={name} />
          <Column type="Deck" value={deck} />
        </div>
        <div className="flex flex-col gap-2">
          {strength && <Column type="Strength" value={strength} />}
          <Column type="Row" value={row} />
        </div>
      </div>
      <Button id={id} />
    </div>
  );
};

const Button = ({ id }: IButtonProps) => {
  const queryClient = useQueryClient();

  const getData = async () => {
    try {
      return JSON.parse(localStorage.collected);
    } catch {
      return { collected: [] };
    }
  };

  const { data } = useQuery('collected', getData, {
    refetchOnWindowFocus: false
  });

  const mutation = useMutation(
    // @ts-ignore
    () => {
      if (data?.collected.includes(id)) {
        const newCollected = data.collected;
        const index = newCollected.indexOf(id);
        if (index !== -1) {
          newCollected.splice(index, 1);
        }

        localStorage.setItem('collected', JSON.stringify({ collected: [...newCollected] }));
      } else {
        localStorage.setItem('collected', JSON.stringify({ collected: [...data?.collected, id] }));
      }
    },
    {
      onMutate: async (text) => {
        await queryClient.cancelQueries('collected');
        const previousValue = queryClient.getQueryData('collected');

        queryClient.setQueryData('collected', (old: any) => ({
          collected: [...old?.collected, text]
        }));

        return previousValue;
      },
      onError: (err, variables, previousValue) => queryClient.setQueryData('collected', previousValue),
      onSettled: () => {
        queryClient.invalidateQueries('collected');
      }
    }
  );

  return (
    <button
      className="text-center w-full bg-purple-500 drop-shadow-lg p-2 my-2 hover:bg-indigo-600 text-white"
      onClick={() => {
        // @ts-ignore
        mutation.mutate({ id: id });
      }}
    >
      {data?.collected.includes(id) ? '✅Collected' : 'Collect'}
    </button>
  );
};

const Column = ({ type, value, span }: IColumnProps) => {
  return (
    <div className={`flex flex-col col-span-${span || 1}`}>
      <span className="font-bold">{type}</span>
      <span>{value}</span>
    </div>
  );
};

export default Card;
