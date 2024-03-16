import { baseUrl } from "../../constants";

export interface AuthDataType {
  username: string;
  fname?: string;
  lname?: string;
  email?: string;
  pass1: string;
  pass2?: string;
}

export const registerUser = async (data: AuthDataType) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData && errorData.message
          ? errorData.message
          : "Unknown error occurred";
      alert(
        "Sign up failed with status " +
          response.status +
          "\nMessage: " +
          errorMessage
      );
    } else {
      return response.status;
    }
  } catch (error) {
    alert("There was a problem with the sign up operation:" + error);
  }
};

export const loginUser = async (data: AuthDataType) => {
  try {
    const response = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      //parse response body as a js object
      const errorData = await response.json();
      const errorMessage =
        errorData && errorData.message
          ? errorData.message
          : "Unknown error occurred";
      alert(
        "Login failed with status " +
          response.status +
          "\nMessage: " +
          errorMessage
      );
    } else {
      localStorage.setItem("isAuthenticated", "true");
      return response.status;
    }
  } catch (error) {
    alert("There was a problem with the login operation:" + error);
  }
};
