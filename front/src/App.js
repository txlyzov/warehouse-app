import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./ui/components/header/Header";
import Footer from "./ui/components/footer/Footer";

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
