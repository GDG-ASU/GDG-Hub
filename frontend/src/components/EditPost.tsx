import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    link: "",
    content: "",
  });

  // Fetch existing post data
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setForm(res.data); // Populate form with existing data
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        navigate("/"); // Redirect after update
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-1 px-10 py-16 text-center sm:px-12 md:px-[60px] border border-black ">
              <div className="mb-10 text-center md:mb-16">
                <h1 className="font-roboto text-4xl font-semibold text-dark dark:text-white">
                  Edit Post
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-left text-base font-roboto">
                  Title
                </label>
                <InputBox
                  type="text"
                  name="title"
                  value={form.title}
                  placeholder="Title"
                  handleChange={handleChange}
                />

                <label className="block mb-2 text-left text-base font-roboto">
                  Link
                </label>
                <InputBox
                  type="text"
                  name="link"
                  value={form.link}
                  placeholder="Link"
                  handleChange={handleChange}
                />

                <label className="block mb-2 text-left text-base font-roboto">
                  Description
                </label>
                <MessageTextarea
                  name="content"
                  value={form.content}
                  handleChange={handleChange}
                />

                <div className="mb-10">
                  <input
                    type="submit"
                    value="Update"
                    className="w-full cursor-pointer rounded-md border border-black bg-[#4285F4] px-5 py-3 text-base font-medium text-white transition"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditPost;

// Input Box Component
const InputBox = ({ type, name, value, placeholder, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full rounded-md border border-black px-5 py-3 text-base text-body-color outline-none focus-visible:shadow-none"
      />
    </div>
  );
};

// Textarea Component
const MessageTextarea = ({ name, value, handleChange }) => {
  return (
    <textarea
      rows={6}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder="Description"
      className="w-full border border-black rounded-md p-3 text-dark-6 outline-none"
    />
  );
};
