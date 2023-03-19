import { useState } from "react";
import styles from "../styles/pagination.module.css";

const Pagination = (props) => {

    let dataStartCount = 1 + 10 * (props.searchPage - 1);

    return (
        <div className={styles.container}>
            <div className={styles.pagesResult}>
                <span>Showing <span className={styles.result}>{dataStartCount}</span> to <span className={styles.result}>{dataStartCount - 1 + props.dataLength}</span> of <span className={styles.result}>{props.dataCount}</span> results</span>
            </div>
            <div className={styles.paginationContainer}>
                <div className={styles.pageBlock}
                    onClick={() => {
                        (props.searchPage > 1) &&
                            props.setSearchPage(props.searchPage - 1);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div
                    className={(props.searchPage + 0 <= props.maxPage - 4 ? styles.selectedBlock : props.maxPage <= 5 ? props.searchPage === 1 ? styles.selectedBlock : styles.pageBlock : props.searchPage === props.maxPage - 4 ? styles.selectedBlock : styles.pageBlock)}
                    onClick={(e) => {
                        props.setSearchPage(parseInt(e.target.innerText));
                    }}>
                    {props.searchPage + 0 <= props.maxPage - 4
                        ? props.searchPage + 0
                        : props.maxPage - 4 < 1
                            ? 1
                            : props.maxPage - 4}
                </div>
                {
                    props.maxPage >= 2 &&
                    <div
                    className={(props.searchPage + 1 <= props.maxPage - 3 ? styles.pageBlock : props.maxPage <= 5 ? props.searchPage === 2 ? styles.selectedBlock : styles.pageBlock : props.searchPage === props.maxPage - 3 ? styles.selectedBlock : styles.pageBlock)}
                        onClick={(e) => {
                            props.setSearchPage(parseInt(e.target.innerText))
                        }}>
                        {props.searchPage + 1 <= props.maxPage - 3
                            ? props.searchPage + 1
                            : props.maxPage - 3 < 2
                                ? 2
                                : props.maxPage - 3}
                    </div>
                }
                {
                    props.maxPage >= 3 &&
                    <div
                    className={(props.searchPage + 2 <= props.maxPage - 2 ? styles.pageBlock : props.maxPage <= 5 ? props.searchPage === 3 ? styles.selectedBlock : styles.pageBlock : props.searchPage === props.maxPage - 2 ? styles.selectedBlock : styles.pageBlock)}
                        onClick={(e) => {
                            props.setSearchPage(parseInt(e.target.innerText))
                        }}>
                        {props.searchPage + 2 <= props.maxPage - 2
                            ? props.searchPage + 2
                            : props.maxPage - 2 < 3
                                ? 3
                                : props.maxPage - 2}
                    </div>
                }
                {
                    props.maxPage >= 4 &&
                    <div
                    className={(props.searchPage + 3 <= props.maxPage - 1 ? styles.pageBlock : props.maxPage <= 5 ? props.searchPage === 4 ? styles.selectedBlock : styles.pageBlock : props.searchPage === props.maxPage - 1 ? styles.selectedBlock : styles.pageBlock)}
                        onClick={(e) => {
                            props.setSearchPage(parseInt(e.target.innerText))
                        }}>
                        {props.searchPage + 3 <= props.maxPage - 1
                            ? props.searchPage + 3
                            : props.maxPage - 1 < 4
                                ? 4
                                : props.maxPage - 1}
                    </div>
                }
                {
                    props.maxPage >= 5 &&
                    <div
                    className={(props.searchPage + 4 <= props.maxPage - 0 ? styles.pageBlock : props.maxPage <= 5 ? props.searchPage === 5 ? styles.selectedBlock : styles.pageBlock : props.searchPage === props.maxPage - 0 ? styles.selectedBlock : styles.pageBlock)}
                        onClick={(e) => {
                            props.setSearchPage(parseInt(e.target.innerText))
                        }}>
                        {props.searchPage + 4 <= props.maxPage - 0
                            ? props.searchPage + 4
                            : props.maxPage - 0 < 5
                                ? 5
                                : props.maxPage - 0}
                    </div>
                }
                <div className={styles.pageBlock}
                    onClick={() => {
                        (props.searchPage < props.maxPage) &&
                            props.setSearchPage(parseInt(props.searchPage) + 1);
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Pagination;