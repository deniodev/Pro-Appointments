import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";
import HashLoader from "react-spinners/HashLoader";

import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImageToCloudinary(file);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          {t("signup1")}{" "}
          <span className="text-primaryColor">{t("account")}</span>
        </h3>

        <form onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="text"
              placeholder={t("fullName")}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
            text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
            text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
            text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>

          <div className="mb-5 flex items-center justify-between">
            <label className="text-headingColor font-bold text-[16px] leading-7">
              {t("you")}
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="selecionar">{t("select")}</option>
                <option value="client">{t("client")}</option>
                <option value="pro">{t("professional")}</option>
              </select>
            </label>

            <label className="text-headingColor font-bold text-[16px] leading-7">
              {t("gender")}
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="selecionar">{t("select")}</option>
                <option value="male">{t("male")}</option>
                <option value="female">{t("female")}</option>
              </select>
            </label>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {selectedFile && (
              <figure
                className="w-[60px] h-[60px] rounded-full border-2 border-solid
             border-primaryColor flex items-center justify-center"
              >
                <img src={previewURL} alt="" className="w-full rounded-full" />
              </figure>
            )}

            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpeg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />

              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem]
            text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold
            rounded-lg truncate cursor-pointer"
              >
                {t("uploadPhoto")}
              </label>
            </div>
          </div>

          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? (
                <HashLoader size={35} color="#ffffff" />
              ) : (
                `${t("signup")}`
              )}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            {t("yet1")}
            <Link to="/login" className="text-primaryColor font-medium ml-1">
              {t("login")}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
