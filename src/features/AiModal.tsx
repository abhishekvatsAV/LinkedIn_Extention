import { useState } from 'react'
import { VscSend } from "react-icons/vsc";
import { RiDownloadLine } from "react-icons/ri";
import { RiLoopRightLine } from "react-icons/ri";

const AiModal = ({ updateMessageBox }) => {
  const [reply, setReply] = useState("")
  const [userInput, setUserInput] = useState("")
  const [isResponse, setIsResponse] = useState(false)

  const generateText = () => {
    if (userInput === "") {
      alert("Prompt cannot be empty!")
      return
    }

    setReply("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
    setIsResponse(true);
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-black/50 min-h-screen w-full h-full bg-opacity-50'>
      {!isResponse ?
        <div className='bg-white rounded-md absolute shadow-md p-5 gap-3 flex-col flex min-w-[500px]'>
          <input type="text" placeholder="Enter your prompt" value={userInput} onChange={(e) => setUserInput(e.target.value)} className='p-2 rounded-md border-solid border-2 border-gray-400' />
          <button className='bg-blue-500 w-[100px] text-white rounded-md px-2 py-1 place-self-end flex justify-center items-center gap-1' onClick={generateText}>
            <VscSend />
            <p>
              Generate
            </p>
          </button>
        </div>
        : <div className='bg-white rounded-md absolute shadow-md p-5 gap-3 flex-col flex min-w-[500px] max-w-[600px]'>
          <div className='bg-gray-200 place-self-end px-2 py-1 rounded-md max-w-[70%]'>
            <p className='text-gray-500 '>{userInput}</p>
          </div>
          <div className='bg-blue-200 place-self-start px-2 py-1 rounded-md max-w-[70%]'>
            <p className='text-gray-500'>
              {reply}
            </p>
          </div>
          <div>
            <input type="text" placeholder="Your Prompt" contentEditable={false} className='p-2 rounded-md border-solid border-2 border-gray-400 w-full' />
          </div>
          <div className='flex place-self-end gap-5 justify-center items-center'>
            <button className='border border-gray-400 font-semibold text-gray-600 w-[100px] rounded-md p-1 place-self-end flex justify-center items-center gap-2' onClick={() => updateMessageBox(reply)}>
              <RiDownloadLine />
              Insert
            </button>
            <button className='bg-blue-500  text-white font-semibold min-w-[100px] rounded-md px-2 py-1 place-self-end flex justify-center items-center gap-2'>
              <RiLoopRightLine />
              Regenerate
            </button>
          </div>

        </div>}
    </div>
  )
}

export default AiModal
