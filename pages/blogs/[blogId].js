// TODO removeする
import marked from "marked"
import ReactMarkdown from 'react-markdown'

const Blog = (props) => {

  return <div>
    <title>{ props.meta.title }</title>
    <ReactMarkdown>
      {props.content}
    </ReactMarkdown>
  </div>
}

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

export async function getStaticPaths() {

  const fileNames = await fs.readdirSync('public/markdowns/')

  console.log({fileNames})
  const paths = fileNames.map(fileName => ({params: {blogId: path.parse(fileName).name}}))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {

  const filePath = `public/markdowns/${params.blogId}.md`
  const text = await fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(text)

  return { props: { content, meta: data } }
}

export default Blog