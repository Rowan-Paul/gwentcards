import { useState } from 'react'

import { PageSizeFilter } from './cardFilters/PageSizeFilter'
import { DeckFilter } from './cardFilters/DeckFilter'
import { AbilitiesFilter } from './cardFilters/AbilitiesFilter'
import { RowFilter } from './cardFilters/RowFilter'
import { StrengthFilter } from './cardFilters/StrengthFilter'
import { EffectFilter } from './cardFilters/EffectFilter'
import { ResetFilters } from './cardFilters/ResetFilters'
import { ShowUserCardsFilter } from './cardFilters/ShowUserCardsFilter'
import { HideUserCardsFilter } from './cardFilters/HideUserCardsFilter'

function FiltersUI() {
  const downArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="w-5 h-5 inline-block"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 10l5 5 5-5H7z" />
    </svg>
  )
  const upArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      className="w-5 h-5 inline-block"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 14l5-5 5 5H7z" />
    </svg>
  )

  const [display, setDisplay] = useState('hidden')
  const [arrow, setArrow] = useState(downArrow)

  const handleOnClick = () => {
    if (display === 'hidden') {
      setDisplay('grid')
      setArrow(upArrow)
    } else {
      setDisplay('hidden')
      setArrow(downArrow)
    }
  }

  return (
    <div>
      <p
        className="block cursor-pointer underline md:hidden"
        onClick={handleOnClick}
      >
        {arrow}Filters
      </p>
      <div
        className={`my-5 p-2 text-left md:grid md:grid-cols-3 lg:grid-cols-5 ${display}`}
      >
        <PageSizeFilter />

        <DeckFilter />
        <AbilitiesFilter />
        <RowFilter />
        <StrengthFilter />
        <EffectFilter />
        <ShowUserCardsFilter />
        <HideUserCardsFilter />

        <ResetFilters />
      </div>
    </div>
  )
}

export const Filters = FiltersUI
