import styles from "../styles/forms.module.css"

const SearchFilter = (props) => {
    return (
        <div className={styles.searchFilterContainer}>
            <div className={styles.dateContainer}>
                <div className={styles.searchDateInput}>
                    <label htmlFor="startDate">From</label>
                    <input type="date" onChange={(e) => props.setStartDate(e.target.value)} placeholder="Enter your name" required />
                </div>
                <div className={styles.searchDateInput}>
                    <label htmlFor="endDate">To</label>
                    <input type="date" onChange={(e) => props.setEndDate(e.target.value)} placeholder="Enter your name" required />
                </div>
                <div>
                    <button type="button" className={styles.button} onClick={props.onSearchClick}>View</button>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.searchValueInput}>
                    <label htmlFor="searchValue"></label>
                    <div className={styles.inputXMark}>
                        <div>
                            <input type="text" value={props.searchValue} onChange={(e) => props.setSearchValue(e.target.value)} placeholder="Search" required />
                        </div>
                        {
                            props.searchValue &&
                            <div onClick={()=>props.setSearchValue("")} className={styles.clearText}>x</div>
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.searchBtn} onClick={props.onSearchClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter;