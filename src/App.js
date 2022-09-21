import { Alert, AlertTitle, CircularProgress, Grid } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { UserTable } from './components/user/UserTable';
import { AppContext, appContextValues } from './contexts/App';

const queryClient = new QueryClient()

function App() {

  const [app, setApp] = useState(appContextValues)

  function handleChangeAppContext(obj) {
    let auxValues = { ...app, ...obj }
    setApp(auxValues)
  }

  const values = { app: app, setApp: handleChangeAppContext }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={values}>

        {app.alert.shown &&
          <Alert
            onClose={() => handleChangeAppContext({ alert: { shown: false } })}
            severity={app.alert.severity}>
            {app.alert.title &&
              <AlertTitle>{app.alert.title}</AlertTitle>
            }
            {app.alert.message}
          </Alert>
        }

        {app.loading.status &&
          <Grid item xs={12} textAlign="center">
            <CircularProgress />
          </Grid>
        }

        <UserTable />
      </AppContext.Provider>
    </QueryClientProvider >
  );
}

export default App;
