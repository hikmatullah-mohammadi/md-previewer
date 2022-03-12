import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { useState } from "react"


const Main = () => {
  const initialMD = 
  '# Header1\n'+
  '## Header2\n'+
  '![a cat image](https://s3.amazonaws.com/freecodecamp/running-cats.jpg)\n'+
  '[Click me](https://www.example.com)\n'+
  'This is a __bold__ text.\n'+
  'This is a _italic_ text.\n'+
  '* Item 1\n* Item 2\n'+'\n'+
  'As Kanye West said: \n'+
  '> We\'re living the future so\n'+
  '> the present is our past.\n'+ 
  'The first program I wrote was `print(\'Hello world\')` :)\n'+
  '```js\nfor (let i=0; i<10;i++){\n\tconsole.log(i)\n```\n'
  
  const [markdown, setMarkdown] = useState(initialMD)
  const handleChange = (e) => {
    setMarkdown(e.target.value)
  }
  return (
    <main>
      <textarea 
        name="editor" 
        id="editor"
        autoFocus
        spellCheck='false'
        value={markdown}
        onChange={handleChange}
      />

      <div id="preview">
        <ReactMarkdown
          // copied and pasted from https://github.com/remarkjs/react-markdown
          children={markdown}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        />
      </div>
    </main>
  )
}

export default Main
