import styled from 'styled-components'
import { LogoSimple } from './Logo'
import { useTheme } from '../hooks/useTheme'
import { IconLinkedIn } from './icons/LinkedIn'
import { IconGithub } from './icons/Github'
import state from '../store/state'
import React, { Fragment, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const itemVariants = {
  closed: { x: -16, opacity: 0 },
  open: { x: 0, opacity: 1 },
}

const itemTransition = {
  opacity: { duration: 0.2 },
}

const menuVariants = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.4,
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
}

const OverlayContainer = styled.div``

const MenuOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  -webkit-animation: moveToTop 0.5s ease-in-out both;
  animation: moveToTop 0.5s ease-in-out both;

  &.open {
    -webkit-animation: moveFromTop 0.2s ease-in-out both;
    animation: moveFromTop 0.2s ease-in-out both;
  }

  .nav-container {
    margin: 4.5rem 1.4rem;
    text-align: center;

    a {
      color: #f9fafb;
      text-decoration: none;
      font-family: 'Roboto';
      font-size: 4rem;
      font-weight: 800;
      display: block;
      margin: 20px;
      text-transform: uppercase;
    }
  }
`

const TopLeft = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: LEMON MILK, sans-serif;
  font-weight: 300;
  font-size: min(10vw, 1.25em);
  line-height: 0.9em;
`

const BottomLeft = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  & .header__arrow {
    display: block;
    height: 8.7rem;
    margin-top: 0rem;
    width: 1.7rem;
    transform: translate(0px, 0px);
    animation: bounce 1.5s infinite;

    .header__arrow__text {
      color: ${(props) => props.color || '#fff'};
      writing-mode: tb-rl;
      white-space: nowrap;
      display: block;
      bottom: 0;
      margin-left: 0.35rem;
      font-family: 'Roboto';
      font-weight: 300;
    }

    .header__arrow__dash {
      border-right: 2px solid ${(props) => props.color || '#fff'};
      height: 2.5rem;
      left: 50%;
      position: absolute;
      top: 6rem;
      transform: translate(-50%, 0);
    }

    .header__arrow__triangle {
      border-color: ${(props) => props.color || '#fff'};
      border-style: solid;
      border-width: 2px 2px 0 0;
      bottom: 1rem;
      height: 0.5rem;
      left: 50%;
      position: absolute;
      transform: rotate(135deg);
      transform-origin: 0px 100%;
      width: 0.5rem;
    }
  }
`

const BottomRight = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-family: 'Roboto';
  font-weight: 400;
  line-height: 1em;
  //letter-spacing: -0.01em;
  font-size: 12px;
  color: ${(props) => props.color || '#fff'};
`

const Hamburger = styled.div`
  position: absolute;
  flex-direction: column;
  top: 1.25rem;
  right: 1rem;
  transition: all 0.3s ease-out;
  z-index: 9999;
  display: none;

  div.menu-icon__line {
    position: relative;
    width: 24px;
    height: 1.5px;
    background: ${(props) => props.color || '#fff'};
    margin-bottom: 6px;
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.5s ease, -webkit-transform 0.2s ease;

    &.menu-icon__line-left {
      width: 16.5px;
      -webkit-transition: all 200ms linear;
      transition: all 200ms linear;
    }

    &.menu-icon__line-right {
      width: 16.5px;
      //float: right;
      transform: translateX(7px);
      -webkit-transition: all 200ms linear;
      transition: all 200ms linear;
    }
  }

  div.menu-icon__line:last-child {
    margin-bottom: 0;
  }

  &:hover {
    cursor: pointer;

    .menu-icon__line-left {
      width: 24px !important;
    }

    .menu-icon__line-right {
      width: 24px !important;
      transform: translateX(0px) !important;
    }
  }

  &.open {
    .menu-icon__line {
      -webkit-transform: translate(0px, 0px) rotate(-45deg);
      transform: translate(0px, 0px) rotate(-45deg);
    }

    .menu-icon__line-left {
      width: 15px;
      -webkit-transform: translate(1px, 5px) rotate(45deg) !important;
      transform: translate(1px, 5px) rotate(45deg) !important;
    }

    .menu-icon__line-right {
      width: 15px;
      float: right;
      -webkit-transform: translate(7px, -4.5px) rotate(45deg) !important;
      transform: translate(7px, -4.5px) rotate(45deg) !important;
    }

    &:hover {
      .menu-icon__line-left,
      .menu-icon__line-right {
        width: 15px !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: flex;
  }
`

