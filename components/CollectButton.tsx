import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import LocationsModal from './LocationsModal';

interface IButtonProps {
  id: string;
  location: string;
  setShowLocations: any;
}

const CollectButton = ({ id, location, setShowLocations }: IButtonProps): JSX.Element => {
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
    <div className="flex w-full bg-purple-500 drop-shadow-lg my-2 cursor-pointer divide-purple-400 divide-x divide-solid">
      <div
        className="grow text-center text-sm text-white p-2 hover:bg-indigo-600"
        onClick={() => {
          // @ts-ignore
          mutation.mutate({ id: id });
        }}
      >
        {data?.collected.includes(id) ? `✅` : `${location}`}
      </div>
      <div className="flex py-2 px-3 hover:bg-indigo-600" onClick={() => setShowLocations()}>
        <Image src="/open.svg" alt="Open location modal" width="12" height="12" />
      </div>
    </div>
  );
};

export default CollectButton;
