import s from './Paginator.module.scss';
import {getPages} from '../../../utils/getPages';

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

export const Paginator = ({currentPage, onPageChanged, totalUsersCount, pageSize
                          }: PaginatorPropsType) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const pagesForRender = getPages(pages, currentPage, pagesCount)

    return (
        <div className={s.paginatorContainer}>
            <div className={s.container}>
                <div className={s.edge}>
                    {currentPage > 3 && pagesCount > 5 && (
                        <>
                            <button onClick={() => onPageChanged(currentPage - 1)}>
                                ◁
                            </button>
                            <button className={currentPage === 1 ? s.selectedPage : ''}
                                    onClick={() => onPageChanged(1)}> 1
                            </button>
                            <span>...</span>
                        </>
                    )}
                </div>
                <div className={s.center}>
                    {pagesForRender.map((p, i) => <button key={String(p) + i}
                                                          className={currentPage === p ? s.selectedPage : ''}
                                                          onClick={() => onPageChanged(p)}> {p} </button>)}
                </div>
                <div className={s.edge}>
                    {currentPage < pages.length - 2 && pagesCount > 5 && (
                        <>
                            <span>...</span>
                            <button
                                className={currentPage === pages.length ? s.selectedPage : ''}
                                onClick={() => onPageChanged(pages.length)}>
                                {pages.length}
                            </button>
                            <button onClick={() => onPageChanged(currentPage + 1)}>
                                ▷
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}