import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainDrawer from './Home/components/mainDrawer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { EvaluacionesMain } from './Evaluaciones/evaluacionesMain'
import GestionEvaluaciones from './Evaluaciones/gestionEvaluaciones'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainDrawer />}>
          <Route path="/evaluaciones" element={<EvaluacionesMain />}>
            <Route path=":evaluacionId" element={<GestionEvaluaciones />} />
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
