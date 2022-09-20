
import { FormGroup, TextField } from "@mui/material";

export function SearchBar(props) {

    const filterText = props.filterText
    const onFilterTextChange = props.onFilterTextChange

    return (
        <FormGroup>
            <TextField
                id="search_bar"
                label="Search"
                variant="outlined"
                value={filterText}
                onChange={e => onFilterTextChange(e.target.value)}
                autoComplete="false" />
        </FormGroup>
    )
}