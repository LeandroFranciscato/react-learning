export function ProductRow(props) {
    const name = props.stocked ?
        props.name :
        <span style={{ color: 'red' }}> {props.name} </span>;
    return (

        <tr>
            <td>{name}</td>
            <td>{props.price}</td>
        </tr >
    )
}