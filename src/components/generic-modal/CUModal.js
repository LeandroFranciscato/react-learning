import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

export function CUModal(props) {

    const {
        entityName,
        open,
        setOpen,
        editingURL,
        editingID,
        initialValues,
        setValues,
        alert,
        setAlert,
        onSave
    } = props

    const { isLoading, error } = useQuery(["GenModal", editingURL, editingID], async () => {
        if (!editingID) {
            setValues(initialValues)
            setAlert("")
            return {}
        }

        setAlert("")
        const res = await fetch(editingURL + editingID);
        const data = await res.json();

        setValues(data)
        return data
    })

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{editingID ? "Edit " + entityName : "Add " + entityName}</DialogTitle>
            <DialogContent>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    {alert &&
                        <Alert severity="error" onClose={() => setAlert("")}>
                            {alert}
                        </Alert>
                    }
                </Grid>

                {isLoading &&
                    <Grid item xs={12} textAlign="center">
                        <CircularProgress />
                    </Grid>
                }

                {error && "Error: " + error.message}

                {!isLoading && !error && props.children}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => onSave()}>Save</Button>
            </DialogActions>
        </Dialog >
    )
}