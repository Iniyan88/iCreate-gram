import CreatePostForm from "@/components/forms/CreatePostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36"
            width="36 "
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
          <h2 className="h3-bold md:h2-bold text-left w-full text-slate-100">
            Create Post
          </h2>
        </div>
        <CreatePostForm />
      </div>
    </div>
  );
};

export default CreatePost;