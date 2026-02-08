/**
 * Footer component with brand name and WhatsApp contact.
 */

export function Footer() {
  return (
    <footer className="bg-black border-t border-neon-green/20 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-neon-green neon-glow mb-2">minoQ</h3>
            <p className="text-gray-400 text-sm">Premium Products. Simple Ordering.</p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-1">WhatsApp</p>
            <a
              href="https://wa.me/918240316884"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:text-neon-green-bright font-semibold transition-colors"
            >
              8240316884
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-neon-green/10 text-center text-gray-500 text-sm">
          <p>
            © 2026. Built with <span className="text-red-500">♥</span> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-green hover:text-neon-green-bright transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
