
const paginatorOffset = 3

export function ProductTableFooter(props) {
    const count = props.count
    const page = props.page
    const pageSize = props.pageSize
    const onPageChange = props.onPageChange

    let pagesArray = []
    pagesArray.push(
        <Paginator
            key={1}
            currentPage={page}
            pageTarget={1}
            onPageChange={onPageChange}
        />
    )

    let numberOfPages = Math.ceil(count / pageSize)
    for (let i = page - paginatorOffset; i < numberOfPages; i++) {
        if (i < 1) {
            continue
        }
        if (i < page + (paginatorOffset - 1)) {
            pagesArray.push(
                <Paginator
                    key={i + 1}
                    currentPage={page}
                    pageTarget={i + 1}
                    onPageChange={onPageChange}
                />
            )
        }
    }

    if (numberOfPages > pagesArray.length && page + paginatorOffset <= numberOfPages) {
        pagesArray.push(
            <Paginator
                key={numberOfPages}
                currentPage={page}
                pageTarget={numberOfPages}
                onPageChange={onPageChange}
            />
        )
    }

    return (pagesArray)
}

function Paginator(props) {
    const currentPage = props.currentPage
    const pageTarget = props.pageTarget
    const onPageChange = props.onPageChange
    return (
        <>
            {currentPage + paginatorOffset < pageTarget && <span>...</span>}
            <span
                style={{ color: currentPage === pageTarget ? "red" : "black" }}
                onClick={e => onPageChange(pageTarget)}> {pageTarget}
            </span>
            {currentPage - paginatorOffset > pageTarget && <span>...</span>}
        </>
    )
}