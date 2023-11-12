import Head from "next/head";

interface IHeadMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}

export const HeadMeta = ({ title, description, url, image }: IHeadMeta) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
    </Head>
  );
};
