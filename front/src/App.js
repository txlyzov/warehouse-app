import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/app-router";
import Header from "./ui/components/header/header";
import Footer from "./ui/components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="content">
        <AppRouter />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
