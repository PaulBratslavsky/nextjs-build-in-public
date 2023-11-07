import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function RichText({ content }: { content: string }) {
  return (
    <section className="rich-text py-6 dark:bg-black dark:text-gray-50 ">
      <Markdown children={content} remarkPlugins={[remarkGfm]} />
    </section>
  );
}