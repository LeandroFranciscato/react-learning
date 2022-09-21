import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function UserForm(props) {

    const formInitialValues = { id: "", title: "", userId: "" }

    const open = props.open
    const setOpen = props.setOpen
    const formFillUrl = props.formFillUrl

    const [alert, setAlert] = useState("")
    const [values, setValues] = useState(formInitialValues)

    function handleSetFormValues(e) {
        let auxValues = { ...values }
        auxValues[e.target.name] = e.target.value
        setValues(auxValues)
    }

    function onSaveBtnClicked() {
        console.log(values)
        setAlert("error saving")
    }

    const { isLoading, error } = useQuery(["UserForm", formFillUrl], async () => {
        if (!formFillUrl) {
            setValues(formInitialValues)
            setAlert("")
            return {}
        }
        const res = await fetch(formFillUrl);
        const data = await res.json();

        setAlert("")
        setValues(data)
        return data
    })

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{formFillUrl ? "Edit User" : "Add User"}</DialogTitle>
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
                <Button onClick={() => onSaveBtnClicked()}>Save</Button>
            </DialogActions>
        </Dialog >
    )


}