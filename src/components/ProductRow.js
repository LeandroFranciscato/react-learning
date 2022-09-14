export function ProductRow(props) {
    const stocked = props.stocked
    const price = props.price
    const name = stocked ?
        props.name :
        <span style={{ color: 'red' }}> {props.name} </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
        </tr >
    )
}