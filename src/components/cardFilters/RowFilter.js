import { Filter } from './Filter'

function RowFilterUI(props) {
  return (
    <Filter
      name="row"
      handleOnChange={props.handleFilterOnChange}
      options={[
        { label: 'Hero', value: 'hero' },
        { label: 'Close', value: 'close' },
        { label: 'Ranged', value: 'ranged' },
        { label: 'Siege', value: 'siege' },
        { label: 'Leader', value: 'leader' },
        { label: 'Agile', value: 'agile' },
      ]}
      reset={props.reset}
    />
  )
}

export const RowFilter = RowFilterUI
