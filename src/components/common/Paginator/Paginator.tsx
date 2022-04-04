import React from 'react';
import s from './Paginator.module.css';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize}: PaginatorPropsType) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pagesForRender = currentPage <= 3 ? [1, 2, 3, 4, 5]
        : currentPage > pages.length - 3
            ? [pages.length - 4, pages.length - 3, pages.length - 2, pages.length - 1, pages.length]
            : [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]

    return (
        <div>
            {currentPage > 3
                ? <span><span onClick={() => onPageChanged(currentPage - 1)}>Предыдущая</span>
                    <span className={currentPage === 1 ? s.selectedPage : ''}
                          onClick={() => onPageChanged(1)}> {1} ...</span></span>
                : null}
            {pagesForRender.map((p, i) => <span className={currentPage === p ? s.selectedPage : ''}
                                                onClick={() => onPageChanged(p)} key={String(p) + i}> {p} </span>)}
            {currentPage < pages.length - 2
                ? <span><span className={currentPage === pages.length ? s.selectedPage : ''}
                                                          onClick={() => onPageChanged(pages.length)}>... {pages.length} </span>
                    <span onClick={() => onPageChanged(currentPage + 1)}>Следующая</span></span>
                : null}
        </div>
    )
}