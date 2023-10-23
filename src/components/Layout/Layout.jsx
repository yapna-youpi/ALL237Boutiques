import React, { useEffect,useState} from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "../header/lang/ressources/lang";
import boutiques from "../../assets/data/boutique";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Routers from "../../routers/Routers";

const Layout = () => {
  const [language, setlanguage] = useState({});
  
    // let language = JSON.parse(localStorage.getItem("lang")) || {
  //   lang: "fr",
  //   flag: 1,
  // };
  i18n.use(initReactI18next).init({
    resources,
    lng: language.lang,
    fallbackLng: language.lang,
    interpolation: { escapeValue: false },
  });

  useEffect(() => {
    let actuel_lang = navigator.language.substr(0, 2).toUpperCase();
    if (actuel_lang == "FR") {
      setlanguage({ lang: "fr", flag: 1 });
    } else if (actuel_lang == "EN") {
      setlanguage({ lang: "en", flag: 2 });
    }
    console.log(actuel_lang,"la langue")
  }, []);
  console.log(language,"le comp lang")


  return (
    <>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
