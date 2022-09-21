import { Grid, TextField } from "@mui/material"
import { useContext, useState } from "react"
import { AppContext } from "../../contexts/App"
import { CUModal } from "../generic-modal/CUModal"

export function UserForm(props) {

    const { open, setOpen, editingID } = props

    const appContext = useContext(AppContext)

    const editingURL = "https://jsonplaceholder.typicode.com/todos/"
    const initialValues = { id: "", title: "", userId: "" }

    const [alert, setAlert] = useState("")
    const [values, setValues] = useState(initialValues)

    function handleSetFormValues(e) {
        let auxValues = { ...values }
        auxValues[e.target.name] = e.target.value
        setValues(auxValues)
    }

    function onSave() {
        if (!values.id || !values.title || !values.userId) {
            setAlert("User successfully created, Title and UserID must be filled!")
            return
        }

        setOpen(false)
        setValues(initialValues)
        setAlert("")

        let message = "User successfully created"
        if (editingID) {
            message = "User successfully edited"
        }
        appContext.setApp({
            alert: {
                shown: true,
                severity: "success",
                message: message
            }
        })
    }

    return (
        <CUModal
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
        </CUModal>
    )
}