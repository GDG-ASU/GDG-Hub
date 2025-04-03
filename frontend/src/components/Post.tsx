import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Post {
  id: string;
  image?: string;
  title: string;
  content: string;
}

const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const token = localStorage.getItem("token");

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
                key={post.id}
                postId={post.id}
                image={post.image || "https://picsum.photos/id/237/200/300"}
                CardTitle={post.title}
                CardDescription={post.content}
                showEditIcon={!!token}
                auth={!!token}
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

interface SingleCardProps {
  postId: string;
  image: string;
  CardTitle: string;
  CardDescription: string;
  postLink?: string;
  showEditIcon: boolean;
  auth?: boolean;
}

const SingleCard: React.FC<SingleCardProps> = ({
  postId,
  image,
  CardTitle,
  CardDescription,
  showEditIcon,
  postLink,
  auth,
}) => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setShowConfirm(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
        setShowConfirm(false);
      });
  };

  return (
    <>
      <div className="relative mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 border border-black">
        {showEditIcon && (
          <button
            className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full hover:bg-gray-300"
            onClick={() => setShowConfirm(true)}
          >
            🗑️
          </button>
        )}

        <img
          src={image}
          alt="Post Image"
          className="w-full h-80 object-cover"
        />

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
          <p className="font-roboto mb-7 text-base leading-relaxed text-body-color">
            {postLink}
          </p>
          {auth && (
            <a
              href={`/edit/${postId}`}
              className="bg-[#0F9D58] inline-block rounded-full px-7 py-2 text-white font-roboto"
            >
              Edit Post
            </a>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold">Confirm Deletion</h2>
            <p className="text-gray-700">
              Are you sure you want to delete this post?
            </p>

            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
