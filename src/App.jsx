// 🔹 React hooks
import { useEffect, useState } from 'react'

// 🔹 Global styles
import './App.css'

// 🔹 Routing
import { Outlet } from 'react-router-dom'

// 🔹 Redux actions
import { logout, userlogin } from './store/authslice'

// 🔹 Auth service
import { authservice } from './config/auth'

// 🔹 Redux hooks
import { useDispatch, useSelector } from 'react-redux'

// 🔹 Layout components
import Header from './components/Header'
import Footer from './components/Footer'

// 🔹 OAuth service
import { oAuthservice } from './config/Oauth.config'

// 🔹 UI components
import Toaster from './components/Toaster'
import UserForm from './components/UserForm'

// 🔹 Error handling
import { hideError } from './store/errorslice'

// 🔹 Appwrite utility
import { ID } from 'appwrite'

function App() {

  // 🔹 Whether to show profile completion form
  const showCompleteForm = useSelector(state => state.auth.CompleteForm)

  // 🔹 Loader state for initial auth check
  const [loader, setloader] = useState(false)

  // 🔹 Auth status from redux (not used currently)
  const authstatus = useSelector(state => state.auth.authstatus)

  // 🔹 Redux dispatch
  const dispatch = useDispatch()

  // 🔹 Check user session on app load
  useEffect(() => {

    oAuthservice.getUserdata()
      .then(res => {
        if (res) {
          dispatch(userlogin(res))
        }
      })
      .finally(() => {
        setloader(true)
      })

    

  }, [])

  // 🔹 Auto-hide error messages after 3 seconds
  setTimeout(() => {
    dispatch(hideError())
  }, 3000)

  // 🔹 Error state from redux
  const errorsState = useSelector(state => state.error)

  return loader ? (
    <>
      <div className='flex flex-col min-h-screen'>

        {/* 🔹 Header */}
        <Header />

        <main className='grow'>

          {/* 🔹 Error Toasters */}
          {errorsState.error && errorsState?.error?.map(e => {
            const id = ID.unique()

            return <Toaster key={id} message={e} type="error" />
          })}

          {/* 🔹 Profile completion form */}
          {showCompleteForm && <UserForm />}

          {/* 🔹 Empty conditional (no effect) */}
          {
            !showCompleteForm
          }

          {/* 🔹 Routed pages */}
          <Outlet />

        </main>

        {/* 🔹 Footer */}
        <Footer />

      </div>
    </>
  ) : (

    // 🔹 Loader UI
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
      <span className="text-xs tracking-widest uppercase text-gray-400 animate-pulse font-mono">
        Loading…
      </span>
    </div>
  )
}

export default App