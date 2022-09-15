import { Table, TableBody } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GenTableHeader } from "./generic-table/GenTableHeader";
import { GenTableFooter } from "./generic-table/GenTableFooter";
import { ProductCategoryRow } from "./ProductCategoryRow";


export function ProductTable(props) {

    const [order, setOrder] = useState("name")
    const [orderDirection, setOrderDirection] = useState("asc")
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const { isLoading, error, data } = useQuery(['useProductData', props.filterText, props.onlyInStock, order, orderDirection, page, pageSize], () => {

        const filterText = props.filterText
        const onlyInStock = props.onlyInStock

        var array = [
            { category: "Sporting Goods", price: 29.99, stocked: false, name: "basketball" },
            { category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch" },
            { category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5" },
            { category: "Sporting Goods", price: 9.99, stocked: true, name: "baseball" },
            { category: "Electronics", price: 199.99, stocked: true, name: "nexus 7" },
            { category: "Sporting Goods", price: 49.99, stocked: true, name: "football" },
            { category: "Sporting Goods", price: 29.99, stocked: false, name: "basketball" },
            { category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch" },
            { category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5" },
            { category: "Sporting Goods", price: 9.99, stocked: true, name: "baseball" },
            { category: "Electronics", price: 199.99, stocked: true, name: "nexus 7" },
            { category: "Sporting Goods", price: 49.99, stocked: true, name: "football" },
            { category: "Sporting Goods", price: 29.99, stocked: false, name: "basketball" },
            { category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch" },
            { category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5" },
            { category: "Sporting Goods", price: 9.99, stocked: true, name: "baseball" },
            { category: "Electronics", price: 199.99, stocked: true, name: "nexus 7" },
            { category: "Sporting Goods", price: 49.99, stocked: true, name: "football" },
            { category: "Sporting Goods", price: 29.99, stocked: false, name: "basketball" },
            { category: "Electronics", price: 99.99, stocked: true, name: "iPod Touch" },
            { category: "Electronics", price: 399.99, stocked: false, name: "iPhone 5" },
            { category: "Sporting Goods", price: 9.99, stocked: true, name: "baseball" },
            { category: "Electronics", price: 199.99, stocked: true, name: "nexus 7" },
            { category: "Sporting Goods", price: 49.99, stocked: true, name: "football" },
        ]

        function filterTextSearch(row) {
            return row.category.includes(filterText) ||
                row.price.toString().includes(filterText) ||
                row.name.includes(filterText)
        }

        function filterOnlyInStock(row) {
            if (onlyInStock === false) {
                return true
            }
            return row.stocked === onlyInStock
        }

        var filteredArray = []
        array.forEach((row) => {
            if (filterTextSearch(row) && filterOnlyInStock(row)) {
                return filteredArray.push(row)
            }
        })

        if (orderDirection === "asc") {
            filteredArray.sort((a, b) => {
                if (a[order] > b[order]) {
                    return 1
                }
                if (a[order] < b[order]) {
                    return -1
                }
                return 0
            })
        } else if (orderDirection === "desc") {
            filteredArray.sort((a, b) => {
                if (a[order] > b[order]) {
                    return -1
                }
                if (a[order] < b[order]) {
                    return 1
                }
                return 0
            })
        }

        return {
            data: filteredArray.slice((page - 1) * pageSize, page * pageSize),
            count: filteredArray.length
        }
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    let categories = []
    data.data.forEach((row, index) => {
        let exists = false
        categories.forEach((category) => {
            if (category === row.category) {
                exists = true
                return
            }
        })
        if (!exists) {
            categories.push(row.category)
        }
    })

    let rows = []
    categories.forEach((category, index) => {
        rows.push(
            <ProductCategoryRow key={index} category={category} data={data.data} />
        )
    })

    return (
        <Table>
            <GenTableHeader
                order={order}
                orderDirection={orderDirection}
                onOrderChange={val => setOrder(val)}
                onOrderDirectionChange={val => setOrderDirection(val)}
                fields={[{ id: "name", name: "Name" }, { id: "price", name: "Price ($)" }]} />
            <TableBody>
                {rows}
            </TableBody>
            <GenTableFooter
                count={data.count}
                page={page}
                pageSize={pageSize}
                onPageChange={val => setPage(val)}
                onPageSizeChange={val => setPageSize(val)} />
        </Table>
    )
}