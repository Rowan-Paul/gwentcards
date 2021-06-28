import React, { useState } from 'react'

import { PageSizeFilter } from './filters/PageSizeFilter'
import { DeckFilter } from './filters/DeckFilter'
import { AbilitiesFilter } from './filters/AbilitiesFilter'
import { RowFilter } from './filters/RowFilter'
import { StrengthFilter } from './filters/StrengthFilter'
import { EffectFilter } from './filters/EffectFilter'
import { ResetFilters } from './filters/ResetFilters'
import { ShowCollectedCardsFilter } from './filters/ShowCollectedCardsFilter'
import { HideCollectedCardsFilter } from './filters/HideCollectedCardsFilter'
import { ListViewSwitch } from './ListViewSwitch'
import { DLCFilter } from './filters/DLCFilter'

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
      <div className="my-5 p-2 text-left md:grid md:grid-cols-3 lg:grid-cols-5">
        <PageSizeFilter />
        <ListViewSwitch />
      </div>
      <p
        className="block cursor-pointer underline md:hidden"
        onClick={handleOnClick}
      >
        {arrow}
        Filters
      </p>
      <div
        className={`my-5 p-2 text-left md:grid md:grid-cols-3 lg:grid-cols-5 ${display}`}
      >
        <DeckFilter />
        <AbilitiesFilter />
        <RowFilter />
        <StrengthFilter />
        <EffectFilter />
        <ShowCollectedCardsFilter />
        <HideCollectedCardsFilter />
        <DLCFilter />

        <ResetFilters />
      </div>
    </div>
  )
}

export const Filters = FiltersUI
