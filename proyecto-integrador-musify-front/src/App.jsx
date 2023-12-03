import AppMain from './AppMain.jsx';
import { ContextProvider } from './Components/Utils/GlobalContext.jsx';


function App() {




  return (
    <ContextProvider>
      <div>
        <AppMain />
      </div>
    </ContextProvider>
  );
}

export default App;