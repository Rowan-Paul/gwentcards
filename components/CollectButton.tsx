import { useMutation, useQuery, useQueryClient } from 'react-query';

interface IButtonProps {
  id: string;
}

function setCards(data: any, id: any) {
  if (data?.collected.includes(id)) {
    const newCollected = data.collected;
    const index = newCollected.indexOf(id);
    if (index !== -1) {
      newCollected.splice(index, 1);
    }

    localStorage.setItem('collected', JSON.stringify({ collected: [...newCollected] }));
    return data
  } else {
    localStorage.setItem('collected', JSON.stringify({ collected: [...data?.collected, id] }));
    return data
  }
}

const CollectButton = ({ id }: IButtonProps) => {
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
    id => setCards(data, id),
    {
      onMutate: async (text) => {
        await queryClient.cancelQueries('collected');
        const previousValue = queryClient.getQueryData('collected');

        queryClient.setQueryData('collected', (old: any) => ({
          collected: [...old?.collected, text]
        }));

        return previousValue;
      },
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData('collected', previousValue)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['collected'])
      },
    }
  )

  return (
    <button
      className="text-center w-full bg-purple-500 drop-shadow-lg p-2 my-2 hover:bg-indigo-600 text-white"
      onClick={() => {
        //@ts-ignore
        mutation.mutate(id);
      }}
    >
      {data?.collected.includes(id) ? '✅Collected' : 'Collect'}
    </button>
  );
};

export default CollectButton;
