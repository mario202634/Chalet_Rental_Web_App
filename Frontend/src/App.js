import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './store/AuthProvider';

import AddProductPage from './pages/AddProductPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import Layout from './UI/layout/Layout';
import ProdutPage from './pages/ProdutPage';
import EditUserPage from './pages/EditUserPage';
import AdminEditUserPage from './pages/AdminEditUserPage';
import EditRentalPage from './pages/EditRentalPage';
import EditChaletPage from './pages/EditChaletPage';
import UsersPage from './pages/UsersPage';


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chalets" element={<ProductsPage />} />
            <Route path="/chalets/:chaletId" element={<ProdutPage />} />
            <Route path="/chalets/add" element={<AddProductPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/editUser" element={<EditUserPage />} />
            <Route path="/editRental" element={<EditRentalPage />} />
            <Route path="/editChalet" element={<EditChaletPage />} />
            {/* Admin Routes */}
            <Route path="/admin/Users" element={<UsersPage />} />
            <Route path="admin/edituser/:userId" element={<AdminEditUserPage />} />
            <Route path="admin/Users" element={<UsersPage />} />
            
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
