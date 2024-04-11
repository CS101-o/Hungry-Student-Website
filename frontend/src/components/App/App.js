import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from '../../pages/MainPage/MainPage';
import RecipePage from '../../pages/RecipePage/RecipePage';
import UploadPage from '../../pages/UploadPage/UploadPage';
import Layout from '../../pages/Layout';
import './App.css';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<MainPage />} />
                            <Route path="recipe/:id" element={<RecipePage />} />
                            <Route path="upload" element={<UploadPage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="register" element={<RegisterPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
