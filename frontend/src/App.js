import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import ProfilePage from "main/pages/ProfilePage";
import AdminUsersPage from "main/pages/AdminUsersPage";

import TodosIndexPage from "main/pages/Todos/TodosIndexPage";
import TodosCreatePage from "main/pages/Todos/TodosCreatePage";
import TodosEditPage from "main/pages/Todos/TodosEditPage";

import DiningCommonsIndexPage from "main/pages/DiningCommons/DiningCommonsIndexPage";
import DiningCommonsCreatePage from "main/pages/DiningCommons/DiningCommonsCreatePage";
import DiningCommonsEditPage from "main/pages/DiningCommons/DiningCommonsEditPage";

import OrganizationsIndexPage from "main/pages/Organizations/OrganizationsIndexPage";
import RecommendationsIndexPage from "main/pages/Recommendations/RecommendationsIndexPage";

import UCSBDatesIndexPage from "main/pages/UCSBDates/UCSBDatesIndexPage";
import UCSBDatesCreatePage from "main/pages/UCSBDates/UCSBDatesCreatePage";
import UCSBDatesEditPage from "main/pages/UCSBDates/UCSBDatesEditPage";

import HelpRequestIndexPage from "main/pages/HelpRequest/HelpRequestIndexPage";
import HelpRequestCreatePage from "main/pages/HelpRequest/HelpRequestCreatePage";

import { hasRole, useCurrentUser } from "main/utils/currentUser";

import "bootstrap/dist/css/bootstrap.css";

import MenuItemReviewsIndexPage from "main/pages/MenuItemReviews/MenuItemReviewsIndexPage";
// import MenuItemReviewsEditPage from "main/pages/MenuItemReviews/MenuItemReviewsEditPage";
import MenuItemReviewsCreatePage from "main/pages/MenuItemReviews/MenuItemReviewsCreatePage";



import ArticlesIndexPage from "main/pages/Articles/ArticlesIndexPage";

function App() {

  const { data: currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        {
          hasRole(currentUser, "ROLE_ADMIN") && <Route exact path="/admin/users" element={<AdminUsersPage />} />
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/todos/list" element={<TodosIndexPage />} />
              <Route exact path="/todos/create" element={<TodosCreatePage />} />
              <Route exact path="/todos/edit/:todoId" element={<TodosEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/diningCommons/list" element={<DiningCommonsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/menuitemreviews/list" element={<MenuItemReviewsIndexPage />} />
             
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              
              <Route exact path="/menuitemreviews/create" element={<MenuItemReviewsCreatePage />} />
              {/* <Route exact path="/menuitemreviews/edit/:id" element={<MenuItemReviewsEditPage />} /> */}
            </>
          )
        }
        
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/diningCommons/create" element={<DiningCommonsCreatePage />} />
              <Route exact path="/diningCommons/edit/:code" element={<DiningCommonsEditPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/ucsbdates/list" element={<UCSBDatesIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_ADMIN") && (
            <>
              <Route exact path="/ucsbdates/create" element={<UCSBDatesCreatePage />} />
              <Route exact path="/ucsbdates/edit/:id" element={<UCSBDatesEditPage />} />
            </>
          )
        }
      {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/organizations/list" element={<OrganizationsIndexPage />} />
            </>
          )
        }
        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/recommendations/list" element={<RecommendationsIndexPage />} />
        
            </>
          )
        }
        {

          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/helpRequest/list" element={<HelpRequestIndexPage />} />
              <Route exact path="/helprequest/create" element={<HelpRequestCreatePage />} />
            </>
          )
        }

        {
          hasRole(currentUser, "ROLE_USER") && (
            <>
              <Route exact path="/articles/list" element={<ArticlesIndexPage />} />
            </>
          )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;
