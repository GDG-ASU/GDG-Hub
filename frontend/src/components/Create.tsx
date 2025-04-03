import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormState {
  title: string;
  link: string;
  content: string;
}

const Create = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    link: "",
    content: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/posts", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-1 px-10 py-16 text-center sm:px-12 md:px-[60px] border border-black">
              <div className="mb-10 text-center md:mb-16">
                <h1 className="font-roboto text-4xl font-semibold text-dark">
                  Create Post
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox
                  type="text"
                  name="title"
                  placeholder="Title"
                  handleChange={handleChange}
                />
                <InputBox
                  type="text"
                  name="link"
                  placeholder="Link"
                  handleChange={handleChange}
                />
                <label
                  htmlFor="content"
                  className="text-left block mb-2 text-base text-body-color font-roboto"
                >
                  Description
                </label>
                <DefaultColumn>
                  <MessageTextarea name="content" handleChange={handleChange} />
                </DefaultColumn>
                <DefaultColumn>
                  <DefaultFileInput />
                </DefaultColumn>
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

interface InputBoxProps {
  type: string;
  placeholder: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  type,
  placeholder,
  name,
  handleChange,
}) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className="font-roboto w-full rounded-md border border-black px-5 py-3 text-base text-body-color outline-none focus-visible:shadow-none"
      />
    </div>
  );
};

interface DefaultColumnProps {
  children: React.ReactNode;
}

const DefaultColumn: React.FC<DefaultColumnProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="mb-12">{children}</div>
    </div>
  );
};

interface MessageTextareaProps {
  name: string;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageTextarea: React.FC<MessageTextareaProps> = ({
  name,
  handleChange,
}) => {
  return (
    <textarea
      rows={6}
      name={name}
      onChange={handleChange}
      placeholder="Description"
      className="border border-black w-full bg-transparent rounded-md p-3 text-dark-6 outline-none"
    />
  );
};

const DefaultFileInput: React.FC = () => {
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
