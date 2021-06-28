import React from 'react'

function AboutPageUI() {
  return (
    <div className="md:px-20 lg:px-52 text-left">
      <h1 className="text-center">About</h1>
      <p>
        Gwent is a fast-paced card mini-game that can be played within The
        Witcher 3: Wild Hunt. The game is about the clash of two armies locked
        in mortal struggle on a battlefield where the players are the leaders
        and the cards their forces.
      </p>
      <p>
        On this site you can track, look and filter through all cards that are
        available inside the game in the latest patch. This way you can easily
        see how many cards you have left to collect or what cards you already
        have. If you create an account you can sync your cards across devices,
        though this site also works without logged out.
      </p>
      <p>
        This site is open-source, which means you can help creating it or make
        your own version. Check out the{' '}
        <a href="https://github.com/Rowan-Paul/GWENTcards">GitHub repository</a>{' '}
        for more information.
      </p>
      <p>
        This site was created by me, Rowan Paul Flynn. Check out my{' '}
        <a href="http://rowanpaulflynn.com">website</a> for more cool projects
        I&apos;ve made.
      </p>
    </div>
  )
}

export const AboutPage = AboutPageUI
