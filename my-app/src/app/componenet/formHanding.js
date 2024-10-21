"use client"

import {useState, useEffect} from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:"",
        message:'',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [newPost, setNewPost] = useState(null); //store the new post
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shouldSubmit, setShouldSubmit] = useState(false); //trigger useEffect on form submission

    //handle input change

    const handleChange = (e) => {
        setFormData ({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResponseMessage('');
        setShouldSubmit(true); // trigger the useEffect
    };

    useEffect(() =>{
        const submitForm =async() =>{
            if (shouldSubmit) {
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(formData),
                });
                if (response.ok) {
                    const data = await response.json();
                    setResponseMessage(`sucess! your post ID is: ${data.id}`);
                    setNewPost(data); // save the new post in state
                    setFormData({ name: '', email: '', message: ''});

                } else {
                    setResponseMessage('something went wrong.please try again.');
                }
                } catch (error) {
                    setResponseMessage('Error: ' + error.message);
                } finally{
                    setIsSubmitting(false);
                    setShouldSubmit(false); //reset to prevent multiple submission
                }
            }
        };
        submitForm();
    }, [shouldSubmit, formData]);

    return(
        <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10'>
            <h1 className='text-2x1 font-semibold mb-6 text-center'>Post</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      reguired
                      className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'/>
                </div>

                <div>
                    <label htmlFor='email' className='block text-sm font-meduim text-gray-700'>Email</label>

                    <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'/>
                </div>
        <div>
            <label htmlFor='message' className='block text-sm font-meduim text-gray-700'>Message</label>
            <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:border-indigo-500'/>
        </div>

        <button
        type='submit'
        className='w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        disabled ={isSubmitting}
        >{isSubmitting ? 'Submiting...' :'Submit'}</button>
            </form>

            {responseMessage && (
                <p className='mt-4 text-center text-sm text-green-600'>{responseMessage}</p>
            )}

            {/*display the new post after submission */}
            {newPost && (
                <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
                    <h2 className='text-xl font-semibold'>New POST Created</h2>
                    <p><strong>Post ID:</strong>{newPost.id}</p>
                    <p><strong>Name:</strong>{newPost.name}</p>
                    <p><strong>Email:</strong>{newPost.email}</p>
                    <p><strong>Message</strong>{newPost.message}</p>
                    </div>
            )}
        </div>
    );
};

export default ContactForm;