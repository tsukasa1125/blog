import Link from 'next/link'

export default function Home(props) {
  return <div>
    {
      props.blogs.map((blog, key) => {
        return <Link key={key} href={`/blogs/${blog.blogId}`} >
          <div key={key}>
            <p>{ blog.meta.title }</p>
          </div>
        </Link>
      })
    }
  </div>
}

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

export async function getStaticProps({ params }) {

  const fileNames = await fs.readdirSync('public/markdowns/')

  console.log({fileNames})
  const blogs = await Promise.all(fileNames.map(async fileName => {
    const blogId = path.parse(fileName).name
    const filePath = `public/markdowns/${blogId}.md`
    const text = await fs.readFileSync(filePath, "utf8");
    const { data } = matter(text)

    return {
      blogId,
      meta: data
    }
  }))

  return { props: { blogs } }
}


