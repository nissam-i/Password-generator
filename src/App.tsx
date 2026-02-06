import { PasswordGenerator } from './components/PasswordGenerator';

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 premium-gradient pointer-events-none" />

      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 w-full flex justify-center">
        <PasswordGenerator />
      </div>

    </div>
  );
}

export default App;
