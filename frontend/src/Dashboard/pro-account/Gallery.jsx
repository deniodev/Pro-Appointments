import React, { useState } from 'react';
import Portfolio from '../../pages/Pros/Portfolio';


const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);

    console.log("cloudinary urls", urls);

    const uploadImages = () => {
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

        Promise.all(promises)
            .then(urls => {
                setUrls(urls);
            });
    }

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    }





    return (
        <div>
          <div className='relative w-[130px] h-[50px]'>
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
            className='absolute top-0 left-0 w-full h-full flex items-center px-[1.2rem] py-[0.375rem]
            text-[18px] leading-[25px] overflow-hidden bg-[#0066ff46] text-headingColor font-semibold
            rounded-lg truncate cursor-pointer'
            >
              Selecionar
            </label>

            <button
            type="submit"
            onClick={uploadImages}
            className="overflow-hidden bg-[#0066ff46] text-headingColor font-semibold text-[18px] leading-[25px] w-full py-3 px-4 rounded-lg ml-[220px]"
          >
            Upload
          </button>

          </div> 

            <Portfolio />

        </div>
    );
}

export default Gallery;
