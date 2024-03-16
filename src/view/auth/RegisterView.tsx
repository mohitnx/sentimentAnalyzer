import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthDataType, registerUser } from "../../api/auth/authAPI";

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterView = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      const data: AuthDataType = {
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        username: values.username,
        pass1: values.password,
        pass2: values.password,
      };
      const statusCode = await registerUser(data);
      statusCode === 200;
      {
        alert(
          "Account Created Successfully. Now use the same credentails to login"
        );
        navigate("/login", { replace: true });
      }
      helpers.resetForm({
        values,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="bg-lightBlack w-full h-[100vh]">
        <div className="absolute translate-x-[-50%] translate-y-[-50%]  top-[50%] left-[50%] ">
          <div className="bg-black w-[585px] h-[full] rounded-[4px] pt-[85px] pb-[55px] px-[80px] flex flex-col justify-between ">
            <div className="flex flex-col border-b-[1px] border-b-[rgba(0,0,0,0.10)]">
              <p className="font-[700] text-[30px] text-white select-none text-center">
                Greetings
              </p>
              <p className="font-[400] text-[18px] text-[#dedbdb] pt-[5px] pb-[36px] select-none text-center">
                Please create an account to continue
              </p>
              <div className="w-[100%] pb-[24px]">
                <input
                  title=""
                  placeholder="firstName"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="w-[100%] pb-[24px]">
                <input
                  title=""
                  placeholder="lastName"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
              <div className="w-[100%] pb-[24px]">
                <input
                  title=""
                  placeholder="Username"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className="w-[100%] pb-[24px]">
                <input
                  title=""
                  placeholder="Email"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="w-[100%] pb-[24px]">
                <input
                  type="password"
                  title=""
                  placeholder="Password"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="w-[100%] pb-[24px]">
                <input
                  type="password"
                  title=""
                  placeholder="confirm password"
                  className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-[14px] px-2">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className="w-[100%] pb-[10px]">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md  transition-colors duration-300 w-full"
                >
                  Register
                </button>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center mt-[40px]">
                    <p className="mr-2 text-white">Already have an account?</p>
                    <Link to={"/login"}>
                      <span className="text-blue-500 text-[16px] font-[400] select-none">
                        Login
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterView;
