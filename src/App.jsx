import { useEffect, useState } from 'react'import './App.css'import { Outlet } from 'react-router-dom'import { userlogin } from './store/authslice'import { useDispatch, useSelector } from 'react-redux'import Header from './components/Header'
import Footer from './components/Footer'import { oAuthservice } from './config/Oauth.config'import Toaster from './components/Toaster'
import UserForm from './components/UserForm'import { hideError } from './store/errorslice'import { ID } from 'appwrite'

function App() {  const showCompleteForm = useSelector(state => state.auth.CompleteForm)  const [loader, setloader] = useState(false)  const dispatch = useDispatch()  useEffect(() => {

    oAuthservice.getUserdata()
      .then(res => {
        if (res) {
          dispatch(userlogin(res))
        }
      })
      .finally(() => {
        setloader(true)
      })

    

  }, [dispatch])  setTimeout(() => {
    dispatch(hideError())
  }, 3000)  const errorsState = useSelector(state => state.error)

  return loader ? (
    <>
      <div className='flex flex-col min-h-screen'>        <Header />

        <main className='grow'>          {errorsState.error && errorsState?.error?.map(e => {
            const id = ID.unique()

            return <Toaster key={id} message={e} type="error" />
          })}          {showCompleteForm && <UserForm />}          {
            !showCompleteForm
          }          <Outlet />

        </main>        <Footer />

      </div>
    </>
  ) : (    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-indigo-500 animate-spin" />
      <span className="text-xs tracking-widest uppercase text-gray-400 animate-pulse font-mono">
        Loading…
      </span>
    </div>
  )
}

export default App