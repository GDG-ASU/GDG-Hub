import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        setPosts(res.data);
        console.log("Posts fetched successfully:", res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <section className="mt-10 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <SingleCard
                postId={post.id}
                image={post.image || "https://picsum.photos/id/237/200/300"}
                CardTitle={post.title}
                // titleHref="/#"
                // btnHref="/#"
                CardDescription={post.description}
              />
            ))
          ) : (
            <p>Loading posts...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Post;

const SingleCard = ({ postId, image, CardDescription, CardTitle }) => {
  const navigate = useNavigate();

  return (
    <div className="relative mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 border border-black">
      {/* Edit Icon */}
      <button
        className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
        onClick={() => navigate(`/edit/${postId}`)}
      >
        🖉
      </button>

      <img src={image} alt="" className="w-full" />
      <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
        <h3>
          <a
            href="/#"
            className="font-roboto mb-4 block text-xl font-semibold text-dark hover:text-primary sm:text-[22px]"
          >
            {CardTitle}
          </a>
        </h3>
        <p className="font-roboto mb-7 text-base leading-relaxed text-body-color">
          {CardDescription}
        </p>
        <a
          href={`/edit/${postId}`}
          className="bg-[#0F9D58] inline-block rounded-full px-7 py-2 text-white font-roboto"
        >
          View Details
        </a>
      </div>
    </div>
  );
};
