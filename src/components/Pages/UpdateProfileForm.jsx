import { Form, useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { useContext, useEffect, useState } from "react";
import { handleUpdateProfile } from "../../utils/uploadRelated";
import { AuthContext } from "../../Context/AuthContext";
import useUserProfile from "../../hooks/useUserProfile";
import GradientWrapper from "../Micro/GradientWrapper";

export default function UpdateProfileForm() {
  const { authData } = useContext(AuthContext);
  const { user } = useUserProfile(authData?.currentUser.uid);
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
    evt.preventDefault();
    handleUpdateProfile(evt, { nickName, location, worksAt, wentTo, bio }, () =>
      navigate(-1)
    );
  };

  return (
    <GradientWrapper>
      <Form
        onSubmit={handleSubmit}
        className="p-6 mx-auto bg-black text-[#fffffff1] rounded-2xl max-w-xl space-y-6 text-sm"
      >
        <h2 className="text-[3rem] text-center font-cookie w-max mx-auto">
          Update Profile
        </h2>

        {/* Reusable row */}
        <div className="flex items-center gap-4">
          <label className="w-28 text-white font-medium">Nick Name</label>
          <input
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            type="text"
            placeholder="Enter your nick name"
            className="flex-1 bg-neutral-900 placeholder:text-[#acacac] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 text-white font-medium">Works At</label>
          <input
            value={worksAt}
            onChange={(e) => setWorksAt(e.target.value)}
            type="text"
            placeholder="e.g., Facebook"
            className="flex-1 bg-neutral-900 placeholder:text-[#acacac] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 text-white font-medium">Lives In</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="e.g., Uttara, Dhaka"
            className="flex-1 bg-neutral-900 placeholder:text-[#acacac] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-28 text-white font-medium">Went To</label>
          <input
            value={wentTo}
            onChange={(e) => setWentTo(e.target.value)}
            type="text"
            placeholder="e.g., Uttara High School"
            className="flex-1 bg-neutral-900 placeholder:text-[#acacac] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* For textarea, we can keep label inline but textarea bigger */}
        <div className="flex items-start gap-4">
          <label className="w-28 text-white font-medium pt-2">Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
            className="flex-1 bg-neutral-900 placeholder:text-[#acacac] rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button variant="dark" className="w-full ">
          Save Changes
        </Button>
      </Form>
    </GradientWrapper>
  );
}
