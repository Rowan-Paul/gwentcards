import { Fragment } from 'react'
import { Cards } from '../cards/Cards'

function HomePageUI() {
  return (
    <Fragment>
      <h1>GWENTcards</h1>
      <p>All about the Witcher 3 GWENT game</p>
      <Cards />
    </Fragment>
  )
}

export const HomePage = HomePageUI
