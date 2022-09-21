import { Grid, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { AppContext } from "../../contexts/App"
import { GenModal } from "../generic-modal/GenModal"

export function UserForm(props) {

    const appContext = useContext(AppContext)

    const editingURL = "https://jsonplaceholder.typicode.com/todos/"
    const initialValues = { id: "", title: "", userId: "" }

    const open = props.open
    const setOpen = props.setOpen
    const editingID = props.editingID

    const [alert, setAlert] = useState("")
    const [values, setValues] = useState(initialValues)

    function handleSetFormValues(e) {
        let auxValues = { ...values }
        auxValues[e.target.name] = e.target.value
        setValues(auxValues)
    }

    function onSave() {
        if (!values.id || !values.title || !values.userId) {
            setAlert("ID, Title and UserID must be filled!")
            return
        }
        setOpen(false)
        setValues(initialValues)
        setAlert("")
        appContext.setApp({
            alert: {
                shown: true,
                title: "Nicely done!",
                severity: "success",
                message: "User successfully created"
            }
        })
    }

    return (
        <GenModal
            entityName="User"
            open={open}
            setOpen={setOpen}
            editingURL={editingURL}
            editingID={editingID}
            initialValues={initialValues}
            setValues={setValues}
            alert={alert}
            setAlert={setAlert}
            onSave={onSave}
        >
            <Grid container spacing={2}>

                <Grid item xs={2}>
                    <TextField
                        name="id"
                        variant="outlined"
                        label="ID"
                        type="number"
                        required
                        value={values.id}
                        onChange={handleSetFormValues}
                    ></TextField>
                </Grid>


                <Grid item xs={8}>
                    <TextField
                        name="title"
                        fullWidth
                        variant="outlined"
                        label="Title"
                        type="text"
                        required
                        value={values.title}
                        onChange={handleSetFormValues}>
                    </TextField>
                </Grid>

                <Grid item xs={2}>
                    <TextField
                        name="userId"
                        variant="outlined"
                        label="User"
                        type="number"
                        required
                        value={values.userId}
                        onChange={handleSetFormValues}>
                    </TextField>
                </Grid>

            </Grid>
        </GenModal>
    )
}