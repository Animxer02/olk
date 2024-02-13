"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from "./component.module.css"
import MenuList from '@/public/assets/list.svg'
import ChevronUpIcon from '@/public/assets/chevron-up.svg'
import ChevronDownIcon from '@/public/assets/chevron-down.svg'

function NavListMenu() {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    // TOGGLE VISIBILITY FOR THE SIDE LIST ON MOBILE SCREENS
    const [toggleListOne, setToggleListOne] = useState<boolean>(false)
    const [toggleListTwo, setToggleListTwo] = useState<boolean>(false)

    return (
        <div id={styles.menu_container}>

            {/* WILL BE USED WHEN A BACK-END IS SET UP, AND NEW ROUTES CREATED*/}
            <button
                id={styles.btn_open_menu}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-controls={styles.menu_list}
                aria-label={isMenuOpen ? 'Click to Close Menu' : 'Click to Open Menu'}
                className={styles.heading_btn}
            >
                <MenuList alt="Menu Icon" width={16} height={16} />
            </button>

            {isMenuOpen && (
                <div id={styles.menu_list} aria-expanded={isMenuOpen}>

                    <ul role='menu'>
                        <li role='menuitem'>
                            <h5
                                className='display_flex_row align_items_center'
                                data-opened={toggleListOne}
                                onClick={() => setToggleListOne(!toggleListOne)}
                            >
                                Animes
                                {!toggleListOne ? (
                                    <ChevronDownIcon alt="Close Animes List" width={16} height={16} />
                                ) : (
                                    <ChevronUpIcon alt="Open Animes List" width={16} height={16} />
                                )}
                            </h5>

                            <ul data-visible={toggleListOne}>
                                <li><Link href={`/filter?type=anime&genre=action`}>Action</Link></li>
                                <li><Link href={`/filter?type=anime&genre=adventure`}>Adventure</Link></li>
                                <li><Link href={`/filter?type=anime&genre=comedy`}>Comedy</Link></li>
                                <li><Link href={`/filter?type=anime&genre=drama`}>Drama</Link></li>
                                <li><Link href={`/filter?type=anime&genre=sci-fi`}>Sci-Fi</Link></li>
                                <li><Link href={`/filter?type=anime&genre=thriller`}>Thriller</Link></li>
                                <li><Link href={`/filter?type=anime&genre=romance`}>Romance</Link></li>
                                <li><Link href={`/filter?type=anime&genre=slice-of-life`}>Slice of Life</Link></li>
                                <li><Link href={`/filter?type=anime&genre=mistery`}>Mistery</Link></li>
                                <li><Link href={`/filter?type=anime&genre=sports`}>Sports</Link></li>
                            </ul>
                        </li>

                        <li role='menuitem'>
                            <h5
                                className='display_flex_row align_items_center'
                                data-opened={toggleListTwo}
                                onClick={() => setToggleListTwo(!toggleListTwo)}
                            >
                                Mangas
                                {!toggleListTwo ? (
                                    <ChevronDownIcon alt="Close Mangas List" width={16} height={16} />
                                ) : (
                                    <ChevronUpIcon alt="Open Mangas List" width={16} height={16} />
                                )}
                            </h5>

                            <ul data-visible={toggleListTwo}>
                                <li><Link href={`/filter?type=manga&sort=trending_desc`}>Trending</Link></li>
                                <li><Link href={`/filter?type=manga&sort=releases_desc`}>Lastest Releases</Link></li>
                                <li><Link href={`/filter?type=manga&genre=shounen`}>Shounen</Link></li>
                                <li><Link href={`/filter?type=manga&genre=drama`}>Genre: Drama</Link></li>
                                <li><Link href={`/filter?type=manga&genre=slice-of-life`}>Genre: Slice of Life</Link></li>
                                <li><Link href={`/filter?type=manga&genre=comedy`}>Genre: Comedy</Link></li>
                                <li><Link href={`/filter?type=manga&sort=score_desc`}>Highest Rated</Link></li>
                            </ul>
                        </li>
                        {/* <li role='menuitem'>Movies</li> */}
                    </ul>

                </div>
            )}


            {isMenuOpen && (
                <div id={styles.menu_overlay} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            )}
        </div>
    )
}

export default NavListMenu