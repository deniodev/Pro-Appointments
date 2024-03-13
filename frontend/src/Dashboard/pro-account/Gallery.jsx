import React, { useEffect, useState } from 'react';

import { BASE_URL, token } from '../../config';
import { toast } from "react-toastify";
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';


const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const Gallery = ({ proData }) => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [loadingUpload, setLoadingUpload] = useState(false); // State to manage upload loading

    console.log("cloudinary urls", urls);

    const [formData, setFormData] = useState({
        portfolio: []
    });

    useEffect(()=> {
        setFormData({
            portfolio: proData?.portfolio,
        });
        
    },[proData]);

    const uploadImages = async () => {
        setLoadingUpload(true); // Set loading state to true when upload starts
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
        } finally {
            setLoadingUpload(false); // Set loading state to false when upload finishes
        }
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

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
            });
    
            const result = await res.json();
    
            if(!res.ok) {
                throw Error(result.message);
            }
    
            toast.success(result.message);
        } catch (error) {
            toast.error(error.message);
        }
    
    };

    return (
        <div>
            <div>
                <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                    Atualize a Sua Galeria  
                </h2>  
            </div> 

            <div className='flex-row'>
                <input 
                    type="file"
                    name='photo'
                    id="customFile"
                    onChange={handleImageChange}
                    accept='.jpeg, .png'
                    className='block text-sm text-slate-500
                    file:mr-4 file:py-2  file:rounded-md
                    file:border-0 file:text-sm file:font-semibold
                    file:bg-pink-50 file:bg-[#0066ff46]
                    hover:file:bg-[#7e9dcc46]'
                    multiple
                />
                <button
                    type="submit"
                    onClick={uploadImages}
                    className="mt-2 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold text-[14px] py-2 px-4 rounded-lg"
                >
                    Upload
                </button>  
            </div> 

            {loadingUpload && <Loader/>}

            <div>
                {!loadingUpload && urls.length > 0 && (
                    <div className="image-container mt-[30px]">
                        {urls.map((url, index) => (
                            <img key={index} src={url} alt={`Image ${index}`} className='mb-2'/>
                        ))}
                    </div>  
                )}

                <button
                    type="submit"
                    onClick={updateProfileHandler}
                    className=" btn overflow-hidden font-semibold text-[18px] leading-[25px] py-3 px-4 rounded-lg"
                >
                    Atualizar
                </button>
            </div>    
        </div>
    );
}

export default Gallery;
