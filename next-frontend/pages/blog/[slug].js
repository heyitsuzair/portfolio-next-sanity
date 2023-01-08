import React from "react";
import { useRouter } from "next/router";
import { createClient } from "next-sanity";
import PortableText from "react-portable-text";
const Slug = ({ blog }) => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div class="container py-6 md:py-20">
          <div class="mx-auto max-w-4xl">
            <div class="">
              <h1 class="pt-5 font-body text-3xl font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
                {blog.title}
              </h1>
              <div class="flex items-center pt-5 md:pt-10">
                <div>
                  <img
                    src="/assets/img/blog-author.jpg"
                    class="h-20 w-20 rounded-full border-2 border-grey-70 shadow"
                    alt="author image"
                  />
                </div>
                <div class="pl-5">
                  <span class="block font-body text-xl font-bold text-grey-10">
                    By Christy Smith
                  </span>
                  <span class="block pt-1 font-body text-xl font-bold text-grey-30">
                    February 27, 2022
                  </span>
                </div>
              </div>
            </div>
            <div class="prose max-w-none pt-8">
              <PortableText
                content={blog.content}
                projectId="0x8kr4v5"
                dataset="production"
                serializers={{
                  h1: (props) => <h1 style={{ color: "red" }} {...props} />,
                  li: ({ children }) => (
                    <li className="special-list-item">{children}</li>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slug;

export async function getServerSideProps(context) {
  console.log(context.query.slug);
  const client = createClient({
    projectId: "0x8kr4v5",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type=='blog' && slug.current == '${context.query.slug}'][0]`;
  const blog = await client.fetch(query);

  return { props: { blog } };
}
