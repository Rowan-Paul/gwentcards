function CardUI(props) {
  const card = props.card
  let abilities = []

  const plusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 float-right mr-5 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  )
  const heartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 float-right mr-3 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )

  if (card.abilities) {
    card.abilities.forEach((ability) => {
      abilities.push(titleCase(ability))
    })
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const divStyle = {
    backgroundColor: '#e08617',
  }

  // card from https://w3collective.com/card-component-tailwind-css/
  return (
    <div className="rounded md:my-5 bg-white shadow max-w-md min-w-full mx-auto">
      <header className="p-4">
        <span
          style={divStyle}
          className="text-3xl text-white w-10 h-10 m-1 mr-3 float-left rounded-full"
        >
          {card.strength}
        </span>
        <h3 className="text-lg font-bold">{titleCase(card.name)}</h3>
        <p className="text-sm text-gray-600">{titleCase(card.deck)}</p>
      </header>

      <section>
        <img
          className="mx-auto"
          alt={'Image of ' + card.name}
          src="https://via.placeholder.com/205x387"
        />
        <p className="p-4">
          <span className="block">
            {card.row ? 'Row: ' + titleCase(card.row) : ''}
          </span>

          <span className="block">
            {card.effect ? 'Effect: ' + titleCase(card.effect) : ''}
          </span>

          <span className="block">
            {card.notes ? 'Notes: ' + capitalizeFirstLetter(card.notes) : ''}
          </span>

          <span className="block" key={Math.random()}>
            {card.abilities ? 'Abilities: ' + abilities.toString() : ''}
          </span>
        </p>
      </section>

      <footer className="p-4">
        {heartIcon}
        {plusIcon}
      </footer>
    </div>
  )
}

export const Card = CardUI
