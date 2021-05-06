import { PageSizeFilter } from '../../components/cardFilters/PageSizeFilter'
import { DeckFilter } from '../../components/cardFilters/DeckFilter'
import { AbilitiesFilter } from '../../components/cardFilters/AbilitiesFilter'
import { RowFilter } from '../../components/cardFilters/RowFilter'
import { StrengthFilter } from '../../components/cardFilters/StrengthFilter'
import { EffectFilter } from '../../components/cardFilters/EffectFilter'
import { ResetFilters } from '../../components/cardFilters/ResetFilters'

function FiltersUI(props) {
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
