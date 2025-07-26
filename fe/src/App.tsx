import { Head } from "@unhead/react"

function App() {

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <h1 data-testid='cy-home-heading'>
          Hello, Welcome to todo app
        </h1>
        <p>
          Please create your todo here
        </p>
        <a data-testid='cy-anchor-todo-form' id="link" href="/todo-form-page">
          Todo Form
        </a>
      </div>
    </>
  )
}

export default App
