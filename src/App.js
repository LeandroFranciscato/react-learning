import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterableUserTable } from './components/user/FilterableUserTable';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FilterableUserTable />
    </QueryClientProvider>
  );
}

export default App;
