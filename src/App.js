import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';
import { FilterableProductTable } from './components/FilterableProductTable';

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FilterableProductTable />
    </QueryClientProvider>
  );
}

export default App;
