import { buildHelpLink } from '../lib/whatsapp';

/**
 * Hamburger menu component with Help/Feedback and Admin Panel options.
 * Slides in from the right on mobile and desktop.
 */

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdminModal: () => void;
}

export function HamburgerMenu({ isOpen, onClose, onOpenAdminModal }: HamburgerMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black border-l border-neon-green/30 z-50 p-6 overflow-y-auto cyber-panel">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neon-green hover:text-neon-green-bright transition-colors p-2"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Header */}
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-bold text-neon-green neon-glow">Menu</h2>
        </div>

        {/* Menu Items */}
        <nav className="space-y-4">
          {/* Help / Feedback */}
          <a
            href={buildHelpLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-neon-green/30 rounded-lg hover:bg-neon-green/10 hover:border-neon-green transition-all neon-glow-hover group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-white group-hover:text-neon-green transition-colors">
                  Help / Feedback
                </h3>
                <p className="text-sm text-gray-400">Get support via WhatsApp</p>
              </div>
            </div>
          </a>

          {/* Admin Panel */}
          <button
            onClick={onOpenAdminModal}
            className="w-full text-left p-4 border border-neon-green/30 rounded-lg hover:bg-neon-green/10 hover:border-neon-green transition-all neon-glow-hover group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div>
                <h3 className="font-semibold text-white group-hover:text-neon-green transition-colors">
                  Admin Panel
                </h3>
                <p className="text-sm text-gray-400">Manage products</p>
              </div>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}
