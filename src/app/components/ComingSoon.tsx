import { Rocket } from 'lucide-react';

interface ComingSoonProps {
  moduleName: string;
  subtab?: string;
}

export default function ComingSoon({ moduleName, subtab }: ComingSoonProps) {
  return (
    <div className="flex min-h-[calc(100vh-89px)] items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 p-6">
      <div className="text-center">
        <div className="inline-flex p-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full mb-6">
          <Rocket size={64} className="text-violet-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{moduleName}</h2>
        {subtab && <p className="text-xl text-gray-600 mb-4">{subtab}</p>}
        <p className="text-gray-500">This feature is coming soon!</p>
      </div>
    </div>
  );
}
