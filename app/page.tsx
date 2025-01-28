import Chatbox from '../components/chat/chatbox';

export default function Home() {
  return (
    <>
      <div className='flex justify-center items-center h-screen gap-6 px-24 py-16 bg-[#f0f2f5]'>
        <Chatbox id='left' />
        <Chatbox id='right' />
      </div>
    </>
  );
}
