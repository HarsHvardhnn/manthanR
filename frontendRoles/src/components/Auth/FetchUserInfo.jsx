import axios from "axios";

async function fetchUserData(userID) {
  try {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await axios.get(
      `${apiUrl}/get-user-info/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //console.log("response.is_profile_complete", response.data.is_profile_complete);
    const { is_profile_complete, has_accepted_tnc } = response.data;
    return {
      isProfileComplete: is_profile_complete,
      hasAcceptedTnc: has_accepted_tnc,
    };
  } catch (error) {
    console.error("Error fetching user info:", error);
    return { isProfileComplete: false, hasAcceptedTnc: false };
  }
}

export default fetchUserData;
