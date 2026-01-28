import React from 'react';
import MutuelleComparator from '../Components/MutuelleComparateur';


const ComparateurPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <MutuelleComparator />
      </main>
    </div>
  );
};

export default ComparateurPage;