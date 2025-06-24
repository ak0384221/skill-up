import { Form, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { useContext, useEffect, useState } from "react";
import { handleUpdateProfile } from "../../utils/helperFunctions";
import { AuthContext } from "../../Context/AuthContext";
import useUserProfile from "../../hooks/useUserProfile";

export default function UpdateProfileForm() {
  const { currentUser } = useContext(AuthContext);
  const { user } = useUserProfile(currentUser.uid);
  const navigate = useNavigate();

  // Form state
  const [nickName, setNickName] = useState("");
  const [worksAt, setWorksAt] = useState("");
  const [location, setLocation] = useState("");
  const [wentTo, setWentTo] = useState("");
  const [bio, setBio] = useState("");

  // Load initial user data into form
  useEffect(() => {
    if (user) {
      setNickName(user.nickName || "");
      setWorksAt(user.worksAt || "");
      setLocation(user.location || "");
      setWentTo(user.wentTo || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = (evt) => {
    handleUpdateProfile(
      evt,
      { nickName, location, worksAt, wentTo, bio },
      navigate
    );
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="mt-[14vh] w-5/6 md:w-1/2 mx-auto p-6 min-h-screen text-[#fffffff1] rounded-2xl space-y-4"
    >
      <h2 className="text-5xl text-center font-cookie w-max mx-auto ">
        Update Profile
      </h2>

      <div className="flex flex-col">
        <label className=" text-white font-medium mb-1 ">Nick Name</label>
        <input
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          type="text"
          placeholder="Enter your nick name"
          className="border-1 border-[#d6d4dd] placeholder:text-[#acacac] rounded-sm p-2 focus:outline-0"
        />
      </div>

      <div className="flex flex-col">
        <label className=" text-white font-medium mb-1">Works At</label>
        <input
          value={worksAt}
          onChange={(e) => setWorksAt(e.target.value)}
          type="text"
          placeholder="e.g., Facebook"
          className="border-1 placeholder:text-[#acacac]  border-[#d6d4dd] rounded-sm p-2 focus:outline-0"
        />
      </div>

      <div className="flex flex-col">
        <label className=" text-white font-medium mb-1">Lives In</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          placeholder="e.g., Uttara, Dhaka"
          className="border-1 border-[#d6d4dd] rounded-sm p-2 placeholder:text-[#acacac] focus:outline-0"
        />
      </div>

      <div className="flex flex-col">
        <label className=" text-white font-medium mb-1">Went To</label>
        <input
          value={wentTo}
          onChange={(e) => setWentTo(e.target.value)}
          type="text"
          placeholder="e.g., Uttara High School"
          className="border-1 border-[#d6d4dd] placeholder:text-[#acacac] rounded-sm p-2 focus:outline-0"
        />
      </div>

      <div className="flex flex-col">
        <label className=" text-white font-medium mb-1">Bio</label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          type="text"
          placeholder="Enter your bio"
          className="border-1 border-[#d6d4dd] placeholder:text-[#acacac] rounded-sm p-2 focus:outline-0"
        />
      </div>

      <Button
        variant="light"
        className="w-full bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-700 transition font-cookie text-lg"
      >
        Save Changes
      </Button>
    </Form>
  );
}
