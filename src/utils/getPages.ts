export const getPages = (pages: number[], currentPage: number, pagesCount: number) => {
    if (currentPage <= 3) {
        const validPages = [1, 2, 3, 4, 5]
        return validPages.filter(page => page <= pagesCount)
    }
    if (pagesCount <= 5) {
        return pages.filter(page => page !== 0)
    }
    if (currentPage > pages.length - 3) {
        const validPages = [4, 3, 2, 1, 0]
        return validPages.map(page => pagesCount - page)
    }
    const validPages = [2, 1, 0, -1, -2]
    return validPages.map(page => currentPage - page)
}
