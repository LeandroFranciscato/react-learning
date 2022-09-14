import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductTableHeader } from "./ProductTableHeader";

export function ProductTable(props) {

    const [order, setOrder] = useState("name")
    const [orderDirection, setOrderDirection] = useState("asc")

    const { isLoading, error, data } = useQuery(['useProductData', props.filterText, props.onlyInStock, order, orderDirection], () => {

        const filterText = props.filterText
        const onlyInStock = props.onlyInStock

        var array = [
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

        return filteredArray
    })

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    let categories = []
    data.forEach((row, index) => {
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
            <ProductCategoryRow key={index} category={category} data={data} />
        )
    })

    return (
        <table>
            <thead>
                <ProductTableHeader
                    order={order}
                    orderDirection={orderDirection}
                    onOrderChange={val => setOrder(val)}
                    onOrderDirectionChange={val => setOrderDirection(val)} />
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}