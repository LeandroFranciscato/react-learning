
import { useQuery } from "@tanstack/react-query";
import { ProductCategoryRow } from "./ProductCategoryRow";
import { GenTable } from "./generic-table/GenTable";


export function ProductTable(props) {

    const filterText = props.filterText
    const onlyInStock = props.onlyInStock

    function useRequestData(order, orderDirection, page, pageSize) {
        return useQuery(['useProductData', filterText, onlyInStock, order, orderDirection, page, pageSize], () => {

            console.log('fez a request')

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
    }

    function prepareData(data) {
        let rows = []
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

        categories.forEach((category, index) => {
            rows.push(
                <ProductCategoryRow key={index} category={category} data={data.data} />
            )
        })
        return rows
    }

    return (
        <GenTable
            headerFields={[{ id: "name", name: "Name" }, { id: "price", name: "Price ($)" }]}
            useRequestData={useRequestData}
            prepareData={prepareData}
        />
    )
}
