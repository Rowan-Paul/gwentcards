import React, { useEffect, useState } from 'react'
import Switch from 'react-switch'
import { connect } from 'react-redux'

import { setFilters } from '../../../redux/cards/actions'

function ListViewSwitchUI(props) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    const tempFilters = props.filters
    tempFilters.listView = !checked

    props.setFilters(tempFilters)
    setChecked(!checked)
  }

  return (
    <span className="mb-3 md:mb-0 lg:mb-3 p-3">
      <label htmlFor="ListViewSwitch" className="mr-5 font-bold">
        View as list or grid
      </label>

      <Switch
        checked={checked}
        onChange={handleChange}
        onColor="#86d3ff"
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="w-full my-2 mx-5"
        id="ListViewSwitch"
      />
    </span>
  )
}

const mapStateToProps = (state) => ({
  filters: state.cards.filters,
})

const mapDispatchToProps = (dispatch) => ({
  setFilters: (filters) => dispatch(setFilters(filters)),
})

export const ListViewSwitch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListViewSwitchUI)
