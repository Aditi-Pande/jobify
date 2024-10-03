import { toast } from "react-toastify"
import customFetch from "../utils/customFetch"
import { redirect } from "react-router-dom"

export const action = async({params}) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success('Job delleted successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs')
}

const DeleteJob = () => {
  return <h1>Delete job</h1>
}

export default DeleteJob
