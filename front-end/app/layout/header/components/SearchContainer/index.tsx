"use client"
import React, { ChangeEvent, useState } from 'react'
import styles from "./component.module.css"
import { ApiDefaultResult } from '@/app/ts/interfaces/apiAnilistDataInterface'
import anilist from '@/api/anilist'
import SearchResultItemCard from '@/app/components/SearchResultItemCard'
import LoadingIcon from '@/public/assets/ripple-1s-200px.svg'
import SearchIcon from '@/public/assets/search.svg'

function SearchContainer() {

    const [isMobileSearchBarOpen, setIsMobileSearchBarOpen] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [searchResults, setSearchResults] = useState<ApiDefaultResult[] | null>()

    const [searchInput, setSearchInput] = useState<string>("")

    async function searchValue(e: React.ChangeEvent<HTMLFormElement> | HTMLFormElement) {

        e.preventDefault()

        const query = searchInput

        if (query.length == 0) return

        setIsLoading(true)

        const result = await anilist.getSeachResults(query)

        setSearchResults(result as ApiDefaultResult[])

        setIsLoading(false)

    }

    // when clicked, shows serch bar and results, 
    // if clicked again, hide both and erase search results
    function toggleSearchBarMobile() {

        setIsMobileSearchBarOpen(!isMobileSearchBarOpen)
        setSearchResults(null)

    }

    return (
        <>
            <div id={styles.search_container}>

                <button
                    id={styles.btn_open_search_form_mobile}
                    onClick={() => toggleSearchBarMobile()}
                    aria-controls={styles.input_search_bar}
                    aria-label={isMobileSearchBarOpen ? 'Click to Hide Search Bar' : 'Click to Show Search Bar'}
                    className={styles.heading_btn}
                >
                    <SearchIcon alt="Search Icon" width={16} height={16} />
                </button>

                {/* TABLET AND DESKTOP */}
                <div id={styles.form_search}>

                    <form onSubmit={(e) => searchValue(e as HTMLFormElement | ChangeEvent<HTMLFormElement>)} className={`${styles.search_form} display_flex_row`}>
                        <input type="text" placeholder='Search...' name='searchField' disabled={isLoading} onChange={(e) => setSearchInput(e.target.value)}></input>
                        <button type='submit' disabled={isLoading} aria-label='Begin Search'>
                            {isLoading ?
                                (<LoadingIcon alt="Loading Icon" width={16} height={16} />) :
                                (<SearchIcon alt="Search Icon" width={16} height={16} />)
                            }
                        </button>
                    </form>

                </div>

                {/* MOBILE */}
                {isMobileSearchBarOpen && (
                    <div id={styles.form_mobile_search} aria-expanded={isMobileSearchBarOpen} className='display_align_justify_center'>

                        <form onSubmit={(e) => searchValue(e as HTMLFormElement | ChangeEvent<HTMLFormElement>)} className={`${styles.search_form} display_flex_row`}>
                            <input type="text" placeholder='Search...' name='searchField' disabled={isLoading} onChange={(e) => setSearchInput(e.target.value)}></input>
                            <button type='submit' disabled={isLoading} aria-label='Begin Search'>
                                {isLoading ?
                                    (<LoadingIcon alt="Loading Icon" width={16} height={16} />) :
                                    (<SearchIcon alt="Search Icon" width={16} height={16} />)
                                }
                            </button>
                        </form>

                    </div>
                )}

            </div>

            {/* SEARCH RESULTS */}
            {searchResults != null && (
                <div id={styles.search_results_container}>

                    <button onClick={() => setSearchResults(null)}>Clear Search</button>

                    <ul>
                        {searchResults.slice(0, 6).map((item: ApiDefaultResult, key: number) => (
                            <SearchResultItemCard key={key} item={item} />
                        ))}
                    </ul>

                </div>
            )}
        </>
    )
}

export default SearchContainer