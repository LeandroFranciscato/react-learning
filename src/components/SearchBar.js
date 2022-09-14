export function SearchBar(props) {
    return (
        <form>
            <input
                type="text"
                value={props.filterText}
                placeholder="Search"
                onChange={e => props.onFilterTextChange(e.target.value)} />

            <br />

            <input
                type="checkbox"
                checked={props.onlyInStock}
                onChange={e => props.onOnlyInStockChange(e.target.checked)} />
            Only show products in stock
        </form>
    )
}