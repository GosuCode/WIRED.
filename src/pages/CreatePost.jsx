import { useNavigate } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import axios from 'axios'
import { useContext, useState } from 'react'
import { AuthContext } from "../helpers/AuthContext"

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required.'),
  description: yup.string()
    .required('Description is required.')
    .test('max-description-words', 'Description should not exceed 1000 words', (value) => {
      if (!value) return true; // Allow empty input

      const words = value.trim().split(/\s+/); // Split by whitespace to count words
      return words.length <= 1000;
    }),
})


const CreatePost = () => {
  const [showimage, setShowImage] = useState("");
  const [newImage, setImage] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const MAX_FILE_SIZE = 5000000;

  const handleImageUpload = (event) => {
    setShowImage(event.target.files[0]);
    setImage([...newImage, event.target.files[0]]);
  };

  const postFormData = async (value) => {
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("description", value.description);
    formData.append("username", `${authState.username}`);
    for (let i = 0; i < newImage.length; i++) {
      const image = newImage[i];
      if (image.size > MAX_FILE_SIZE) {
        toast.error("Image size exceeds 5MB");
        return; // Stop further processing
      }
      formData.append("image", newImage[i]);
    }
    console.log(newImage);
    try {
      await axios.post("http://localhost:3001/posts", formData).then(res => {
        if (res.status == 200) {
          toast.success("The post Added");
        }
      });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    console.log('Create Post line:42', data);
    postFormData(data);
  }

  const initialValues = {
    title: '',
    description: '',
    image: '',
    username: `${authState.username}`
  }

  return (
    <div className="grid grid-cols-12 gap-4 mt-3">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit} encType="multipart/form-data"
              className="col-start-2 col-span-7">
              <div className=' h-[600px] mt-20 bg-white w-full md:w-[1000px] px-16 py-8 rounded-md shadow-md'>
                <div className='mb-5 flex h-[100px]'>
                  <input
                    title='Choose a file please'
                    type='file'
                    name='image'
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <img
                    src={
                      showimage
                        ? URL.createObjectURL(showimage)
                        : ``
                    }
                    width={200}
                    alt=""
                    className=""
                  />
                </div>
                <div className='p-1'>
                  <ErrorMessage
                    name='image'
                    className='text-red-600 col-span-4'
                    component='p' />
                </div>
                <div >
                  <Field name="title"
                    placeholder="New post title here..."
                    autoComplete="off"
                    className="md:text-6xl md:w-[720px] font-extrabold overflow-hidden focus:outline-none"
                  />
                  <ErrorMessage
                    name='title'
                    className='text-red-600 col-span-4'
                    component='p' />
                </div>
                <div className="w-[650px] mt-4 bg-white">
                  <Field as="textarea" name="description"
                    className="md:w-[720px] h-[280px] focus:outline-none font-mono text-xl"
                    placeholder="Write your content here..." />
                </div>
                <ErrorMessage
                  name='description'
                  className='text-red-600 col-span-4'
                  component='p' />
              </div>
              <ToastContainer />
              <div className='mt-4'>
                <button type='submit' className='bg-blue-500 text-white shadow-md hover:shadow-slate-400 text-xl font-bold py-2 px-4 rounded-md'>Publish</button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>

  )
}

export default CreatePost
