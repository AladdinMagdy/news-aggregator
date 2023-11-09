import './App.css';

import SearchScreen from './screens/search-page'
import { SearchDialogProvider } from './contexts/search-dialog'
function App() {
  return (
    <div className="App">
      <SearchDialogProvider>
        <SearchScreen />
      </SearchDialogProvider>
    </div>
  );
}

export default App;