const TopRight = styled.div`
  font-family: 'Roboto';
  font-weight: 300;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 1.25rem;
  right: 1rem;

  & .nav__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;

    & > .nav__item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      &:not(:first-child) {
        margin-left: 18px;
      }

      & > .nav__link {
        color: ${(props) => props.color || '#fff'};
        text-decoration: none;
        text-transform: uppercase;
        background-color: transparent;
        position: relative;
        display: inline-block;
        height: 1.7em;
        font-size: 16px;
        line-height: 1.7em;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          -webkit-transform: scale(0, 1);
          transform: scale(0, 1);
          -webkit-transform-origin: right top;
          transform-origin: right top;
          -webkit-transition: -webkit-transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transition: -webkit-transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          background-color: ${(props) => props.bgcolor || '#fff'};
        }

        &:hover:before,
        &:focus:before {
          -webkit-transform-origin: left top;
          transform-origin: left top;
          -webkit-transform: scale(1, 1);
          transform: scale(1, 1);
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`

export default function Overlay() {
  const theme = useTheme()
  const [menuOpenClass, setMenuOpenClass] = useState('')

  const toggleClass = () => {
    setMenuOpenClass((prev) => (prev === '' ? 'open' : ''))
  }

  return (
    <>
      <OverlayContainer className={`overlay-container`}>
        <TopLeft>
          <LogoSimple color={theme.palette.text.secondary} />
        </TopLeft>
        <BottomLeft color={theme.palette.text.secondary}>
          <div className="header__arrow">
            <div className="header__arrow__text">scroll down</div>
            <div className="header__arrow__dash"></div>
            <div className="header__arrow__triangle"></div>
          </div>
        </BottomLeft>
        <BottomRight>
          <a target="_blank" href="https://www.linkedin.com/in/danielminpro" rel="noreferrer">
            <IconLinkedIn width={30} height={30} color={theme.palette.text.secondary} />
          </a>
          <a target="_blank" href="https://github.com/1codeenchanter" rel="noreferrer" style={{ marginLeft: '10px' }}>
            <IconGithub width={30} height={30} color={theme.palette.text.secondary} />
          </a>
        </BottomRight>
        <TopRight color={theme.palette.text.secondary} bgcolor={theme.palette.text.secondary}>
          <nav className="header__nav">
            <ul className="nav__list">
              {state.navs.map(({ name, url, id, display }) => (
                <Fragment key={id}>
                  {display ? (
                    <li className="nav__item">
                      <a href={url} className="nav__link">
                        {name}
                      </a>
                    </li>
                  ) : (
                    <></>
                  )}
                </Fragment>
              ))}
            </ul>
          </nav>
        </TopRight>
        <Hamburger color={theme.palette.text.secondary} className={`mobile-nav ${menuOpenClass}`} onClick={toggleClass}>
          <div className={'menu-icon__line menu-icon__line-left'} />
          <div className={'menu-icon__line'} />
          <div className={'menu-icon__line menu-icon__line-right'} />
        </Hamburger>
      </OverlayContainer>
      <MenuOverlay className={`menu-overlay ${menuOpenClass}`}>
        <AnimatePresence>
          {menuOpenClass && (
            <motion.div className="nav-container" initial="closed" animate="open" exit="closed" variants={menuVariants}>
              {state.navs.map(({ name, url, id, display }) => (
                <Fragment key={id}>
                  {display ? (
                    <motion.a href={url} whileHover={{ scale: 1.1 }} variants={itemVariants} transition={itemTransition} onClick={toggleClass}>
                      {name}
                    </motion.a>
                  ) : (
                    <></>
                  )}
                </Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </MenuOverlay>
    </>
  )
}
