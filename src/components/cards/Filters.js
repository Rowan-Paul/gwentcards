import { PageSizeFilter } from './cardFilters/PageSizeFilter'
import { DeckFilter } from './cardFilters/DeckFilter'
import { AbilitiesFilter } from './cardFilters/AbilitiesFilter'
import { RowFilter } from './cardFilters/RowFilter'
import { StrengthFilter } from './cardFilters/StrengthFilter'
import { EffectFilter } from './cardFilters/EffectFilter'
import { ResetFilters } from './cardFilters/ResetFilters'

function FiltersUI() {
  return (
    <div className="my-5 p-2 text-left grid md:grid-cols-3 lg:grid-cols-5">
      <PageSizeFilter />

      <DeckFilter />
      <AbilitiesFilter />
      <RowFilter />
      <StrengthFilter />
      <EffectFilter />

      <ResetFilters />
    </div>
  )
}

export const Filters = FiltersUI
