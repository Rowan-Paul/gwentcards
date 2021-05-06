import { ScrollToTopButton } from '../../components/scrollToTop/ScrollToTop'
import { Cards } from '../cards/Cards'

function HomePageUI() {
  return (
    <div>
      <h1>GWENTcards</h1>
      <p>All about the Witcher 3 GWENT game</p>
      <Cards />
      <ScrollToTopButton />
    </div>
  )
}

export const HomePage = HomePageUI
