import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthDataType, loginUser } from "../../api/auth/authAPI";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginView = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      const data: AuthDataType = {
        pass1: values.password,
        username: values.username,
      };
      const statusCode = await loginUser(data);
      if (statusCode === 200) {
        localStorage.setItem("username", values.username);
        navigate("/dashboard", { replace: true });
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
          <div className="bg-black w-[585px] h-[757px] rounded-[4px] pt-[85px] pb-[55px] px-[80px] flex flex-col justify-between ">
            <div className="flex flex-col border-b-[1px] border-b-[rgba(0,0,0,0.10)]">
              <p className="font-[700] text-[30px] text-white select-none text-center">
                Welcome back
              </p>
              <p className="font-[400] text-[18px] text-[#dedbdb] pt-[5px] pb-[36px] select-none text-center">
                Log in to Youtube Analyzer
              </p>
              <div className="w-[100%] pb-[24px]">
                <input
                  title=""
                  placeholder="username"
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

              <div className="w-[100%] pb-[10px]">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 w-full"
                >
                  Login
                </button>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center mt-[40px]">
                    <p className="mr-2 text-white">Don't have an account?</p>
                    <Link to={"/register"}>
                      <span className="text-blue-500 text-[16px] font-[400] select-none">
                        Register
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

export default LoginView;
