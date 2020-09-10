import Head from 'next/head';

import Layout from '@/Layout/Layout';

const About = () => (
  <Layout>
    <Head>
      <title>À propos - Wintr Travel</title>
    </Head>
    <div className="bg-gray-100 w-full flex justify-center">
      <div className="page px-4 py-10 tracking-wide">
        <h1 className="pb-6 text-center text-3xl font-bold text-gray-900">
          Qui sommes-nous?
        </h1>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
          tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
          faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
          lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
          tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
          faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
          lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula.
        </p>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
          tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
          faucibus mi vel mollis. Donec eu mi metus.
        </p>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
          tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
          faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
          lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
        <h2 className="py-4 text-2xl font-bold text-gray-900">Lorem Ipsum</h2>
        <p className="py-3 text-gray-600 text-lg">
          Nunc faucibus orci eu scelerisque faucibus. Donec id pellentesque
          ligula. In placerat vulputate luctus. Cras velit mi, ultrices eget
          tempus sed, porttitor a dolor. Aenean eu magna ante. Morbi elementum
          faucibus mi vel mollis. Donec eu mi metus. In gravida sollicitudin
          lacus, ac hendrerit lorem rutrum eget. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </div>
    </div>
    <style jsx>{`
      @media (min-width: 768px) {
        .page {
          width: 1000px;
        }
      }
    `}</style>
  </Layout>
);

export default About;
