import { createClient } from "next-sanity";
import PortableText from "react-portable-text";

export default function Home({ blogs }) {
  return (
    <div className="home mx-8">
      <h1>{blogs[0].title}</h1>
      <nav className="nav">Navbar</nav>
      <PortableText
        // Pass in block content straight from Sanity.io
        content={blogs[0].content}
        projectId="0x8kr4v5"
        dataset="production"
        // Optionally override marks, decorators, blocks, etc. in a flat
        // structure without doing any gymnastics
        serializers={{
          h1: (props) => <h1 style={{ color: "red" }} {...props} />,
          li: ({ children }) => (
            <li className="special-list-item">{children}</li>
          ),
        }}
      />
    </div>
  );
}

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
