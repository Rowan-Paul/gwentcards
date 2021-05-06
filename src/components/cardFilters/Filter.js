import { useState } from 'react'
import MultiSelect from 'react-multi-select-component'

function FilterUI(props) {
  const [selected, setSelected] = useState([])

  if (props.reset && selected.length > 0) {
    setSelected([])
  }

  const handleOnChange = (e) => {
    setSelected(e)

    let selectedValues = []
    e.forEach((element) => {
      const value = element.value
      selectedValues.push(value)
    })

    props.handleOnChange({ name: props.name, values: selectedValues })
  }

  return (
    <span className="mb-3 md:mb-0 lg:mb-3 p-3">
      <label htmlFor={props.name} className="mr-5 font-bold">
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}:
      </label>

      <MultiSelect
        options={props.options}
        value={selected}
        onChange={handleOnChange}
        hasSelectAll={false}
        disableSearch={true}
        className="w-full"
      />
    </span>
  )
}

export const Filter = FilterUI
