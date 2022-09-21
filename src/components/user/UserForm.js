import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function UserForm(props) {

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
        console.log(values)
        setAlert("error saving")
    }

    const { isLoading, error } = useQuery(["UserForm", editingID], async () => {
        if (!editingID) {
            setValues(initialValues)
            setAlert("")
            return {}
        }
        const res = await fetch(editingURL + editingID);
        const data = await res.json();

        setValues(data)
        setAlert("")
        return data
    })

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{editingID ? "Edit User" : "Add User"}</DialogTitle>
            <DialogContent>

                {isLoading &&
                    <Grid item xs={12} textAlign="center">
                        <CircularProgress />
                    </Grid>
                }

                {error && "Error: " + error.message}

                {!isLoading && !error &&

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            {alert &&
                                <Alert severity="error" onClose={() => setAlert("")}>
                                    {alert}
                                </Alert>
                            }
                        </Grid>


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
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => onSave()}>Save</Button>
            </DialogActions>
        </Dialog >
    )


}