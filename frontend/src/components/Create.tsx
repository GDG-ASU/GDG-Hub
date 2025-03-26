import axios from "axios";
import { useState } from "react";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/posts", form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      window.location.href = "/";
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-1 px-10 py-16 text-center sm:px-12 md:px-[60px] border border-black ">
              <div className="mb-10 text-center md:mb-16">
                <h1 className="font-roboto text-4xl font-semibold text-dark dark:text-white">Create Post</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-left block mb-2 text-base text-body-color font-roboto">
                  Title
                </label>
                <InputBox type="text" name="title" placeholder="Title" handleChange={handleChange} />
                <label htmlFor="link" className="text-left block mb-2 text-base text-body-color font-roboto">
                  Link
                </label>
                <InputBox type="text" name="link" placeholder="Link" handleChange={handleChange} />
                {/* <label htmlFor="title" className="text-left block mb-2 text-base text-body-color font-roboto">
                  Title
                </label>
                <InputBox type="text" name="title" placeholder="Title" handleChange={handleChange} /> */}
                <label htmlFor="description" className="text-left block mb-2 text-base text-body-color font-roboto">
                  Description
                </label>
                <div className=" w-full ">
                  <DefaultColumn children={"awd"}>
                    <MessageTextarea handleChange={handleChange} />
                  </DefaultColumn>
                </div>
                <label htmlFor="image" className="text-left block mb-2 text-base text-body-color font-roboto">
                  Upload Image
                </label>
                <div className=" w-full ">
                  <DefaultColumn children={"awd"}>
                    <DefaultFileInput />
                  </DefaultColumn>
                </div>
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Create"
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

export default Create;

const InputBox = ({ type, placeholder, name, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className="font-roboto w-full rounded-md border border-black  px-5 py-3 text-base text-body-color outline-none  focus-visible:shadow-none "
      />
    </div>
  );
};

const DefaultColumn = ({ children }) => {
  return (
    <div className="w-full ">
      <div className="mb-12">{children}</div>
    </div>
  );
};

const MessageTextarea = ({ handleChange }) => {
  return (
    <>
      <div className="relative">
        <textarea
          rows={6}
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="border border-black w-full bg-transparent rounded-md  dark:border-dark-3 p-3 pl-12 text-dark-6 outline-none  disabled:cursor-default disabled:bg-gray-2"
        />
        <span className="absolute top-[18px] left-4">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity={0.8}>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.56622 3.23223C2.03506 2.76339 2.67094 2.5 3.33398 2.5H9.16732C9.62755 2.5 10.0006 2.8731 10.0006 3.33333C10.0006 3.79357 9.62755 4.16667 9.16732 4.16667H3.33398C3.11297 4.16667 2.90101 4.25446 2.74473 4.41074C2.58845 4.56702 2.50065 4.77899 2.50065 5V16.6667C2.50065 16.8877 2.58845 17.0996 2.74473 17.2559C2.90101 17.4122 3.11297 17.5 3.33398 17.5H15.0006C15.2217 17.5 15.4336 17.4122 15.5899 17.2559C15.7462 17.0996 15.834 16.8877 15.834 16.6667V10.8333C15.834 10.3731 16.2071 10 16.6673 10C17.1276 10 17.5006 10.3731 17.5006 10.8333V16.6667C17.5006 17.3297 17.2373 17.9656 16.7684 18.4344C16.2996 18.9033 15.6637 19.1667 15.0006 19.1667H3.33398C2.67094 19.1667 2.03506 18.9033 1.56622 18.4344C1.09738 17.9656 0.833984 17.3297 0.833984 16.6667V5C0.833984 4.33696 1.09738 3.70107 1.56622 3.23223Z"
                fill="#9CA3AF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.6673 2.39909C16.4195 2.39909 16.1818 2.49754 16.0066 2.67278L8.25314 10.4262L7.81264 12.1882L9.57463 11.7477L17.3281 3.99427C17.5033 3.81903 17.6018 3.58135 17.6018 3.33352C17.6018 3.0857 17.5033 2.84802 17.3281 2.67278C17.1528 2.49754 16.9152 2.39909 16.6673 2.39909ZM14.8281 1.49427C15.3159 1.00647 15.9775 0.732422 16.6673 0.732422C17.3572 0.732422 18.0188 1.00647 18.5066 1.49427C18.9944 1.98207 19.2684 2.64367 19.2684 3.33352C19.2684 4.02338 18.9944 4.68498 18.5066 5.17278L10.5899 13.0894C10.4831 13.1962 10.3493 13.272 10.2028 13.3086L6.86945 14.142C6.58547 14.213 6.28506 14.1298 6.07808 13.9228C5.8711 13.7158 5.78789 13.4154 5.85888 13.1314L6.69222 9.79808C6.72885 9.65155 6.80461 9.51773 6.91141 9.41093L14.8281 1.49427Z"
                fill="#9CA3AF"
              />
            </g>
          </svg>
        </span>
      </div>
    </>
  );
};

const DefaultFileInput = () => {
  return (
    <>
      <input
        type="file"
        className="w-full cursor-pointer 
          rounded-md border border-stroke 
          dark:border-dark-3 text-dark-6 outline-none transition 
          file:mr-5 file:border-collapse file:cursor-pointer 
          file:border-0 file:border-r file:border-solid file:border-stroke 
          dark:file:border-dark-3 file:bg-gray-2 dark:file:bg-dark-2 file:py-3 
          file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-primary 
          file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
      />
    </>
  );
};
