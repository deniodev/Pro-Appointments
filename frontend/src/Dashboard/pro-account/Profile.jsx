import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ proData }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    bio: "",
    gender: "",
    specialization: "",
    qualifications: [],
    experiences: [],
    about: "",
    photo: "",
  });

  useEffect(() => {
    setFormData({
      name: proData?.name,
      email: proData?.email,
      phone: proData?.phone,
      city: proData?.city,
      bio: proData?.bio,
      gender: proData?.gender,
      specialization: proData?.specialization,
      qualifications: proData?.qualifications,
      experiences: proData?.experiences,
      about: proData?.about,
      photo: proData?.photo,
    });
  }, [proData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/pros/${proData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // reusable function for adding item
  const addItem = (key, item) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  //reusable input change function
  const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      const updateItems = [...prevFormData[key]];

      updateItems[index][name] = value;

      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };

  //reusable function for deleting item
  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      company: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        {t("profile")}
      </h2>

      <form>
        <div className="mb-5">
          <p className="form__label">{t("name")}*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nome Completo"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="form__input"
            readOnly
            aria-readonly
            disabled={true}
          />
        </div>
        <div className="mb-5">
          <p className="form__label">{t("phone")}*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">{t("city")}*</p>
          <select
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="form__input py-3.5"
          >
            <option value="Select">{t("select")}</option>
            <option value="Pemba">Pemba</option>
            <option value="Nampula">Nampula</option>
            <option value="Nacala">Nacala</option>
            <option value="Quelimane">Quelimane</option>
            <option value="Tete">Tete</option>
            <option value="Moatize">Moatize</option>
            <option value="Chimoio">Chimoio</option>
            <option value="Beira">Beira</option>
            <option value="Dondo">Dondo</option>
            <option value="Maxixe">Maxixe</option>
            <option value="Inhambane">Inhambane</option>
            <option value="Xai-Xai">Xai-Xai</option>
            <option value="Maputo">Maputo</option>
            <option value="Matola">Matola</option>
          </select>
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-2 gap-5 mb-[30px]">
            <div>
              <p className="form__label">{t("gender")}*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="Select">{t("select")}</option>
                <option value="Male">{t("male")}</option>
                <option value="Female">{t("female")}</option>
              </select>
            </div>
            <div>
              <p className="form__label">{t("specialization")}*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="All">{t("all")}</option>
                <option value="Assistência Técnica">{t("aTec")}</option>
                <option value="Aulas">{t("aulas")}</option>
                <option value="Design e Tecnologia">{t("dTec")}</option>
                <option value="Eventos">{t("eventos")}</option>
                <option value="Reformas">{t("reformas")}</option>
                <option value="Serviços Domésticos">{t("sDom")}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="form__label">{t("qualifications")}*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">{t("startingDate")}*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">{t("endingDate")}*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">{t("degree")}*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">{t("university")}*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
            onClick={addQualification}
          >
            {t("addDegree")}
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">{t("experiences")}*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">{t("startingDate")}*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">{t("endingDate")}*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">{t("position")}*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">{t("company")}*</p>
                    <input
                      type="text"
                      name="company"
                      value={item.company}
                      className="form__input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  onClick={(e) => deleteExperience(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            {t("addExperience")}
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">{t("about")}*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Escreva sobre você"
            onChange={handleInputChange}
            className="form__input"
          ></textarea>
        </div>

        <div className="mb-5 items-center gap-3">
          {formData.photo && (
            <figure
              className="w-[60px] h-[60px] rounded-full border-2 border-solid
             border-primaryColor flex items-center justify-center"
            >
              <img
                src={formData.photo}
                alt=""
                className="w-[58px] h-[58px] rounded-full"
              />
            </figure>
          )}

          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
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
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            {loading ? (
              <HashLoader size={25} color="#fff" />
            ) : (
              `${t("updateProfile")}`
            )}
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
