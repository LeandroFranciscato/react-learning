import { TableFooter, TablePagination, TableRow } from "@mui/material"

export function GenTableFooter(props) {

    const {
        count,
        page,
        pageSize,
        onPageChange,
        onPageSizeChange
    } = props

    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    count={count}
                    page={page - 1}
                    rowsPerPage={pageSize}
                    onPageChange={(event, page) => onPageChange(page + 1)}
                    onRowsPerPageChange={e => onPageSizeChange(e.target.value)}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
            </TableRow>
        </TableFooter>
    )

}