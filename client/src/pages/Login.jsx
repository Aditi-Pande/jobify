import { Link, Form, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async({request}) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successfull');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
  return null
}

const login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async() => {
    const data = {
      email: "test@test.com",
      password: "secret123"
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Test the application');
      navigate('/dashboard')
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  }

  return (
    <Wrapper>
      <Form method="post" className='form'>
        <Logo/>
        <h4>Login</h4>

        <FormRow type = "email" name = "email"/>
        <FormRow type = "password" name = "password"/>

        <SubmitBtn formBtn />
        <button type='button' className='btn btn-block' onClick={loginDemoUser}>
          Explore the app 
        </button>
        <p>
          Not a member? Sign up.
          <Link to='/register' className='member-btn'>Register</Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default login