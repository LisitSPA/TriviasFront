import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
// * components
import {Language} from "./pages/Language/Language";
import VideoPreview from "./pages/VideoPreview/VideoPreview";
import FirstSteps from "./pages/FirstSteps/FirstSteps";
import CreateProfile from "./pages/CreateProfile/CreateProfile";

// * translates
// * Esp
import firstStepsEsp from "./translations/esp/firstSteps.json";
import startVideoEsp from "./translations/esp/startVideo.json";
import createProfileEsp from "./translations/esp/createProfile.json";
import homeEsp from "./translations/esp/home.json";
import navbarEsp from "./translations/esp/navbar.json";
import rewardEsp from "./translations/esp/reward.json";
import editProfileEsp from "./translations/esp/editProfile.json";
import footerEsp from "./translations/esp/footer.json";
import rulesEsp from "./translations/esp/rules.json";
// * Eng
import firstStepsEng from "./translations/eng/firstSteps.json";
import startVideoEng from "./translations/eng/startVideo.json";
import createProfileEng from "./translations/eng/createProfile.json";
import homeEng from "./translations/por/home.json";
import navbarEng from "./translations/esp/navbar.json";
import rewardEng from "./translations/eng/reward.json";
import editProfileEng from "./translations/eng/editProfile.json";
import footerEng from "./translations/eng/footer.json";
import rulesEng from "./translations/eng/rules.json";
// * Por
import firstStepsPor from "./translations/por/firstSteps.json";
import startVideoPor from "./translations/por/startVideo.json";
import createProfilePor from "./translations/por/createProfile.json";
import homePor from "./translations/por/home.json";
import navbarPor from "./translations/esp/navbar.json";
import rewardPor from "./translations/por/reward.json";
import editProfilePor from "./translations/por/editProfile.json";
import footerPor from "./translations/por/footer.json";
import rulesPor from "./translations/por/rules.json";
// * styles
import "./global.css";
import Home from "./pages/Home/Home";
import Worlds from "./pages/Worlds/Worlds";
import Rewards from "./pages/Rewards/Rewards";
import EditProfile from "./pages/EditProfile/EditProfile";
import Trivias from "./pages/Trivias/Trivias";
import Questions from "./pages/Questions/Questions";
import Admin from "./pages/Admin/Admin";
import Rules from "./pages/Rules/Rules";

// * Translation
i18next.init({
  interpolation: {escapeValue: false},
  lng: "es",
  resources: {
    esp: {
      first_steps: firstStepsEsp,
      start_video: startVideoEsp,
      create_profile: createProfileEsp,
      home: homeEsp,
      navbar: navbarEsp,
      reward: rewardEsp,
      edit_profile: editProfileEsp,
      footer: footerEsp,
      rules: rulesEsp,
    },
    por: {
      first_steps: firstStepsPor,
      start_video: startVideoPor,
      create_profile: createProfilePor,
      home: homePor,
      navbar: navbarPor,
      reward: rewardPor,
      edit_profile: editProfilePor,
      footer: footerPor,
      rules: rulesPor,
    },
    eng: {
      first_steps: firstStepsEng,
      start_video: startVideoEng,
      create_profile: createProfileEng,
      home: homeEng,
      navbar: navbarEng,
      reward: rewardEng,
      edit_profile: editProfileEng,
      footer: footerEng,
      rules: rulesEng,
    },
  },
});

if (localStorage.getItem("language")) {
  i18next.changeLanguage(String(localStorage.getItem("language")));
}

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Language/>}/>
          <Route path="admin/*" element={<Admin/>}/>
          <Route path="primeros_pasos" element={<FirstSteps/>}/>
          <Route path="video_inicio" element={<VideoPreview/>}/>
          <Route path="crear_perfil" element={<CreateProfile/>}/>
          <Route path="inicio" element={<Home/>}/>
          <Route path="mundos" element={<Worlds/>}/>
          <Route path="mundos/:idMundo/trivias" element={<Trivias/>}/>
          <Route
            path="mundos/:idMundos/trivias/:idTrivias/preguntas"
            element={<Questions/>}
          />
          <Route path="premios" element={<Rewards/>}/>
          <Route path="editar_perfil" element={<EditProfile/>}/>
          <Route path="reglas" element={<Rules/>}/>
          <Route path="*" element={<Language/>}/>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
