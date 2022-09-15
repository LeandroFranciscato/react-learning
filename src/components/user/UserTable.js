
import { TableCell, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GenTable } from "../generic-table/GenTable";


export function UserTable(props) {

    const filterText = props.filterText

    function useRequestData(order, orderDirection, page, pageSize) {
        return useQuery(['useUserData', filterText, order, orderDirection, page, pageSize], async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            const array = await res.json();

            function filterTextSearch(row) {
                return row.id.toString().includes(filterText) ||
                    row.title.includes(filterText) ||
                    row.userId.toString().includes(filterText);
            }

            var filteredArray = [];
            array.forEach((row_1) => {
                if (filterTextSearch(row_1)) {
                    return filteredArray.push(row_1);
                }
            });

            if (orderDirection === "asc") {
                filteredArray.sort((a, b) => {
                    if (a[order] > b[order]) {
                        return 1;
                    }
                    if (a[order] < b[order]) {
                        return -1;
                    }
                    return 0;
                });
            } else if (orderDirection === "desc") {
                filteredArray.sort((a_1, b_1) => {
                    if (a_1[order] > b_1[order]) {
                        return -1;
                    }
                    if (a_1[order] < b_1[order]) {
                        return 1;
                    }
                    return 0;
                });
            }

            let data = { data: [], count: 0 };
            data.data = filteredArray.slice((page - 1) * pageSize, page * pageSize);
            data.count = filteredArray.length;
            return data;
        })
    }

    function prepareData(data) {
        let rows = []
        data.data.forEach((row, index) => {
            rows.push(
                <TableRow
                    key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.userId}</TableCell>
                </TableRow>
            )
        })
        return rows
    }

    return (
        <GenTable
            headerFields={[{ id: "id", name: "ID" }, { id: "title", name: "Title" }, { id: "userId", name: "User ID" }]}
            useRequestData={useRequestData}
            prepareData={prepareData}
        />
    )
}
