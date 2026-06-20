import React, { useEffect } from "react"import { useForm } from "react-hook-form"import { useRef } from "react"import Input from "./Input"
import RTE from "./RTE"
import Toaster from "./Toaster"import { configService } from "../config/config"import { useDispatch, useSelector } from "react-redux"
import { showerr } from "../store/errorslice"import { useLocation, useNavigate } from "react-router-dom"import parser from "html-react-parser"

export default function PostForm() {  const response = useLocation()  const dispatch = useDispatch()  const {
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
  })  const slugtranform = (title) => {
    if (title && typeof title === "string") {
      return title
        .trim()
        .toLowerCase()
        .replace(/[/|\s\\]+/g, '-')
    }
    return ""
  }
const ref=useRef()  useEffect(() => {

    const subscription = watch((value, { name }) => {

      if (name === "title") {
        setValue("slug", slugtranform(value.title))
      }
    })    return () => subscription.unsubscribe()

  }, [watch, setValue])  const navigate = useNavigate()  const userdata = useSelector(state => state.auth.userdata)  const content = parser(getValues("content") || "")  const submit = async (data) => {    if (response.state) {
      try {        const uploadfile = await configService.uploadFile(data.featuredImage?.[0])

        if (uploadfile) {          const savepost = await configService.updaterow({
            slug: response.state?.post?.$id,
            title: data.title,
            status: data.status,
            content: data.content,
            featuredImage: uploadfile.$id,
          })

          if (savepost) {            await configService.deleteFile(response.state?.post?.featuredImage)            navigate("/")
          }
        }

      } catch {        dispatch(showerr("all fields are required!"))
        return
      }
    }    else {
      try {        const uploadfile = await configService.uploadFile(data.featuredImage?.[0])

        if (uploadfile) {          const savepost = await configService.createRow({
            title: data.title,
            slug: data.slug,
            status: data.status,
            content: data.content,
            featuredImage: uploadfile.$id,
            userId: userdata?.$id,
          })

          if (savepost) {            navigate("/")
          }
        }

      } catch {        dispatch(showerr("all fields are required!"))
        return
      }
    }
  }

  return (
    <>      <form
        onSubmit={handleSubmit(submit)}
        action=""
        className="w-full mx-auto p-6"
        style={{
          background: "linear-gradient(135deg, #f0eef6 0%, #fde8d8 25%, #f9c8d4 50%, #f0a0c0 75%, #d4609a 100%)",
        }}
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">          <div className="md:col-span-2 space-y-6">            <Input
              name="title"
              type='text'
              placeholder="enter title"
              label="title"
              {...register("title", { required: "title is required!" })}
              defaultValue={getValues("title")}
            />            <Input
              name="slug"
              type='text'
              placeholder="enter slug"
              label="slug"
              {...register("slug", { required: true })}
            />            <div className="bg-white p-4 rounded-lg shadow-sm">
              <RTE control={control} ref={ref} name="content" defaultValue={content} />
            </div>

          </div>          <div className="space-y-6">            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Input
                type='file'
                {...register("featuredImage", { required: "image is required!" })}
                label="Featured Image"
              />
            </div>            <div className="bg-white p-4 rounded-lg shadow-sm">
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
            </div>            <div className="p-4 rounded-lg shadow-sm">
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