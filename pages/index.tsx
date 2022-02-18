import type { NextPage } from 'next';
import Card from '../components/card';

const Home: NextPage = () => {
  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-4 m-2 md:m-10">
      <Card image="/assets/dennis-cranmer.png" name="Barclay Els" deck="scoia'tael" strength={6} row="agile" />
      <Card
        image="/assets/dennis-cranmer.png"
        name="Ciaran aep Easnillien"
        deck="scoia'tael"
        strength={3}
        row="agile"
      />
      <Card
        image="/assets/dennis-cranmer.png"
        name="Dol Blathanna Archer"
        deck="scoia'tael"
        strength={4}
        row="ranged"
      />
      <Card image="/assets/dennis-cranmer.png" name="Dol Blathanna Scout" deck="scoia'tael" strength={6} row="agile" />
      <Card image="/assets/dennis-cranmer.png" name="Dwarven Skirmisher" deck="scoia'tael" strength={3} row="close" />
    </div>
  );
};

export default Home;
