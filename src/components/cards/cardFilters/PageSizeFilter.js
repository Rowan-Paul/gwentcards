import { connect } from 'react-redux'

import { setPageSize, fetchCards } from '../../../redux/cards/actions'

function PageSizeFilterUI(props) {
  const handleOnChange = (e) => {
    props.setPageSize(e.target.value)
  }

  return (
    <span className="mb-3 md:mb-0 lg:mb-3 p-3">
      <label htmlFor="pageSize" className="mr-5 font-bold">
        Cards per page:
      </label>
      <select
        name="pageSize"
        id="pageSize"
        className="border-2 w-full px-2 h-10"
        onChange={handleOnChange}
        defaultValue="20"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </span>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setPageSize: (size) => dispatch(setPageSize(size)),
  fetchCards: () => dispatch(fetchCards()),
})

export const PageSizeFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSizeFilterUI)
