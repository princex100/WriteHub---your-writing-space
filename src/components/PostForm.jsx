// 🔹 React Hooks
import React, { useEffect } from "react"

// 🔹 Form handling (react-hook-form)
import { useForm } from "react-hook-form"

// 🔹 Ref hook (for RTE)
import { useRef } from "react"

// 🔹 Custom components
import Input from "./Input"
import RTE from "./RTE"
import Toaster from "./Toaster"

// 🔹 Services
import { configService } from "../config/config"

// 🔹 Redux
import { useDispatch, useSelector } from "react-redux"
import { showerr } from "../store/errorslice"

// 🔹 Routing
import { useLocation, useNavigate } from "react-router-dom"

// 🔹 HTML parser
import parser from "html-react-parser"

export default function PostForm() {



  // 🔹 Get route state (used for edit mode)
  const response = useLocation()

  // 🔹 Redux dispatch
  const dispatch = useDispatch()

  // 🔹 React Hook Form setup with default values (edit/create mode)
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,

  } = useForm({
    defaultValues: {
      title: response.state?.post?.title || "",
      slug: response.state?.post?.$id || "",
      featuredImage: response.state?.post?.featuredImage || "",
      content: response.state?.post?.content || "",
      status: response.state?.post?.status || "",
    }
  })

  // 🔹 Function to convert title → slug
  const slugtranform = (title) => {
    if (title && typeof title === "string") {
      return title
        .trim()
        .toLowerCase()
        .replace(/[/|\s\\]+/g, '-')
    }
    return ""
  }
const ref=useRef()
  // 🔹 Watch title changes and auto-update slug
  useEffect(() => {

    const subscription = watch((value, { name }) => {

      if (name === "title") {
        setValue("slug", slugtranform(value.title))
      }
    })

    // 🔹 Cleanup subscription
    return () => subscription.unsubscribe()

  }, [watch, setValue])

  // 🔹 Navigation hook
  const navigate = useNavigate()

  // 🔹 Get user data from redux
  const userdata = useSelector(state => state.auth.userdata)

  // 🔹 Parse HTML content for RTE default value
  const content = parser(getValues("content") || "")

  // 🔹 Form submit handler (handles both create & update)
  const submit = async (data) => {

    // 🔹 EDIT MODE
    if (response.state) {
      try {

        // 🔹 Step 1: Upload new file
        const uploadfile = await configService.uploadFile(data.featuredImage?.[0])

        if (uploadfile) {

          // 🔹 Step 2: Update existing post
          const savepost = await configService.updaterow({
            slug: response.state?.post?.$id,
            title: data.title,
            status: data.status,
            content: data.content,
            featuredImage: uploadfile.$id,
          })

          if (savepost) {

            // 🔹 Step 3: Delete old file
            await configService.deleteFile(response.state?.post?.featuredImage)

            // 🔹 Redirect to home
            navigate("/")
          }
        }

      } catch {

        // 🔹 Error handling
        dispatch(showerr("all fields are required!"))
        return
      }
    }

    // 🔹 CREATE MODE
    else {
      try {

        // 🔹 Upload file
        const uploadfile = await configService.uploadFile(data.featuredImage?.[0])

        if (uploadfile) {

          // 🔹 Create new post
          const savepost = await configService.createRow({
            title: data.title,
            slug: data.slug,
            status: data.status,
            content: data.content,
            featuredImage: uploadfile.$id,
            userId: userdata?.$id,
          })

          if (savepost) {
            // 🔹 Redirect after success
            navigate("/")
          }
        }

      } catch {

        // 🔹 Error handling
        dispatch(showerr("all fields are required!"))
        return
      }
    }
  }

  return (
    <>
      {/* 🔹 Main Form */}
      <form
        onSubmit={handleSubmit(submit)}
        action=""
        className="w-full mx-auto p-6"
        style={{
          background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
        }}
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* 🔹 LEFT SIDE (Title, Slug, Content) */}
          <div className="md:col-span-2 space-y-6">

            {/* 🔹 Title Input */}
            <Input
              name="title"
              type='text'
              placeholder="enter title"
              label="title"
              {...register("title", { required: "title is required!" })}
              defaultValue={getValues("title")}
            />

            {/* 🔹 Slug Input */}
            <Input
              name="slug"
              type='text'
              placeholder="enter slug"
              label="slug"
              {...register("slug", { required: true })}
            />

            {/* 🔹 Rich Text Editor */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <RTE control={control} ref={ref} name="content" defaultValue={content} />
            </div>

          </div>

          {/* 🔹 RIGHT SIDE (Image + Status + Submit) */}
          <div className="space-y-6">

            {/* 🔹 Featured Image Upload */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Input
                type='file'
                {...register("featuredImage", { required: "image is required!" })}
                label="Featured Image"
              />
            </div>

            {/* 🔹 Status Dropdown */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <label className="block mb-2 font-medium text-gray-700">
                Status
              </label>
              <select
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("status", { required: "status is required!" })}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>

            {/* 🔹 Submit Button */}
            <div className="p-4 rounded-lg shadow-sm">
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                🚀 Save Post
              </button>
            </div>

          </div>

        </div>

      </form>
    </>
  )
}