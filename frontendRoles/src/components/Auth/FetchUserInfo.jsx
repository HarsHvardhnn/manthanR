import axios from "axios";

async function fetchUserData(userID) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://manthanr.onrender.com/v1/get-user-info/${userID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response.is_profile_complete", response.data.is_profile_complete);
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
