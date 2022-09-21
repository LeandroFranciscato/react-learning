import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import { useState } from "react"

export function UserForm(props) {

    const open = props.open
    const setOpen = props.setOpen

    const [error, setError] = useState("")
    const [values, setValues] = useState({ id: "", name: "", userId: "" })

    function handleSetFormValues(e) {
        let auxValues = { ...values }
        auxValues[e.target.name] = e.target.value
        setValues(auxValues)
    }

    function onSaveBtnClicked() {
        console.log(values)
        setError("error saving")
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>New User</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        {error &&
                            <Alert severity="error" onClose={() => setError("")}>
                                {error}
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
                            name="name"
                            fullWidth
                            variant="outlined"
                            label="Name"
                            type="text"
                            required
                            value={values.name}
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

            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => onSaveBtnClicked()}>Save</Button>
            </DialogActions>
        </Dialog>
    )


}