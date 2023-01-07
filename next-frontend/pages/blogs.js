import React from "react";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import Navbar from "../src/components/Navbar";

const Blogs = ({ blogs }) => {
  const client = createClient({
    projectId: "0x8kr4v5",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  return (
    <div>
      <div class="bg-grey-50" id="blog">
        <div class="container mx-auto py-16 md:py-20">
          <h2 class="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl">
            I also like to write
          </h2>
          <h4 class="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl">
            Check out my latest posts!
          </h4>
          <div class="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {blogs.map((blog) => {
              return (
                <Link
                  key={blog.slug}
                  href={"/blog/" + blog.slug.current}
                  class="shadow"
                >
                  <div
                    style={{
                      backgroundImage: `url(${
                        builder.image(blog.blogImage) ||
                        "/assets/img/post-01.png"
                      })`,
                    }}
                    class="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  >
                    <span class="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                    <span class="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">
                      Read More
                    </span>
                  </div>
                  <div class="bg-white py-6 px-5 xl:py-8">
                    <span class="block font-body text-lg font-semibold text-black">
                      {blog.title}
                    </span>
                    <span class="block pt-2 font-body text-grey-20">
                      {blog.metadesc}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;

export async function getServerSideProps() {
  const client = createClient({
    projectId: "0x8kr4v5",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type=='blog']`;
  const blogs = await client.fetch(query);

  return { props: { blogs } };
}
