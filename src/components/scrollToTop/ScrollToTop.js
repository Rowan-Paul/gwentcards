import React, { useEffect, useState } from 'react'
import { HashLink } from 'react-router-hash-link'

function ScrollToTopButtonUI() {
  const [scrollToTopClassName, setScrollToTopClassName] = useState(
    'w-20 invisible h-20 fixed bottom-5 right-5'
  )

  useEffect(() => {
    window.onscroll = function () {
      if (window.pageYOffset > window.innerHeight * 0.75) {
        setScrollToTopClassName('w-10 h-10 fixed bottom-5 right-5')
      } else {
        setScrollToTopClassName('none')
      }
    }
    return () => window.removeEventListener('scroll', window.onscroll)
  })

  return (
    <HashLink smooth to="#top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        fill="#000000"
        className={scrollToTopClassName}
      >
        <rect fill="none" height="24" width="24" />
        <path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
      </svg>
    </HashLink>
  )
}

export const ScrollToTopButton = ScrollToTopButtonUI
