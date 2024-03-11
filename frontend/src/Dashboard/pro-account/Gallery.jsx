import React, { useEffect, useState } from 'react';

import { BASE_URL, token } from '../../config';
import { toast } from "react-toastify";

const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const Gallery = ({ proData }) => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);

    console.log("cloudinary urls", urls);

    const [formData, setFormData] = useState({
        portfolio: []
    });

    useEffect(()=> {
        setFormData({
            portfolio: proData?.portfolio,
        });
        
    },[proData]);


    const updateProfileHandler = async e => {
        e.preventDefault();
    
        try {
          const res = await fetch(`${BASE_URL}/pros/${proData._id}`,{
            method: 'PUT',
            headers:{
              'content-type':'application/json',
              Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(formData)
          })
    
          const result = await res.json()
    
          if(!res.ok) {
            throw Error(result.message)
          }
    
          toast.success(result.message);
        } catch (error) {
          toast.error(err.message)
        }
    
      };

      const uploadImages = async () => {
        const promises = images.map(image => {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', upload_preset);
            data.append('cloud_name', cloud_name);
            return fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => data.url)
            .catch(error => console.error('Error uploading image:', error));
        });
    
        try {
            const uploadedUrls = await Promise.all(promises);
            setUrls(uploadedUrls);
            setFormData({...formData, portfolio: uploadedUrls}); // Update formData with uploadedUrls
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };


    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);

    };

    return (
        <div>
           <div className='relative flex items-center'>
    <input 
        type="file"
        name='photo'
        id="customFile"
        onChange={handleImageChange}
        accept='.jpeg, .png'
        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
        multiple
    />

    <label 
        htmlFor="customFile" 
        className='absolute top-0 left-0 flex items-center px-[1.2rem] py-[0.375rem]
        text-[18px] leading-[25px] overflow-hidden bg-[#0066ff46] text-headingColor font-semibold
        rounded-lg truncate cursor-pointer'
        style={{width: '130px', height: '50px'}}
    >
        Selecionar
    </label>

    <button
        type="submit"
        onClick={uploadImages}
        className=" overflow-hidden bg-[#0066ff46] text-headingColor font-semibold text-[18px] leading-[25px] py-3 px-4 rounded-lg ml-[220px]"
    >
        Upload
    </button>

    <button
        type="submit"
        onClick={updateProfileHandler}
        className="overflow-hidden bg-[#0066ff46] text-headingColor font-semibold text-[18px] leading-[25px] py-3 px-4 rounded-lg ml-[120px]"
    >
        Atualizar
    </button>
</div>
 

            <div>
                <div className="image-container mt-[30px]">
                    {urls.map((url, index) => (
                        <img key={index} src={url} alt={`Image ${index}`} className='mb-2'/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;
