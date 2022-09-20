import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserTable } from './components/user/UserTable';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserTable />
    </QueryClientProvider>
  );
}

export default App;
