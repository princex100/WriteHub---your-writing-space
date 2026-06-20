import React, { useEffect, useState } from 'react'import { useDispatch, useSelector } from 'react-redux'
import { hideCompleteForm } from '../store/authslice.js'import { useForm } from 'react-hook-form'import { configService } from '../config/config.js'import { useNavigate } from 'react-router-dom'import { showerr } from '../store/errorslice.js'

function UserForm() {  const dispatch = useDispatch()  const hideform = () => {
    dispatch(hideCompleteForm())
  }  const [userr, setuser] = useState({})  const navigate = useNavigate()  const userdata = useSelector(state => state.auth.userdata)  const submit = async (data) => {
    try {      const user = {}      if (data.email !== "") user.email = data.email
      if (data.phone !== "") user.phone = data.phone
      if (data.username !== "") user.username = data.username
      if (data.fullname !== "") user.fullname = data.fullname
      if (data.age !== "") user.age = data.age
      if (data.bio !== "") user.bio = data.bio
      if (data.gender !== "") user.gender = data.gender      user.userId = userdata.$id      const res = await configService.updateuserInfo(user)      if (res) {
        dispatch(hideCompleteForm())
        navigate("profile")
      }

    } catch {      dispatch(showerr("user didn't update.Try agiain."))
    }
  }  useEffect(() => {
    const getuser = async () => {
      try {        const user = await configService.getUserInfo(userdata.$id)

        const obj = {}        if (user.rows[0].email !== "") obj.email = user.rows[0].email
        if (user.rows[0].phone !== "") obj.phone = user.rows[0].phone
        if (user.rows[0].username !== "") obj.username = user.rows[0].username
        if (user.rows[0].fullname !== "") obj.fullname = user.rows[0].fullname
        if (user.rows[0].age !== "") obj.age = user.rows[0].age
        if (user.rows[0].bio !== "") obj.bio = user.rows[0].bio
        if (user.rows[0].gender !== "") obj.gender = user.rows[0].gender        setuser(obj)

      } catch {        throw new Error("user couldn't be fetched.")
      }
    }

    getuser()

  }, [userdata.$id])  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: userr.email || "",
      phone: userr.phone || "",
      fullname: userr.fullname || "",
      username: userr.username || "",
      age: userr.age || "",
      bio: userr.bio || "",
    }
  })

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90%] max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 relative">        <button
          onClick={hideform}
          className="absolute top-3 right-3 text-white text-lg hover:text-gray-300"
        >
          ✕
        </button>        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Update Profile
        </h2>        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-4"
        >          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Full Name</label>
            <input
              {...register("fullname", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Username</label>
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="Enter username"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Age</label>
            <input
              {...register("age", { required: true })}
              type="number"
              placeholder="Enter age"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Gender</label>
            <select
              {...register("gender", { required: true })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-white/40"
            >
              <option value="">Select gender</option>
              <option value="male" className="text-black">Male</option>
              <option value="female" className="text-black">Female</option>
              <option value="other" className="text-black">Other</option>
            </select>
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Phone</label>
            <input
              {...register("phone", { required: true })}
              type="tel"
              placeholder="Enter phone"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40"
            />
          </div>          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-200">Bio</label>
            <textarea
              {...register("bio", { required: true })}
              rows="3"
              placeholder="Tell something about yourself..."
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-white/40 resize-none"
            />
          </div>          <button
            type="submit"
            className="mt-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
          >
            Update User
          </button>

        </form>
      </div>
    </div>
  )
}

export default UserForm