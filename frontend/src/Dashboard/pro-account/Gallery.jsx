import React, { useEffect, useState } from "react";

import { BASE_URL, token } from "../../config";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useTranslation } from "react-i18next";
import HashLoader from "react-spinners/HashLoader";

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const Gallery = ({ proData }) => {
  const { t } = useTranslation();

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Add state for update loading

  console.log("cloudinary urls", urls);

  const [formData, setFormData] = useState({
    portfolio: [],
  });

  useEffect(() => {
    setFormData({
      portfolio: proData?.portfolio,
    });
  }, [proData]);

  const uploadImages = async () => {
    setLoadingUpload(true);
    const promises = images.map((image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", upload_preset);
      data.append("cloud_name", cloud_name);
      return fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => data.url)
        .catch((error) => console.error("Error uploading image:", error));
    });

    try {
      const uploadedUrls = await Promise.all(promises);
      setUrls(uploadedUrls);
      setFormData({ ...formData, portfolio: uploadedUrls });
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true); // Start loading when updateProfileHandler is clicked
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
      toast.error(error.message);
    } finally {
      setLoadingUpdate(false); // Stop loading when toast is successful or error occurred
    }
  };

  return (
    <div className="container">
      <div className="flex-row">
        <input
          type="file"
          name="photo"
          id="customFile"
          onChange={handleImageChange}
          accept=".jpeg, .png"
          className="block text-sm text-slate-500
                    file:mr-4 file:py-2  file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-[#0066ff46]
                    hover:file:bg-[#7e9dcc46] "
          multiple
          title="Selecionar Fotos"
        />

        <button
          type="submit"
          onClick={uploadImages}
          className="mt-2 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold text-[14px] py-2 px-4 rounded-lg w-[200px]"
        >
          {t("preview")}
        </button>
      </div>

      {loadingUpload && <Loader />}

      <div>
        {!loadingUpload && urls.length > 0 && (
          <div className="image-preview mt-2">
            {urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Image ${index}`}
                className="mb-2"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          onClick={updateProfileHandler}
          className="mt-2 overflow-hidden bg-primaryColor text-white font-semibold text-[14px] py-2 px-4 rounded-lg w-[200px]"
        >
          {loadingUpdate ? (
            <HashLoader size={25} color="#fff" />
          ) : (
            `${t("updatePhotos")}`
          )}
        </button>
      </div>
    </div>
  );
};

export default Gallery;
