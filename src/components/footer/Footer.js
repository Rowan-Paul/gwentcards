import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function FooterUI() {
  const noFooterPages = ['/signin', '/signup']
  const location = useLocation()

  if (noFooterPages.includes(location.pathname)) {
    return ''
  } else {
    return (
      <footer className="grid md:grid-cols-5">
        <span className="col-span-5">
          Copyright &copy; {new Date().getFullYear()} Rowan Paul Flynn <br></br>
        </span>
        <span className="col-span-5 md:col-span-1 md:col-start-2">
          <a href="https://github.com/Rowan-Paul/gwentcards">
            Frontend repository
          </a>
        </span>
        <span className="col-span-5 md:col-span-1 ">
          <a href="https://github.com/Rowan-Paul/gwentcards">
            Backend repository
          </a>
        </span>
        <span className="col-span-5 md:col-span-1 md:col-end-5">
          <Link to="/remove-account">Remove account</Link>
        </span>
      </footer>
    )
  }
}

export const Footer = FooterUI
