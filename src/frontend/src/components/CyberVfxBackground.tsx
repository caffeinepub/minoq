/**
 * CyberVfxBackground - Fixed full-viewport animated background layer
 * Features neon grid, scanlines, and particle effects matching the cyber theme
 * Non-interactive (pointer-events: none) and respects reduced-motion preferences
 */
export function CyberVfxBackground() {
  return (
    <div className="cyber-vfx-background">
      {/* Animated grid layer */}
      <div className="cyber-vfx-grid" />
      
      {/* Scanlines overlay */}
      <div className="cyber-vfx-scanlines" />
      
      {/* Floating particles */}
      <div className="cyber-vfx-particles">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
      </div>
      
      {/* Radial glow center */}
      <div className="cyber-vfx-glow" />
      
      {/* Dark overlay for contrast */}
      <div className="cyber-vfx-overlay" />
    </div>
  );
}
