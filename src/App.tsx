import { BrowserRouter } from "react-router-dom"
import { Router } from "./Routes/Routes"
import { ToastContainer } from "react-toastify"
import { AppProvider } from "./contexts"



function App() {

  return (

    <BrowserRouter>
      <AppProvider>
        <ToastContainer />
        <main className="overflow-hidden">
          <Router />
        </main>
      </AppProvider>
    </BrowserRouter>

  )
}

export default App
