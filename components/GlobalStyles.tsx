import React from 'react';

const GlobalStyles = () => (
  <style>{`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideInRight { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .animate-in { animation-fill-mode: both; }
    .fade-in { animation-name: fadeIn; }
    .slide-in-from-right-4 { animation-name: slideInRight; }
    .slide-in-up { animation-name: slideInUp; }
    .zoom-in-95 { animation-name: zoomIn; }
    .duration-200 { animation-duration: 200ms; }
    .duration-300 { animation-duration: 300ms; }
    .duration-700 { animation-duration: 700ms; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; } /* slate-950 */
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; } /* slate-700 */
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; } /* slate-600 */
  `}</style>
);

export default GlobalStyles;