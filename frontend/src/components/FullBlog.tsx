import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 pt-12 max-w-screen-xl px-10 w-full">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 12 Sep 2024</div>
            <div className="text-slate-800">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>

            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-center">
                <Avatar name={blog.author.name || "Anonymus"} size="big" />
              </div>
              <div className="pl-4">
                <div className="text-lg-2xl font-bold">
                  {blog.author.name || "Anonymus"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
