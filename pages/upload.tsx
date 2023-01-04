import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { client } from '../utils/client';
import { SanityAssetDocument } from '@sanity/client';
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';

const Upload = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);

    const { userProfile }: { userProfile: any } = useAuthStore();

    const uploadVideo = async (e: any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
        if (fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name,

            }).then(data => {
                setVideoAsset(data)
                setIsLoading(false)
                setWrongFileType(false)

            })
        }
        else {
            setIsLoading(false);
            setWrongFileType(true)
        }
    }

    const handlePost = async () => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    _type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id,
                },
                topic: category
            }
            await axios.post('http://localhost:3000/api/post', document);
            router.push('/')
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className="bg-white w-[75%] rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-around items-center pt-14 p-6">
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post Your Video</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[270px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
                        {
                            isLoading ? <>
                                <p>LOADING...</p>
                            </> :
                                <div>
                                    {
                                        videoAsset ? (
                                            <div>
                                                <video src={videoAsset.url}
                                                    loop
                                                    controls
                                                    className='rounded-xl h-[450px] mt-16 bg-black'
                                                >

                                                </video>
                                            </div>
                                        ) : (
                                            <label className='cursor-pointer'>
                                                <div className='flex flex-col items-center justfy-center h-full'>
                                                    <div className='flex flex-col items-center justfy-center'>
                                                        <p className='font-bold font-xl'>
                                                            <FaCloudUploadAlt className='text-gray-300 text-8xl' />
                                                        </p>
                                                        <p className='text-xl font-semibold'>
                                                            Upload Video
                                                        </p>
                                                    </div>
                                                    <p className='text-gray-400 text-center mt-8 text-sm leading-5'>
                                                        MP4 or WebM or ogg <br />
                                                        720x1280 or higher <br />
                                                        Up to 10 Minutes <br />
                                                        Less than 2GB
                                                    </p>
                                                    <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                                                        Select File
                                                    </p>
                                                </div>

                                                <input type="file" className='w-0 h-0'
                                                    name='upload-video'
                                                    onChange={(e) => uploadVideo(e)}

                                                />

                                            </label>
                                        )
                                    }
                                </div>
                        }

                        {
                            wrongFileType && (
                                <p className='text-red-600 font-semibold mt-4'>Please Select a video file</p>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-3 pb-10  '>
                    <label className='text-m font-medium' htmlFor=""> Caption</label>

                    <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className="rounded outline-none text-md border-2 border-gray-200 p-2" />

                    <label className='text-m font-medium' htmlFor=""> Choose a Category</label>
                    <select
                        className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                        onChange={(e) => setCategory(e.target.value)}>

                        <option className='outline-none capitalize bg-white text-gray-700p-2 hover:bg-slate-300 font-bold'> --choose an option-- </option>
                        {
                            topics.map(topic => (
                                <option key={topic.name}
                                    value={topic.name}
                                    className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300 '>
                                    {topic.name}
                                </option>
                            ))
                        }
                    </select>
                    <div className="flex gap-6 mt-10 ">

                        <button onClick={() => { }} type="button" className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'> Discard </button>

                        <button onClick={handlePost} type="button" className='bg-[#F51997] hover:bg-[#F51980] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'> Post </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Upload;