import { TableCell, TableRow } from "@mui/material";

export function ProductRow(props) {
    const stocked = props.stocked
    const price = props.price
    const name = stocked ?
        props.name :
        <span style={{ color: 'red' }}> {props.name} </span>;

    return (
        <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{price}</TableCell>
        </TableRow>
    )
}