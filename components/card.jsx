import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Card = ({ card }) => {
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

const Button = ({ id }) => {
  const queryClient = useQueryClient();

  const getData = async () => {
    const res = await fetch('/api/users/me/cards');
    const json = await res.json();

    if (!json?.collected || json?.collected?.length < 1) {
      throw new Error('Collected request failed or no results');
    }

    return json;
  };

  const { data } = useQuery('collected', getData, {
    refetchOnWindowFocus: false
  });

  const mutation = useMutation(
    () =>
      fetch(`/api/users/me/cards/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }),
    {
      onMutate: async (text) => {
        await queryClient.cancelQueries('collected');
        const previousValue = queryClient.getQueryData('collected');

        queryClient.setQueryData('collected', (old) => ({
          collected: [...old?.collected, text]
        }));

        return previousValue;
      },
      onError: (err, variables, previousValue) => queryClient.setQueryData('todos', previousValue),
      onSettled: () => {
        queryClient.invalidateQueries('collected');
      }
    }
  );

  return (
    <button
      className="text-center w-full bg-purple-500 drop-shadow-lg p-2 my-2 hover:bg-indigo-600 text-white"
      onClick={() => {
        mutation.mutate({ id: id });
      }}
    >
      {data?.collected.includes(id) ? '✅Collected' : 'Collect'}
    </button>
  );
};

const Column = ({ type, value, span }) => {
  return (
    <div className={`flex flex-col col-span-${span || 1}`}>
      <span className="font-bold">{type}</span>
      <span>{value}</span>
    </div>
  );
};

export default Card;
