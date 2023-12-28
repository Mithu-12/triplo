import { useEffect } from "react";

const useLoginSuccess = (onSuccess) => {
  useEffect(() => {
    async function handleLoginSuccess() {
      try {
        const response = await fetch(
          "https://tame-leggings-goat.cyclic.app/api/auth/login/success",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers if needed
            },
            credentials: "include", // Include cookies in the request
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Call the provided callback function
          onSuccess(data);
        } else {
          // Authentication failed
          console.error("Authentication failed:", data);
          // Handle error and redirect as needed
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error and redirect as needed
      }
    }

    handleLoginSuccess();
  }, []);
};

export default useLoginSuccess;
