import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import AppRouter from "./router/AppRouter";
import Header from "./ui/components/header/Header";
import Footer from "./ui/components/footer/Footer";
import Modal from "./ui/components/modal/modal";
import { selectModalContent } from "./redux-store/modal/ModalSlice";

function App() {
  const modalContent = useSelector(selectModalContent);

  return (
    <BrowserRouter>
      <Header />
      <div id="content">
        <AppRouter />
      </div>
      <Footer />

      <Modal active={!!modalContent}>{modalContent}</Modal>
    </BrowserRouter>
  );
}

export default App;
