import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainDrawer from './Home/components/mainDrawer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { EvaluacionesMain } from './Evaluaciones/evaluacionesMain'
import GestionEvaluaciones from './Evaluaciones/gestionEvaluaciones'
import NavBar from './Login/containers/navBar'
import Login from './Login/containers/login'
import PersonalMain from './Personal/personalMain'
import { TemplateMain } from './Templates/templateMain'
import Home from './Home/containers/home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/login" element={<NavBar />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/home" element={<MainDrawer />}>
          <Route index element={<Home />}></Route>
          <Route path="templates" element={<TemplateMain />}></Route>
          <Route path="evaluaciones" element={<EvaluacionesMain />}>
            <Route path=":evaluacionId" element={<GestionEvaluaciones />} />
          </Route>
          <Route path="personal" element={<PersonalMain />}>
            <Route path=":personalId" element={<EvaluacionesMain />}>
              <Route path=":evaluacionId" element={<GestionEvaluaciones />} />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here! :(</p>
            </main>
          }
        ></Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
