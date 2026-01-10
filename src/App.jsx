import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          containerStyle={{
            top: 80,
          }}
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "1.1rem", // Larger font size
              fontWeight: 500,
              padding: "16px",
            },
          }}
        />
      </AuthProvider>
    </>
  );
}

export default App;
