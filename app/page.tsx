import Chatbox from '../components/chat/chatbox';

export default function Home() {
  return (
    <>
      <div className='flex justify-center items-center h-screen gap-2'>
        <Chatbox />
        <Chatbox />
      </div>
    </>
  );
}
