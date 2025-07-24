import { Head } from "@unhead/react"

function App() {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1>
          Hello, Welcome to todo app
        </h1>
        <p>
          Please create your todo here
        </p>
        <a id="link" href="/todo-form-page">
          Todo Form
        </a>
      </div>
    </>
  )
}

export default App
