import React from 'react'

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="https://www.innoscripta.com/" className="-m-1.5 p-1.5">
            <span className="sr-only">Innoscripta AG</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header