import { Container } from "@mui/material";
import { useState } from "react";
import { UserTable } from "./UserTable";
import { SearchBar } from "../search-bar/SearchBar";

export function FilterableUserTable() {

    const [filterText, setFilterText] = useState("")

    return (
        <Container>
            <SearchBar
                filterText={filterText}
                onFilterTextChange={val => setFilterText(val)} />

            <UserTable
                filterText={filterText} />
        </Container>
    )
}


