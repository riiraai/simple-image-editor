import './App.css';
import ImageEditor from './components/ImageEditor';

function App() {
  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <header className="container mx-auto App-header mt-1">
        <p className="font-black text-center text-4xl leading-none">
          Simple Image Editor
        </p>
        <code className="mt-2 text-xs px-2 py-1 bg-gray-200 text-gray-800 font-mono rounded">
          <a className="underline text-blue-600 font-bold" href="https://react.dev/" target="_blank">ReactJs</a>,
          <a className="underline text-blue-600 font-bold" href="https://react-icons.github.io/react-icons" target="_blank">ReactIcons</a>,
          <a className="underline text-blue-600 font-bold" href="https://tailwindcss.com/" target="_blank">Tailwindcss</a>
        </code>
      </header>
      <div>
        <div className="my-3.5">
          <ImageEditor />
        </div>
        {/* Hidden Mobile */}
        <div className="hidden md:block">
          <div className='absolute right-[50px] bottom-[50px]'>
            <a
              href="https://github.com/riiraai/simple-image-editor"
              target='_blank'
              style={{
                filter: 'drop-shadow(rgba(0, 0, 0, 0.5) 0px 2px 2px)',
                borderRadius: '60%'
              }}
            >
              <p className='text-sm font-bold text-center'>Code</p>
              <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </a>
          </div>
        </div>
        {/* Hidden Desktop */}
        <div className="w-fit block md:hidden mx-auto mt-4">
          <a className="flex items-center gap-2 font-bold bg-black text-white px-3 py-1 rounded-xl" href='https://github.com/riiraai/simple-image-editor' target='_blank'>
            <svg height="20" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="20" data-view-component="true" className="fill-white	mx-auto octicon octicon-mark-github v-align-middle">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            <p>Source Code</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
