import React from 'react'
import { ScrollToTopButton } from '../../components/scroll-to-top/ScrollToTop'
import { Cards } from '../cards/Cards'

function HomePageUI() {
  return (
    <div>
      <h1 className="mb-0">GWENTcards</h1>
      <p className="italic mt-0">All about the Witcher 3 GWENT game</p>
      <Cards />
      <ScrollToTopButton />
    </div>
  )
}

export const HomePage = HomePageUI
