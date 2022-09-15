import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/app-router";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <AppRouter />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
