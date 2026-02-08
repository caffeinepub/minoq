import { useState } from 'react';

/**
 * Admin access modal with password input.
 * Correct code: 9432144881
 * Shows "Access Denied" on wrong code.
 */

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CORRECT_CODE = '9432144881';

export function AdminAccessModal({ isOpen, onClose, onSuccess }: AdminAccessModalProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === CORRECT_CODE) {
      onSuccess();
      setCode('');
      setError('');
    } else {
      setError('Access Denied');
      setCode('');
    }
  };

  const handleClose = () => {
    setCode('');
    setError('');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="bg-black border-2 border-neon-green rounded-lg p-6 md:p-8 w-full max-w-md cyber-panel"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neon-green neon-glow">Admin Access</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-neon-green transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="access-code" className="block text-sm font-medium text-gray-300 mb-2">
                Enter Access Code
              </label>
              <input
                id="access-code"
                type="password"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-black border border-neon-green/30 rounded-lg text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20 transition-all"
                placeholder="••••••••••"
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-500 font-semibold text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-neon-green text-black font-bold rounded-lg hover:bg-neon-green-bright transition-all neon-glow-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
