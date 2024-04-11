import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import "../src/Component/Modal/Modal.css";
import Home from "../src/View/Home/Index";
import Login from "./Athentication/Login";

import MainLayout from "./Layout/MainLayout";
import PrivateRouter from "./privateRouter/PrivateRouter";
import AddAdvocacyCategory from "./Pages/AdvocacyCategory/AddCategory";
import { Toaster } from "react-hot-toast";
import AddAdvocacy from "./Pages/Advocacy/AddAdvocacy";
import ManageAdvocacy from "./Pages/Advocacy/ManageAdvocacy";
import AddCheckList from "./Pages/Onboarding/AddCheckListDay";
import CheckList from "./Pages/Onboarding/CheckList";
import ManageCheckList from "./Pages/Onboarding/ManageCheckList";
import AddSurveyName from "./Pages/Survey/AddSurveyName";
import AddSurvey from "./Pages/Survey/AddSurvey";
import ManageSurvey from "./Pages/Survey/ManageSurvey";
import CoverImage from "./Pages/CoverImage/CoverImage";
import HrData from "./Pages/Copmany_Admin_Data.js/HrData";
import ManagerData from "./Pages/Copmany_Admin_Data.js/ManagerData";
import Employee from "./Pages/Copmany_Admin_Data.js/Employee";
import AddManager from "./Pages/Copmany_Admin_Data.js/Add-Categories/AddManager";
import AddEmployee from "./Pages/Copmany_Admin_Data.js/Add-Categories/AddEmployee";
import AddHr from "./Pages/Copmany_Admin_Data.js/Add-Categories/AddHr";
import Reward from "./Pages/Reward/Reward";
import ManageReward from "./Pages/Reward/ManageReward";
import AddEvent from "./Pages/Event/AddEvent";
import ManageEvent from "./Pages/Event/ManageEvent";
import AddLink from "./Pages/Link/AddLink";
import ManageLink from "./Pages/Link/ManageLink";
import AddTheme from "./Pages/Theme/AddTheme";
import ManageTheme from "./Pages/Theme/ManageTheme";
import AddDepartment from "./Pages/Copmany_Admin_Data.js/Add-Categories/AddDepartment";
import AddBadge from "./Pages/Badge/AddBadge";
import ManagePosts from "./Pages/Posts/ManagePosts";
import RewardCardTheme from "./Pages/Reward Card theme color/RewardCardTheme";
import ViewCardDetails from "./Pages/Reward Card theme color/ViewCardDetails";
import AddInitiave from "./Pages/Initiave/AddInitiave";
import AddInitiaveType from "./Pages/Initiave/AddInitiave";
import AddInitiativeData from "./Pages/Initiave/AddInitiativeData";
import AddTopic from "./Pages/Chatbot/AddTopic";
import AddSubtopic from "./Pages/Chatbot/AddSubtopic";
import SubSubTopics from "./Pages/Chatbot/SubSubTopics";
import ViewInitiativeData from "./Pages/Initiave/ViewInitiativeData";
import UserNotificaton from "./Pages/Notification/Notificaton";
import About from "./Pages/Information/About";
import AddJob from "./Pages/Job/AddJob";
import ViewJob from "./Pages/Job/ViewJob";
import EditJob from "./Pages/Job/EditJob";
import Managerjobfirst from "./Pages/Approved job form/AddJobPost";
import HrJobPost from "./Pages/Approved job form/HrJobPost";
import StaticData from "./Pages/StaticData/StaticData";
import Analys from "./Pages/StaticData/Analys";
import ClaimingPoint from "./Pages/ClamingPoint/ClaimingPoint";
import TrainingCreatePage from "./Training/TrainingCreatePage";
import ViewAllTraining from "./Training/ViewAllTraining";
import AddServiceCategory from "./NewPages/ServiceCategory/AddServiceCategory";
import AddServiceSubCategory from "./NewPages/ServiceSubCategory/AddServiceSubCategory";
import AddService from "./NewPages/Service/AddService";
import AddServiceProduct from "./NewPages/ServiceProduct/AddServiceProduct";
import AddServiceEmployee from "./NewPages/ServiceEmployee/AddServiceEmployee";
import AddAdminSubscription from "./NewPages/AdminSubscription/AddAdminSubscription";
import AddStock from "./NewPages/Stock/AddStock";
import AddStockHistory from "./NewPages/StockHistory/AddStockHistory";
import AddInventory from "./NewPages/Inventory/AddInventory";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />

            


              <Route
                path="/add-advocy-category"
                element={<AddAdvocacyCategory />}
              />
              <Route path="/add-advocy" element={<AddAdvocacy />} />
              <Route path="/manage-advocy" element={<ManageAdvocacy />} />

              {/* Onboarding */}
              <Route path="/add-checklist-day" element={<AddCheckList />} />
              <Route path="/add-checklist" element={<CheckList />} />
              <Route path="/manage-checklist" element={<ManageCheckList />} />
              {/* Survey */}
              <Route path="/add-survey-name" element={<AddSurveyName />} />
              <Route path="/add-survey" element={<AddSurvey />} />
              <Route path="/manage-survey" element={<ManageSurvey />} />
              {/* Cover Image */}
              <Route path="/cover-image" element={<CoverImage />} />

              {/* Company Admin Data */}
              {/* View Data */}
              <Route path="/hr-data" element={<HrData />} />
              <Route path="/manager-data" element={<ManagerData />} />
              <Route path="/employee-data" element={<Employee />} />
              {/* Add Data */}
              <Route path="/add-manager" element={<AddManager />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/add-hr" element={<AddHr />} />
              <Route path="/add-department" element={<AddDepartment />} />
              {/* Add reward and manage reward */}
              <Route path="/add-reward" element={<Reward />} />
              <Route path="/manage-reward" element={<ManageReward />} />
              {/* Add Event and manage  */}
              <Route path="/add-event" element={<AddEvent />} />
              <Route path="/manage-event" element={<ManageEvent />} />
              {/* Add Link and manage  */}
              <Route path="/add-link" element={<AddLink />} />
              <Route path="/manage-link" element={<ManageLink />} />
              {/* Theme */}
              <Route path="/add-theme" element={<AddTheme />} />
              <Route path="/manage-theme" element={<ManageTheme />} />
              {/* Badge */}
              <Route path="/add-badges" element={<AddBadge />} />
              {/* Posts */}
              <Route path="/manage-post" element={<ManagePosts />} />
              {/* Card theme color */}
              <Route path="/add-reward-card" element={<RewardCardTheme />} />
              <Route path="/view-reward-card" element={<ViewCardDetails />} />
              {/* Inititave */}
              {/* type */}
              <Route path="/add-initiative" element={<AddInitiaveType />} />
              {/* Data */}
              <Route
                path="/add-initiative-data"
                element={<AddInitiativeData />}
              />
              <Route
                path="/view-initiative-data"
                element={<ViewInitiativeData />}
              />

              {/* chatbot */}
              <Route path="/add-topic" element={<AddTopic />} />
              <Route path="/add-subtopic" element={<AddSubtopic />} />
              <Route path="/add-sub-subtopic" element={<SubSubTopics />} />

              <Route
                path="/view-initiative-data"
                element={<ViewInitiativeData />}
              />

              {/* Notification */}
              <Route path="/notification" element={<UserNotificaton />} />
              {/* Information */}
              <Route path="/information" element={<About />} />
              {/* JOB Description section */}
              <Route path="/add-job" element={<AddJob />} />
              <Route path="/view-job" element={<ViewJob />} />
              <Route path="/edit-job" element={<EditJob />} />
              {/* Add new job */}
              <Route path="/view-job-request" element={<Managerjobfirst />} />
              <Route path="/view-job-request-by-hr" element={<HrJobPost />} />
              {/* Static Data */}
              <Route path="/analys-data" element={<Analys />} />

              {/* claiming point */}
              <Route path="/claiming-point" element={<ClaimingPoint />} />

              {/* Training Routes */}
              <Route path="/add-training" element={<TrainingCreatePage />} />
              <Route path="/view-all-training" element={<ViewAllTraining />} />

{/* //--------------------------------------------->   Salon       <--------------------------------------------------------------------------- */}




              <Route path="/add-service-category" element={<AddServiceCategory/>} />
              <Route path="/add-service-sub-category" element={<AddServiceSubCategory/>} />
              <Route path="/add-service" element={<AddService/>} />
              <Route path="/add-service-product" element={<AddServiceProduct/>} />
              <Route path="/add-service-employee" element={<AddServiceEmployee/>} />
              <Route path="/add-admin-subscription" element={<AddAdminSubscription/>} />
              <Route path="/stock" element={<AddStock/>} />
              <Route path="/stock-history" element={<AddStockHistory/>} />
              <Route path="/add-inventory" element={<AddInventory/>} />


            </Route>

            
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
